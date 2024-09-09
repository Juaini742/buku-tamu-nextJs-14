import { NextResponse } from "next/server";
import puppeteer from "puppeteer";
import { reportTemplate } from "./report";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });

    const data = await prisma.meetings.findMany({
      select: {
        meeting_date: true,
        description: true,
        profile: {
          select: {
            full_name: true,
            age: true,
            educate: true,
          },
        },
      },
    });

    const formattedData = data.map((item) => ({
      ...item,
      meeting_date: item.meeting_date.toISOString(),
    }));

    const content = reportTemplate(formattedData);
    await page.setContent(content, { waitUntil: "domcontentloaded" });

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
    });

    await browser.close();

    return new NextResponse(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=report.pdf",
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
