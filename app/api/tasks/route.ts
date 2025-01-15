import { NextResponse } from "next/server";
import { Priority, PrismaClient, Status } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    // Retrieving user id from the request body
    const { userId } = await request.json();

    // Retrieve all tasks from database
    const tasks = await prisma.task.findMany({
      include: {
        category: true,
        author: true,
        assignedUsers: {
          include: {
            user: true,
          },
        },
      },
      where: {
        OR: [
          { authorId: userId },
          {
            assignedUsers: {
              some: {
                userId: userId,
              },
            },
          },
        ],
        status: {
          in: [Status.PENDING, Status.IN_PROGRESS],
        },
      },
      orderBy: {
        term: "asc",
      },
    });

    return NextResponse.json(tasks, { status: 200 });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return NextResponse.json(
      { error: "Failed to fetch tasks" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    // Retrieving data from the request body
    const {
      title,
      description,
      categoryId,
      status,
      priority,
      term,
      usersId,
      authorId,
    } = await request.json();

    // Inserting data into the database with Prisma
    const task = await prisma.task.create({
      data: {
        title: title as string,
        description: description as string,
        categoryId: Number(categoryId),
        status: status as Status,
        priority: priority as Priority,
        term: new Date(term),
        authorId: Number(authorId),
        assignedUsers: {
          create: usersId.map((userId: number) => ({
            user: {
              connect: { id: userId },
            },
          })),
        },
      },
    });

    // Return a JSON response with task information
    return NextResponse.json(
      { message: "Task created successfully", task },
      { status: 200 }
    );
  } catch (e) {
    return NextResponse.json(
      { message: "Error creating task", error: e },
      { status: 500 }
    );
  } finally {
    // Disconnecting from Prisma
    await prisma.$disconnect();
  }
}

export async function PUT(request: Request) {
  try {
    // Retrieving data from the request body
    const {
      id,
      title,
      description,
      categoryId,
      status,
      priority,
      term,
      usersId,
    } = await request.json();

    // Updating data into the database with Prisma
    const task = await prisma.task.update({
      where: {
        id: id,
      },
      data: {
        title: title as string,
        description: description as string,
        categoryId: Number(categoryId),
        status: status as Status,
        priority: priority as Priority,
        term: new Date(term),
        assignedUsers: {
          deleteMany: {},
          create: usersId.map((userId: number) => ({
            user: {
              connect: { id: userId },
            },
          })),
        },
      },
    });

    // Return a JSON response with task information
    return NextResponse.json(
      { message: "Task updated successfully", task },
      { status: 200 }
    );
  } catch (e) {
    return NextResponse.json(
      { message: "Error updating task", error: e },
      { status: 500 }
    );
  } finally {
    // Disconnecting from Prisma
    await prisma.$disconnect();
  }
}
