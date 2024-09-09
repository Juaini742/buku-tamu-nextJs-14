"use client";

import { Trash2Icon } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { useDeleteUser } from "@/app/(main)/admin/table/mutation";

export const ButtonDeleteUse = ({ id }: { id: string }) => {
  const mutation = useDeleteUser();
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button>
          <Trash2Icon className="size-4 my-1" />
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Hapus Data</AlertDialogTitle>
          <AlertDialogDescription>
            Data yg anda hapus akan terhapus secara permanen
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={() => mutation.mutate(id)}>
            Ya
          </AlertDialogAction>
          <AlertDialogCancel>Tidak</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
