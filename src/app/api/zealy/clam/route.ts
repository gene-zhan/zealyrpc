import {type  NextRequest, NextResponse} from 'next/server'
import {db} from '../../../../../dizzle.config'
import {zealyQuizTask, flexiQuizTask} from "../../../../../db/drizzle/schema";
import {varchar} from "drizzle-orm/pg-core";
import {sql, eq, count, and} from 'drizzle-orm';


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

    if (res?.accounts?.email == null) {
        return NextResponse.json({ret: 'accounts email is null'}, {status: 400});
    }

    const queryResult = await db.select({count: count()}).from(flexiQuizTask).where(and(
        eq(flexiQuizTask.emailAddress, res?.accounts?.email),
        eq(flexiQuizTask.pass, 'true')
    ));
    console.log("zealyresult: ", queryResult);


    if (queryResult[0].count == 1) {
        return NextResponse.json({ret: 'Passed'}, {status: 200});
    } else {
        return NextResponse.json({ret: "Failed, The account  " + res?.accounts?.email + " didn't pass the quiz exam on FlexiQuiz"}, {status: 400});
    }

}