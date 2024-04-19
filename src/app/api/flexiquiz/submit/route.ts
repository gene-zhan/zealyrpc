import {type  NextRequest, NextResponse} from 'next/server'
import jsonpath from 'jsonpath';

import {db} from '../../../../../dizzle.config'
import {flexiQuizTask} from "../../../../../db/drizzle/schema";
import {eq} from 'drizzle-orm';
export async function GET(request: NextRequest) {

    console.log(request.nextUrl.searchParams);
    return NextResponse.json({ret: 'GET Success'}, {status: 200});
}

export async function POST(request: NextRequest) {

    const res = await request.json()
    console.log("submit: " + JSON.stringify(res));

    const email: string | undefined = jsonpath.query(res, '$.data.registration_fields[?(@.name=="Email address")].value')[0];

    if (email === undefined) return NextResponse.json({ret: 'Invalid email'}, {status: 200}); // No email (email)

    await db.delete(flexiQuizTask).where(eq(flexiQuizTask.emailAddress, email));

    await db.insert(flexiQuizTask).values({
        eventId: res?.event_id,
        responseId: res?.data?.response_id,
        questId: res?.data?.quiz_id,
        emailAddress: email,
        userId: res?.data?.user_id,
        points: res?.data?.points,
        availablePoints: res?.data?.available_points,
        percentageScore: res?.data?.percentage_score,
        grade: res?.data?.grade,
        pass: res?.data?.pass,
        duration: res?.data?.duration
    });

    return NextResponse.json({ret: 'POST Success'}, {status: 200});
}