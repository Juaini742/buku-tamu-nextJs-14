import { auth } from "@/auth";
import prisma from "./prisma";

export async function getServerProfile() {
  const session = await auth();

  if (!session || !session.user) {
    return null;
  }

  const profile = await prisma.user_profiles.findFirst({
    where: {
      user_id: session.user.id,
    },
    include: {
      users: {
        select: { name: true, email: true },
      },
    },
  });

  return {
    id: profile?.id,
    user_id: profile?.user_id,
    full_name: profile?.full_name,
    gender: profile?.gender,
    age: profile?.age,
    born: profile?.born,
    phone: profile?.phone,
    ktp: profile?.ktp,
    educate: profile?.educate,
    address: profile?.address,
    username: profile?.users.name,
    email: profile?.users.email,
  };
}
