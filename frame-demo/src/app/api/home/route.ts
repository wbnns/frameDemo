import { NextRequest, NextResponse } from 'next/server';
import { getSSLHubRpcClient, Message } from "@farcaster/hub-nodejs";
const axios = require('axios');
const client = getSSLHubRpcClient("nemes.farcaster.xyz:2283");

interface fidResponse {
  verifications: string[];
}
async function getAddrByFid(fid: number) {
  const options = {
    method: 'GET',
    url: `https://api.neynar.com/v2/farcaster/user/bulk?fids=${fid}`,
    headers: {accept: 'application/json', api_key: 'NEYNAR_API_DOCS'}
  };
  const resp = await axios.get(options.url, {headers: options.headers});
  if (resp.data?.users) {
    const userVerifications = resp.data.users[0] as fidResponse;
    if(userVerifications.verifications) {
      return userVerifications.verifications[0]
    }
  }
  return "0x00";
}


async function getResponse(req: NextRequest): Promise<NextResponse> {
  let validatedMessage: Message | undefined = undefined;
  let signer: string = "";
  let fid= 0;
  try {
    const body = await req.json();
    const frameMessage = Message.decode(Buffer.from(body?.trustedData?.messageBytes || '', 'hex'));
    const result = await client.validateMessage(frameMessage);
    if (result.isOk() && result.value.valid && result.value.message) {
      validatedMessage = result.value.message;
    }
    fid = validatedMessage?.data?.fid || 0;
    signer = await getAddrByFid(fid);
  } catch (err) {
    console.error(err);
  }

  return new NextResponse(`
      <!DOCTYPE html>
          <html>
            <head>
              <title>Mint!</title>
              <meta property="og:title" content="Mint!">
              <meta property="og:image" content="https://frame-demo.vercel.app/mint.png">
              <meta name="fc:frame" content="vNext">
              <meta name="fc:frame:image" content="https://frame-demo.vercel.app/mint.png">
              <meta name="fc:frame:post_url" content="https://frame-demo.vercel.app/api/mint?to=${signer}">
              <meta name="fc:frame:button:1" content="Mint To: ${signer}">
            </head>
            <body>
              <p>Testing Complete</p>
            </body>
          </html>
      
      `)
}
export async function POST(req: NextRequest): Promise<Response> {
    return getResponse(req);
}


export const dynamic = 'force-dynamic';
