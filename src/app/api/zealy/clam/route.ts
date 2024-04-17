import {type  NextRequest, NextResponse} from 'next/server'


export async function GET(request: NextRequest) {

    console.log(request.nextUrl.searchParams);
    return NextResponse.json({ret: 'GET Success'}, {status: 200});
}

export async function POST(request: NextRequest) {
    console.log(request);
    const DefaultKey = '4313993YLGHtMqnYPyovXz512lm'; // Replace with your API key configured in Zealy task

    const requestHeaders = new Headers(request.headers)
    const apiKey = requestHeaders.get("x-api-key")

    if (apiKey !== DefaultKey) {
        return NextResponse.json({ret: 'Invalid API Key'}, {status: 400});
    }


    const res = await request.json()
    const success = true; // Replace with custom logic
    console.log(res, success);

    return NextResponse.json(res, {status: 200});
}