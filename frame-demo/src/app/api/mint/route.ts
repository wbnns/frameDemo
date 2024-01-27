import { NextRequest, NextResponse } from 'next/server';
import { getSSLHubRpcClient, Message } from "@farcaster/hub-nodejs";
import {ethers} from "ethers";
const axios = require('axios');
const client = getSSLHubRpcClient("nemes.farcaster.xyz:2283");
import InstaMintContract from "../../../assets/contracts/InstaMint.json";

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

async function mint(to: string) {
  const privateKey = process.env.WALLET_KEY;
  if (!privateKey) {
    throw new Error("No key");
  }
  const url = 'https://sepolia.base.org';
  const provider = new ethers.JsonRpcProvider(url);

  const wallet = new ethers.Wallet(privateKey);
  const signer = wallet.connect(provider);
  const mintContract = new ethers.Contract("0xaf57ec2cf1d60e8a26aad46593598879b593327e", InstaMintContract.abi, signer);
  const reponse = await mintContract.mint(to, 1);
  return reponse.hash;
}
async function getResponse(req: NextRequest): Promise<NextResponse> {
  const query = req.nextUrl.searchParams;
  const to = query.get('to');
  if (!to) {
    throw new Error("no to address");
  }
  const hash = await mint(to);
  return new NextResponse(`
      <!DOCTYPE html>
          <html>
            <head>
              <title>Mint</title>
              <meta property="og:title" content="Tested!">
              <meta property="og:image" content="https://frame-demo.vercel.app/success.png">
              <meta name="fc:frame" content="vNext">
              <meta name="fc:frame:image" content="https://frame-demo.vercel.app/success.png">
              <meta name="fc:frame:post_url" content="https://frame-demo.vercel.app/api/mint">
              <meta name="fc:frame:button:1" content="Mint Hash: ${hash}">
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

export async function GET(req: NextRequest): Promise<Response> {
  mint("0xd11BAA5966e266396e9Ed723C96B613B9C39620c")
  return new NextResponse('');
}

export const dynamic = 'force-dynamic';
