import { NextResponse } from 'next/server';
import { z } from 'zod';
import { submitIndexNowUrls } from '../../lib/indexnow';

const requestSchema = z.object({
  urls: z.array(z.string().url()).min(1).max(10_000),
});

export async function POST(request: Request): Promise<NextResponse> {
  const token = process.env.INDEXNOW_SUBMIT_TOKEN;
  const authorization = request.headers.get('authorization') || '';

  if (!token || authorization !== `Bearer ${token}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body: unknown = await request.json();
    const result = requestSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json({ error: 'Invalid URL list.' }, { status: 400 });
    }

    const submission = await submitIndexNowUrls(result.data.urls);

    return NextResponse.json({
      submitted: submission.urlList.length,
      urls: submission.urlList,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'IndexNow submission failed.';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
