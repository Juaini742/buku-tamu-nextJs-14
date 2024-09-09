import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const profiles = await prisma.user_profiles.findMany();

    const data = profiles.map((profile) => ({
      ...profile,
      phone: profile.phone?.toString(),
      ktp: profile.ktp?.toString(),
    }));

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
