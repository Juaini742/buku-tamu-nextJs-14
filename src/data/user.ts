import prisma from "@/lib/prisma";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await prisma.users.findFirst({
      where: { email },
    });

    if (!user) {
      return null;
    }

    return user;
  } catch (error) {
    return null;
  }
};
export const getUserById = async (id: string) => {
  try {
    const user = await prisma.users.findUnique({
      where: { id },
    });

    if (!user) {
      return null;
    }

    return user;
  } catch (error) {
    return null;
  }
};
