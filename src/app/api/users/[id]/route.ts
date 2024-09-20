import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

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

    const result = await prisma.user.delete({
      where: { id },
    });

    if (!result) {
      return NextResponse.json(
        {
          message: "users not found",
        },
        { status: 404 }
      );
    }

    const profile = await prisma.user_profiles.delete({
      where: {
        user_id: result.id,
      },
    });

    if (!profile) {
      return NextResponse.json(
        {
          message: "users not found",
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
