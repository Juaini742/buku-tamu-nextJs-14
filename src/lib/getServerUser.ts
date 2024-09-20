import { auth } from "@/auth";
import prisma from "./prisma";

export async function getServerUser() {
  const session = await auth();

  if (!session || !session.user) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
  });

  if (!user) {
    return null;
  }

  return {
    id: user?.id,
    email: user?.email,
    username: user?.name,
    role: user?.role,
  };
}
