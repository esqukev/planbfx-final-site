import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

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
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT) || 587;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const toEmail = process.env.SMTP_TO || 'info@planb-fx.com';

  if (!host || !user || !pass) {
    return NextResponse.json(
      { success: false, error: 'SMTP not configured (SMTP_HOST, SMTP_USER, SMTP_PASS)' },
      { status: 500 }
    );
  }

  try {
    const formData = await request.formData();
    const data: Record<string, string> = {};
    for (const [k, v] of formData.entries()) {
      if (typeof v === 'string' && !k.startsWith('_')) data[k] = v;
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });

    await transporter.sendMail({
      from: `PlanB FX <${user}>`,
      to: toEmail,
      replyTo: data.email || undefined,
      subject: 'Form contact',
      html: buildEmailHtml(data),
    });

    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
