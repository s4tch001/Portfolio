import { NextResponse } from 'next/server';
import { submitIndexNowUrls } from '../../lib/indexnow';

export async function POST(request) {
  const token = process.env.INDEXNOW_SUBMIT_TOKEN;
  const authorization = request.headers.get('authorization') || '';

  if (!token || authorization !== `Bearer ${token}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const urls = Array.isArray(body?.urls) ? body.urls : [];
    const result = await submitIndexNowUrls(urls);

    return NextResponse.json({
      submitted: result.urlList.length,
      urls: result.urlList,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
