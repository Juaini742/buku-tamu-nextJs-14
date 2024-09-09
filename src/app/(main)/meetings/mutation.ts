import { useToast } from "@/hooks/use-toast";
import { meetingsValue } from "@/lib/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useSubmitMeetings() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (meetings: meetingsValue) => {
      return fetch("api/meetings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(meetings),
      });
    },
    mutationKey: ["meetings"],
    onSuccess: () => {
      toast({
        title: "Berhasil",
        description: "Pengajuan berhasil dibuat.",
      });

      queryClient.invalidateQueries({ queryKey: ["meetings"] });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Gagal",
        description: "Pengajuan gagal dibuat.",
      });
    },
  });

  return mutation;
}
