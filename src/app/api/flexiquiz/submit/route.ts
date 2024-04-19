import {type  NextRequest, NextResponse} from 'next/server'

import {db} from '../../../../../dizzle.config'
import {flexiQuizTask} from "../../../../../db/drizzle/schema";
export async function GET(request: NextRequest) {

    console.log(request.nextUrl.searchParams);
    return NextResponse.json({ret: 'GET Success'}, {status: 200});
}

export async function POST(request: NextRequest) {

    const res = await request.json()
    console.log("submit: " + JSON.stringify(res));

    await db.insert(flexiQuizTask).values({
        eventId: res?.event_id,
        responseId: res?.data?.response_id,
        questId: res?.data?.quiz_id,
        firstName: res?.data?.first_name,
        lastName: res?.data?.last_name,
        emailAddress: res?.data?.email_address,
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