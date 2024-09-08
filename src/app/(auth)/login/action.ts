"use server";

import prisma from "@/lib/prisma";
import { loginSchema, loginValue } from "@/lib/types";
import * as bcrypt from "bcrypt-ts";
// import { redirect } from "next/navigation";

export async function login(
  credentials: loginValue
): Promise<{ error?: string; role?: string }> {
  try {
    const { email, password } = loginSchema.parse(credentials);

    const existingEmail = await prisma.users.findUnique({
      where: {
        email,
      },
    });

    if (!existingEmail) {
      return { error: "Email tidak ditemukan" };
    }

    const validatePassword = await bcrypt.compare(
      password,
      existingEmail.password
    );

    if (!validatePassword) {
      return {
        error: "Terjadi kesalahan, silahkan coba lagi!!",
      };
    }

    return { role: existingEmail.role };
  } catch (error) {
    console.error(error);
    return { error: "Error logging in" };
  }
}
