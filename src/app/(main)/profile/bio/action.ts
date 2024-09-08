"use server";

import prisma from "@/lib/prisma";
import { userProfileSchema, userProfileValue } from "@/lib/types";
import { z } from "zod";

export default async function postBio(credentials: userProfileValue) {
  try {
    const {
      user_id,
      full_name,
      gender,
      age,
      born,
      phone,
      ktp,
      educate,
      address,
    } = userProfileSchema.parse(credentials);

    console.log({
      user_id,
      full_name,
      gender,
      age,
      born,
      phone,
      ktp,
      educate,
      address,
    });

    const profile = await prisma.user_profiles.create({
      data: {
        id: crypto.randomUUID(),
        user_id,
        full_name,
        gender,
        age: Number(age),
        born: new Date(born),
        phone: Number(phone),
        ktp: Number(ktp),
        educate,
        address,
      },
    });

    return { status: 200, message: "Meeting created successfully", profile };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        error:
          "Invalid input: " + error.errors.map((e) => e.message).join(", "),
      };
    }

    return { error: "Something went error" };
  }
}
