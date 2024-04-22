import { NextResponse } from "next/server"

export const createInternalErrorResponse = (error: Error) => {
    return NextResponse.json({ error: JSON.stringify(error), message: 'Internal Server Error' }, { status: 500 });
}

export const createDataResponse = (data: any) => {
    return NextResponse.json(data, { status: 200 });
}

export const createMessageResponse = (message: string) => {
    return NextResponse.json({ message }, { status: 500 });
}