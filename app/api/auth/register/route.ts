import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    // Retrieving data from the request body
    const { email, password, firstName, lastName } = await request.json();

    // Data validation (to be added, Zod ?)

    // Password hash
    const hashedPassword = await hash(password, 10);

    // Inserting data into the database with Prisma
    const user = await prisma.user.create({
      data: {
        email: email,
        password: hashedPassword,
        firstName: firstName,
        lastName: lastName,
      },
    });

    // Return a JSON response with user information
    return NextResponse.json(
      { message: "User created successfully", user },
      { status: 200 }
    );
  } catch (e) {
    return NextResponse.json(
      { message: "Error creating user", error: e },
      { status: 500 }
    );
  } finally {
    // Disconnecting from Prisma
    await prisma.$disconnect();
  }
}
