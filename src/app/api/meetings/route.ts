import { getServerUser } from "@/lib/getServerUser";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { requestTemplate } from "./request.template";
import { approveTemplate } from "./approve.template";

export async function GET() {
  try {
    const data = await prisma.meetings.findMany({
      include: {
        users: {
          select: {
            email: true,
            username: true,
          },
        },
        profile: true,
      },
    });

    const meetings = data.map((meeting) => ({
      ...meeting,
      profile: {
        ...meeting.profile,
        phone: meeting.profile.phone?.toString(),
        ktp: meeting.profile.ktp?.toString(),
      },
    }));

    return NextResponse.json(meetings);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { meeting_date, subject, description, status, photo } =
      await req.json();

    if (!meeting_date || !subject || !description || !status) {
      const missingFields = Object.keys({
        meeting_date,
        subject,
        description,
        status,
      }).filter(
        (key) => !(key in { meeting_date, subject, description, status })
      );
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(", ")}` },
        { status: 400 }
      );
    }

    const user = await getServerUser();
    const profile = await prisma.user_profiles.findFirst({
      where: { user_id: user?.id },
    });

    if (!user || !profile) {
      return NextResponse.json(
        { error: "User or profile not found" },
        { status: 404 }
      );
    }

    const result = await prisma.meetings.create({
      data: {
        id: crypto.randomUUID(),
        user_id: user?.id ?? "",
        profile_id: profile?.id ?? "",
        subject,
        description,
        meeting_date: new Date(meeting_date),
        status,
        photo,
      },
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "zerozez76@gmail.com",
        pass: process.env.NEXT_APP_GMAIL_PASS,
      },
    });

    const mailOptions = {
      from: user.email,
      to: "zerozez76@gmail.com",
      subject: `Pengajuan Pertemuan: ${subject}`,
      html: requestTemplate(
        meeting_date,
        description,
        status,
        profile,
        subject
      ),
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { result, message: "Meeting created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const { id, status } = await req.json();

    if (!id || !status) {
      return NextResponse.json(
        {
          message: "Missing property",
        },
        { status: 400 }
      );
    }

    const data = await prisma.meetings.findUnique({
      where: { id },
      include: {
        users: true,
        profile: {
          select: {
            full_name: true,
          },
        },
      },
    });

    if (!data) {
      return NextResponse.json(
        {
          message: "Meeting not found",
        },
        { status: 404 }
      );
    }

    const result = await prisma.meetings.update({
      where: { id },
      data: {
        status,
      },
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "zerozez76@gmail.com",
        pass: process.env.NEXT_APP_GMAIL_PASS,
      },
    });

    const mailOptions = {
      from: "zerozez76@gmail.com",
      to: data.users.email,
      subject: `Update Status Pertemuan: ${data.subject}`,
      html: approveTemplate(
        {
          profile: { full_name: data.profile.full_name },
          meeting_date: data.meeting_date.toISOString(),
          subject: data.subject,
        },
        result
      ),
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { result, message: "Meeting status updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
