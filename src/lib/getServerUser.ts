import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { AuthOptions, getServerSession } from "next-auth";
import prisma from "./prisma";

export async function getServerUser() {
  const session = await getServerSession(authOptions as unknown as AuthOptions);

  if (!session || !session.user) {
    return null;
  }

  const user = await prisma.users.findUnique({
    where: { id: session.user.id },
  });

  return {
    id: user?.id,
    email: user?.email,
    username: user?.username,
    role: user?.role,
  };
}
