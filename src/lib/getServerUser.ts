import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { AuthOptions, getServerSession } from "next-auth";

export async function getServerUser() {
  const session = await getServerSession(authOptions as unknown as AuthOptions);

  if (!session || !session.user) {
    return null;
  }

  return {
    id: session.user.id,
    email: session.user.email,
    username: session.user.username,
    role: session.user.role,
  };
}
