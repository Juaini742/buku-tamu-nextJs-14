import { auth } from "@/auth";
import prisma from "./prisma";

export async function getServerUser() {
  const session = await auth();

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
