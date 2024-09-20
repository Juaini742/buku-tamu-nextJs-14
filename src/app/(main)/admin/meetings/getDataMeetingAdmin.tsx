"use client";

import { MeetingType } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { EyeIcon, RefreshCw, Trash2Icon } from "lucide-react";
import DialogUpdate from "./DialogUpdate";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import DialogDetails from "../../meetings/DialogDetails";
import { Button } from "@/components/ui/button";
import useDeleteMeetings from "./mutation.delete";
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
import { ButtonReport } from "@/components/custom/ButtonReport";
import { format } from "date-fns";

const meetingApi = async () => {
  try {
    const res = await fetch("/api/meetings/", {
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

function GetDataMeetingAdmin() {
  const mutation = useDeleteMeetings();
  const {
    data: meetings,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["meetings"],
    queryFn: meetingApi,
  });

  const handleDeleteMeetings = (id: string) => {
    mutation.mutate(id);
  };

  return (
    <div className="mt-7">
      <div className="overflow-x-auto">
        <div className="w-full bg-blue-50 flex justify-between gap-3 mb-2">
          <ButtonReport />
          <Button
            variant="outline"
            onClick={() => refetch()}
            className="py-2 px-3"
          >
            <RefreshCw className="size-4" />
          </Button>
        </div>
        <table className="min-w-full bg-white">
          <thead className="bg-blue-50">
            <tr>
              <th className="py-2 px-4 text-left">No</th>
              <th className="py-2 px-4 text-left">Tanggal Pengajuan</th>
              <th className="py-2 px-4 text-left">Nama</th>
              <th className="py-2 px-4 text-left">Subject</th>
              <th className="py-2 px-4 text-left">Keperluan</th>
              <th className="py-2 px-4 text-left">Status</th>
              <th className="py-2 px-4 text-left">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <div>Loading...</div>
            ) : (
              meetings.map((item: MeetingType, index: number) => (
                <tr
                  key={index}
                  className={`hover:bg-zinc-200 transition duration-300 ${
                    index % 2 === 1 ? "bg-zinc-100" : ""
                  }`}
                >
                  <td className="text-sm py-2 px-4">{index + 1}</td>
                  <td className="text-sm py-2 px-4">
                    {format(
                      new Date(item.meeting_date),
                      "cccc, dd-MM-yyyy, HH:mm"
                    )}
                  </td>
                  <td className="text-sm py-2 px-4">
                    {item.profile.full_name}
                  </td>
                  <td className="text-sm py-2 px-4">
                    <span
                      className={` italic text-sm rounded-full px-2  
                    ${
                      item.subject === "IPDS"
                        ? "bg-green-200 text-green-700"
                        : item.subject === "umum"
                        ? "bg-lime-200 text-lime-700"
                        : item.subject === "pegawai"
                        ? "bg-teal-200 text-teal-700"
                        : "bg-indigo-200 text-indigo-700"
                    }
                    `}
                    >
                      {item.subject}
                    </span>
                  </td>
                  <td className="text-sm py-2 px-4">{item.description}</td>
                  <td className="text-sm py-2 px-4">
                    <DialogUpdate item={item} />
                  </td>
                  <td className="flex gap-2 text-sm py-2 px-4">
                    <Dialog>
                      <DialogTrigger asChild>
                        <button>
                          <EyeIcon className="size-4 my-1" />
                        </button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Detail data pertemuan</DialogTitle>
                        </DialogHeader>
                        <DialogDetails item={item} />
                      </DialogContent>
                    </Dialog>

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
                            onClick={() => handleDeleteMeetings(item.id)}
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
    </div>
  );
}
export default GetDataMeetingAdmin;
