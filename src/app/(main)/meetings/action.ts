"use server";

import prisma from "@/lib/prisma";
import { meetingsSchema, meetingsValue } from "@/lib/types";

export async function postMeetings(credentials: meetingsValue) {
  try {
    const { meeting_date, subject, description, status } =
      meetingsSchema.parse(credentials);

    if (!meeting_date || !subject || !description || !status) {
      return { status: 400, message: "Missing required fields" };
    }

    const meeting = await prisma.meetings.create({
      data: {
        id: crypto.randomUUID(),
        user_id: "",
        profile_id: "",
        subject,
        description,
        meeting_date,
        status,
        photo: "",
      },
    });

    return { status: 200, message: "Meeting created successfully", meeting };
  } catch (error) {
    console.error(error);
    return { status: 500, message: "Internal server error" };
  }
}
