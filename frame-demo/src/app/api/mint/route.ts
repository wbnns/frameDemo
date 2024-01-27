import { NextRequest, NextResponse } from 'next/server';

function getResponse(): NextResponse {
  return new NextResponse(`
      <!DOCTYPE html>
          <html>
            <head>
              <title>Vote Recorded</title>
              <meta property="og:title" content="Tested!">
              <meta property="og:image" content="https://frame-demo.vercel.app/success.png">
              <meta name="fc:frame" content="vNext">
              <meta name="fc:frame:image" content="https://frame-demo.vercel.app/success.png">
              <meta name="fc:frame:post_url" content="https://frame-demo.vercel.app/api/mint">
              <meta name="fc:frame:button:1" content="Tested">
            </head>
            <body>
              <p>Testing Complete</p>
            </body>
          </html>
      
      `)
}
export async function POST(req: NextRequest): Promise<Response> {
    return getResponse();
}

export async function GET(req: NextRequest): Promise<Response> {
  return getResponse();
}

export const dynamic = 'force-dynamic';
