import { z } from "zod";
import "next-auth";

const requiredString = z.string().trim().min(1, "Input ini wajib diisi");

export const registerSchema = z.object({
  username: requiredString,
  email: z.string().email("Invalid format email"),
  password: requiredString.min(6),
  role: z.enum(["ADMIN", "GUEST"]),
});

export type registerValue = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z.string().email("Invalid format email"),
  password: requiredString,
});

export type loginValue = z.infer<typeof loginSchema>;

export const userProfileSchema = z.object({
  user_id: z.string(),
  full_name: requiredString,
  gender: requiredString,
  age: z.string().min(1, "Input wajib diisi"),
  born: requiredString,
  phone: requiredString,
  ktp: z
    .string()
    .min(16, "Isian harus 16 angka")
    .max(16, "Isian tidak boleh dari 16 angka"),
  educate: requiredString,
  address: requiredString,
});

export type userProfileValue = z.infer<typeof userProfileSchema>;

export const meetingsSchema = z.object({
  meeting_date: requiredString,
  subject: requiredString,
  description: requiredString,
  status: requiredString,
  photo: z.string().nullable(),
});

export type meetingsValue = z.infer<typeof meetingsSchema>;
