import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { auth } from "@/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const session = await auth();

    if (!session || !session.user) {
      return NextResponse.json(
        { error: "User not authenticated" },
        { status: 401 }
      );
    }

    const meetings = await prisma.meetings.findMany({
      where: {
        user_id: session.user.id,
      },
      include: {
        users: {
          select: {
            email: true,
            name: true,
          },
        },
        profile: true,
      },
    });

    const meetingsWithBigIntToString = meetings.map((meeting) => ({
      ...meeting,
      profile: {
        ...meeting.profile,
        phone: meeting.profile.phone?.toString(),
        ktp: meeting.profile.ktp?.toString(),
      },
    }));

    return NextResponse.json(meetingsWithBigIntToString);
  } catch (error) {
    console.error("Error fetching meetings:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
