import { db } from '@/lib/db';
import { NextResponse } from 'next/server';
import * as z from 'zod'

const companySchema = z.
object({
    companyName: z.string().min(1, 'Company Name is required'),
        tinNumber: z.string().min(1, 'TIN required').min(10, "TIN must be 10 digits").max(10, "TIN must be 10 digits"),
        registrationNumber: z.string().min(1, 'Commercial Registration number is required'),
        licenseNumber: z.string().min(1, 'Business License number is required'),
})

export async function POST(req:Request) {
    try{
        const body = await req.json();
        const {companyName, tinNumber, registrationNumber,licenseNumber} = companySchema.parse (body);

        const existingCompanyByTIN = await db.company.findUnique({
            where: { tinNumber: tinNumber}
        });
        if (existingCompanyByTIN) {
            return NextResponse.json({company: null, message: 'This company has already been Registered.'}, {status: 409})
        }

        const newCompany = await db.company.create({
            data: {
                companyName,
                tinNumber,
                registrationNumber,
                licenseNumber
            }
        });

        return NextResponse.json({company: newCompany, message: 'Company registered successfully'}, {status: 201})

    } catch (error) {
        console.error('Error: ', error);
        return NextResponse.json({error: {message: 'Internal server error', details: error}}, {status: 500});
    }
}
