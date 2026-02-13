import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const res = await fetch('https://formsubmit.co/info@planb-fx.com', {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body: formData,
    });
    const text = await res.text();
    if (res.ok) {
      return NextResponse.json({ success: true });
    }
    return NextResponse.json({ success: false }, { status: res.status });
  } catch (e) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
