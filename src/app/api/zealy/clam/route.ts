import {type  NextRequest, NextResponse} from 'next/server'
import {db} from '../../../../../dizzle.config'
import {zealyQuizTask,flexiQuizTask} from "../../../../../db/drizzle/schema";
import {varchar} from "drizzle-orm/pg-core";
import { sql ,eq} from 'drizzle-orm';


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
    console.log("zealy: " + JSON.stringify(res));

    if (res == undefined) {
        return NextResponse.json({ret: 'Invalid request json'}, {status: 400});
    }

    // //int json response
    // await db.insert(zealyQuizTask).values({
    //     userId: res?.userId,
    //     questId: res?.questId,
    //     requestId: res?.requestId,
    //     email: res?.accounts?.email,
    //     wallet: res?.accounts?.wallet,
    //     discordId: res?.accounts?.discordId,
    //     discordHandle: res.accounts?.discordHandle,
    //     twitterId: res?.accounts?.twitterId,
    //     twitterUname: res?.accounts?.twitterUname,
    // });

    if(res?.accounts?.email == null) {
        return NextResponse.json({ret: 'accounts email is null'}, {status: 400});
    }
    const result = await db.select().from(flexiQuizTask).where(eq(flexiQuizTask.emailAddress, res?.accounts?.email))
    console.log("zealyresult: " + JSON.stringify(result));

    if(result[0].percentageScore){
       const     percentageScore = parseInt(result[0].percentageScore, 10);
       if(percentageScore>=60){
           return NextResponse.json({ret: 'Passed'}, {status: 200});
       }else {
           return NextResponse.json({ret: 'Failed,This score is ' + percentageScore + ' which is too low.'}, {status: 400});
       }
    }

    return NextResponse.json({ret:'can not find percentage Score with email'}, {status: 400});
}