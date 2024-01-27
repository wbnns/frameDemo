import { NextRequest, NextResponse } from 'next/server';
import { getSSLHubRpcClient, Message } from "@farcaster/hub-nodejs";

const client = getSSLHubRpcClient("nemes.farcaster.xyz:2283");
async function getResponse(req: NextRequest): Promise<NextResponse> {
  let validatedMessage: Message | undefined = undefined;
  let signer: `0x${string}` | undefined = undefined;
  try {
    const body = await req.json();
    const frameMessage = Message.decode(Buffer.from(body?.trustedData?.messageBytes || '', 'hex'));
    const result = await client.validateMessage(frameMessage);
    if (result.isOk() && result.value.valid && result.value.message) {
      validatedMessage = result.value.message;
      signer = '0x' + Buffer.from(result.value.message.signer).toString('hex')

    }
  } catch (err) {
    console.error(err);
  }

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
              <meta name="fc:frame:button:1" content="${signer}">
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
