import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import * as z from "zod";

const busSchema = z.object({
  plateNumber: z.string().min(5, "Plate number must be at least 5 digits"),
  seatCapacity: z
    .number()
    .min(1, "Seat Capacity is required")
    .max(60, "Seat Capacity is not expected to be of more than 60 seats"),
  status: z.enum(["Active", "On Duty", "On Maintenance", "Unavailable"]),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { plateNumber, seatCapacity, status } = busSchema.parse(body);

    const existingBusByPlateNumber = await db.bus.findUnique({
      where: { plateNumber: plateNumber },
    });
    if (existingBusByPlateNumber) {
      return NextResponse.json(
        { bus: null, message: "This Bus has already been registered." },
        { status: 409 }
      );
    }

    const newBus = await db.bus.create({
      data: {
        plateNumber,
        seatCapacity,
        status,
      },
    });

    return NextResponse.json(
      { bus: newBus, message: "Bus registered successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.log("Error");
    return NextResponse.json(
      { error: { message: "Internal server error", details: error } },
      { status: 500 }
    );
  }
}
