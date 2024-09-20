import { getServerUser } from "@/lib/getServerUser";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const user = await getServerUser();

    const meetings = await prisma.meetings.findMany({
      where: {
        user_id: user?.id,
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
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
