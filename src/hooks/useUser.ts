"use client";

import { useSession } from "next-auth/react";

export function useUser() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return { loading: true, user: null };
  }

  if (!session || !session.user) {
    return { loading: false, user: null };
  }

  return {
    loading: false,
    user: {
      id: session.user.id,
      username: session.user.username,
      email: session.user.email,
      role: session.user.role,
    },
  };
}
