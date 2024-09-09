import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useDeleteMeetings() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (id: string) => {
      return fetch(`/api/meetings/${id}`, {
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
