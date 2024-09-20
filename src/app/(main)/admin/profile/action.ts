"use server";

import prisma from "@/lib/prisma";
import { registerSchema, registerValue } from "@/lib/types";
import { isRedirectError } from "next/dist/client/components/redirect";
import * as bcrypt from "bcrypt-ts";

export async function register(
  credentials: registerValue
): Promise<{ error?: string }> {
  try {
    const { name, email, password, role } = registerSchema.parse(credentials);

    const salt = bcrypt.genSaltSync(10);
    const passwordHashing = await bcrypt.hashSync(password, salt);

    const userId = crypto.randomUUID();

    const existingEmail = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (existingEmail) {
      return {
        error: "Email sudah digunakan",
      };
    }

    await prisma.user.create({
      data: {
        id: userId,
        name,
        email,
        password: passwordHashing,
        role,
      },
    });

    return {};
  } catch (error) {
    if (isRedirectError(error)) throw error;
    console.error(error);
    return { error: "Something went error" };
  }
}
