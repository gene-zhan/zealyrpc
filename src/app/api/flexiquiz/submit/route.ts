import {type  NextRequest, NextResponse} from 'next/server'


export async function GET(request: NextRequest) {

    console.log(request.nextUrl.searchParams);
    return NextResponse.json({ret: 'GET Success'}, {status: 200});
}

export async function POST(request: NextRequest) {

    const res = await request.json()
    console.log("submit:" + res);

    return NextResponse.json({ret: 'POST Success'}, {status: 200});
}