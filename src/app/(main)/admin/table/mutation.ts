"use client";

import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteUser() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (id: string) => {
      return fetch(`/api/users/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
    mutationKey: ["meetings"],
    onSuccess: () => {
      toast({
        title: "Berhasil",
        description: "Data berhasil dihapus.",
      });

      queryClient.invalidateQueries({ queryKey: ["meetings"] });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Gagal",
        description: "Data gagal dihapus.",
      });
    },
  });

  return mutation;
}

export function useDeleteProfile() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (id: string | undefined) => {
      return fetch(`/api/profiles/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
    mutationKey: ["profiles"],
    onSuccess: () => {
      toast({
        title: "Berhasil",
        description: "Data berhasil dihapus.",
      });

      queryClient.invalidateQueries({ queryKey: ["profiles"] });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Gagal",
        description: "Data gagal dihapus.",
      });
    },
  });

  return mutation;
}
