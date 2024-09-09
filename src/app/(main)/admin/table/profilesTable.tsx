"use client";

import { Trash2Icon } from "lucide-react";
import DialogUserDetails from "./profilesDialog";
import { useQuery } from "@tanstack/react-query";
import { ProfileType } from "@/lib/types";
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
} from "@/components/ui/alert-dialog";
import { useDeleteProfile } from "./mutation";

const apiProfile = async () => {
  try {
    const res = await fetch("/api/profiles", {
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

function ProfilesTable() {
  const mutation = useDeleteProfile();
  const { data, isLoading } = useQuery({
    queryKey: ["profiles"],
    queryFn: apiProfile,
  });

  return (
    <>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-blue-50">
            <tr>
              <th className="py-2 px-4 text-left">No</th>
              <th className="py-2 px-4 text-left">Nama Lengkap</th>
              <th className="py-2 px-4 text-left">JK</th>
              <th className="py-2 px-4 text-left">Umur</th>
              <th className="py-2 px-4 text-left">Pendidikan</th>
              <th className="py-2 px-4 text-left">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <div>Loading...</div>
            ) : (
              data?.data?.map((item: ProfileType, index: number) => (
                <tr
                  key={index}
                  className={`hover:bg-zinc-200 transition duration-300 ${
                    index % 2 === 1 ? "bg-zinc-100" : ""
                  }`}
                >
                  <td className="text-sm py-2 px-4">{index + 1}</td>
                  <td className="text-sm py-2 px-4">{item.full_name}</td>
                  <td className="text-sm py-2 px-4">
                    <span
                      className={`rounded-full px-2  ${
                        item.gender === "male"
                          ? "bg-blue-200 text-blue-700"
                          : "bg-pink-200 text-pink-700"
                      }`}
                    >
                      {item.gender}
                    </span>
                  </td>
                  <td className="text-sm py-2 px-4">{item.age}</td>
                  <td className="text-sm py-2 px-4">{item.educate}</td>
                  <td className="flex gap-2 text-sm py-2 px-4">
                    <DialogUserDetails item={item} />
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
                          <AlertDialogAction
                            onClick={() => mutation.mutate(item?.id)}
                          >
                            Ya
                          </AlertDialogAction>
                          <AlertDialogCancel>Tidak</AlertDialogCancel>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ProfilesTable;
