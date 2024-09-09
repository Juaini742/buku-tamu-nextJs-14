"use client";

import { useQuery } from "@tanstack/react-query";

export const useMeetingsId = (id: string | undefined) => {
  const meetApi = async () => {
    try {
      const res = await fetch(`/api/meetings/${id}`, {
        method: "GET",
      });

      if (!res.ok) {
        return null;
      }
      return res.json();
    } catch (error) {
      console.error(error);
    }
  };

  const { data: meetings, isLoading } = useQuery({
    queryKey: ["meetings"],
    queryFn: meetApi,
  });

  return { meetings, isLoading };
};
