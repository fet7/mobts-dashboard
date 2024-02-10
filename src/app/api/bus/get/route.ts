import { NextResponse } from 'next/server';
import { db } from "@/lib/db";

export async function GET(req:Request) {
    try{
const allBuses = await db.bus.findMany();

return NextResponse.json({buses: allBuses, message: 'Buses fetched successfully'})
    }catch (error) {
        console.error('Error: ', error);
        return NextResponse.json({error: {message: 'Internal server error', details: error}}, {status: 500})
    }
}