import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json({
        message: "id is required",
        status: 400,
      });
    }

    const result = await prisma.meetings.findUnique({
      where: {
        id,
      },
      include: {
        users: {
          select: {
            email: true,
          },
        },
        profile: {
          select: {
            full_name: true,
          },
        },
      },
    });

    if (!result) {
      return NextResponse.json(
        {
          message: "Meeting not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json({
        message: "id is required",
        status: 400,
      });
    }

    const result = await prisma.meetings.delete({
      where: { id },
    });

    if (!result) {
      return NextResponse.json(
        {
          message: "Meeting not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
