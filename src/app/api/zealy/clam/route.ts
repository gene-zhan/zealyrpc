import {type  NextRequest, NextResponse} from 'next/server'
import {db} from '../../../../../dizzle.config'
import {zealyQuizTask} from "../../../../../db/drizzle/schema";
import {varchar} from "drizzle-orm/pg-core";


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
    console.log(res);

    if (res == undefined) {
        return NextResponse.json({ret: 'Invalid request json'}, {status: 400});
    }


    //int json response
    await db.insert(zealyQuizTask).values({
        userId: res?.userId,
        questId: res?.questId,
        requestId: res?.requestId,
        email: res?.account?.email,
        wallet: res?.account?.wallet,
        discordId: res?.account?.discordId,
        discordHandle: res.account?.discordHandle,
        twitterId: res?.account?.twitterId,
        twitterUname: res?.account?.twitterUname,
    });

    return NextResponse.json({ret: 'Success'}, {status: 200});
}