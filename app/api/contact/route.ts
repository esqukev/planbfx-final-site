import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL = process.env.RESEND_FROM_EMAIL ?? 'PlanB FX <onboarding@resend.dev>';
const TO_EMAIL = process.env.RESEND_TO_EMAIL ?? 'info@planb-fx.com';

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
    .map((f) => `<tr><td style="padding:8px 12px;border:1px solid #eee;"><strong>${f.label}</strong></td><td style="padding:8px 12px;border:1px solid #eee;">${String(data[f.key]).replace(/\n/g, '<br>')}</td></tr>`)
    .join('');
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family:sans-serif;color:#333;">
  <p style="font-size:16px;margin-bottom:16px;">New contact from PlanB FX website:</p>
  <table style="border-collapse:collapse;max-width:500px;">
    ${rows}
  </table>
</body>
</html>`;
}

export async function POST(request: NextRequest) {
  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json(
      { success: false, error: 'RESEND_API_KEY not configured' },
      { status: 500 }
    );
  }
  try {
    const formData = await request.formData();
    const data: Record<string, string> = {};
    for (const [k, v] of formData.entries()) {
      if (typeof v === 'string' && !k.startsWith('_')) data[k] = v;
    }
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [TO_EMAIL],
      replyTo: data.email || undefined,
      subject: 'Form contact',
      html: buildEmailHtml(data),
    });
    if (error) {
      return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
    }
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
