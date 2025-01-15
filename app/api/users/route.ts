import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Retrieve all users from database
    const users = await prisma.user.findMany({
      select: {
        id: true,
        firstName: true,
      },
    });
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    // Retrieving data from the request body
    const { id, firstName, lastName } = await request.json();

    // Updating data into the database with Prisma
    const user = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        firstName: firstName as string,
        lastName: lastName as string,
      },
    });

    // Return a JSON response with user information
    return NextResponse.json(
      { message: "User updated successfully", user },
      { status: 200 }
    );
  } catch (e) {
    return NextResponse.json(
      { message: "Error updating user", error: e },
      { status: 500 }
    );
  } finally {
    // Disconnecting from Prisma
    await prisma.$disconnect();
  }
}
