import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import nodemailer from 'nodemailer';

const TO_EMAIL = process.env.SMTP_TO || process.env.RESEND_TO || 'info@planb-fx.com';

function buildEmailHtml(data: Record<string, string>): string {
  const fields = [
    { label: 'Name', key: 'name' },
    { label: 'Company', key: 'company' },
    { label: 'City', key: 'city' },
    { label: 'Country', key: 'country' },
    { label: 'Phone', key: 'phone' },
    { label: 'Email', key: 'email' },
    { label: 'Details', key: 'details' },
  ];
  const rows = fields
    .filter((f) => data[f.key])
    .map(
      (f) =>
        `<tr><td style="padding:8px 12px;border:1px solid #eee;"><strong>${f.label}</strong></td><td style="padding:8px 12px;border:1px solid #eee;">${String(data[f.key]).replace(/\n/g, '<br>')}</td></tr>`
    )
    .join('');
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family:sans-serif;color:#333;">
  <p style="font-size:16px;margin-bottom:16px;">PlanB FX - Form contact</p>
  <table style="border-collapse:collapse;max-width:500px;">
    ${rows}
  </table>
</body>
</html>`;
}

export async function POST(request: NextRequest) {
  let data: Record<string, string> = {};
  try {
    const formData = await request.formData();
    for (const [k, v] of formData.entries()) {
      if (typeof v === 'string' && !k.startsWith('_')) data[k] = v;
    }
  } catch {
    return NextResponse.json({ success: false }, { status: 400 });
  }

  // 1. Resend (funciona en Vercel, sin branding)
  const resendKey = process.env.RESEND_API_KEY;
  if (resendKey) {
    try {
      const resend = new Resend(resendKey);
      const from = process.env.RESEND_FROM || 'PlanB FX <onboarding@resend.dev>';
      const { error } = await resend.emails.send({
        from,
        to: [TO_EMAIL],
        replyTo: data.email || undefined,
        subject: 'Form contact',
        html: buildEmailHtml(data),
      });
      if (error) {
        console.error('[contact] Resend error:', error);
        return NextResponse.json({ success: false }, { status: 500 });
      }
      return NextResponse.json({ success: true });
    } catch (e) {
      console.error('[contact] Resend error:', e);
      return NextResponse.json({ success: false }, { status: 500 });
    }
  }

  // 2. SMTP (no funciona en Vercel)
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT) || 587;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (host && user && pass) {
    try {
      const transporter = nodemailer.createTransport({
        host,
        port,
        secure: port === 465,
        auth: { user, pass },
        connectionTimeout: 10000,
        greetingTimeout: 5000,
      });
      await transporter.sendMail({
        from: `PlanB FX <${user}>`,
        to: TO_EMAIL,
        replyTo: data.email || undefined,
        subject: 'Form contact',
        html: buildEmailHtml(data),
      });
      return NextResponse.json({ success: true });
    } catch (e) {
      console.error('[contact] SMTP error:', e);
      return NextResponse.json({ success: false }, { status: 500 });
    }
  }

  console.error('[contact] No email service configured. Add RESEND_API_KEY or SMTP_*');
  return NextResponse.json(
    { success: false, error: 'Email service not configured' },
    { status: 503 }
  );
}
