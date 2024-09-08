import { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "./[...nextauth]/options";

export default async function logout(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await unstable_getServerSession(
    req,
    res,
    authOptions as never
  );

  if (session) {
    await fetch(`${process.env.NEXTAUTH_URL}/api/auth/signout`, {
      method: "POST",
      credentials: "include",
    });
  }

  res.writeHead(302, { Location: "/login" });
  res.end();
}
