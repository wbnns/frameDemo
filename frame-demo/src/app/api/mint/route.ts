import { NextRequest, NextResponse } from 'next/server';


export async function GET(req: NextRequest): Promise<Response> {
    return NextResponse.json({ hello:"world" }, { status: 200 });
}

export const dynamic = 'force-dynamic';
