import { db } from "@/lib/db";
import { signUpSchema } from "@/schemas/userAPI.schema";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { firstName, lastName, email, password } = signUpSchema.parse(body);

    const existingUserByEmail = await db.user.findUnique({
      where: { email: email },
    });
    if (existingUserByEmail) {
      return NextResponse.json(
        { user: null, message: "User with this email already exists" },
        { status: 409 }
      );
    }

    const hashedPassword = await hash(password, 10);
    const newUser = await db.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
      },
    });

    const { password: newUserPassword, ...rest } = newUser;

    return NextResponse.json(
      { user: rest, message: "user created successfully!" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "something went wrong!", details: error },
      { status: 500 }
    );
  }
}
