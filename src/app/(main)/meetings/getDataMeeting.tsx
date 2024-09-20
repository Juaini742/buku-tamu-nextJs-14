"use client";

import { MeetingType } from "@/lib/types";
import DialogDetails from "./DialogDetails";
import { useQuery } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { EyeIcon, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

const meetingApi = async () => {
  try {
    const res = await fetch("api/meetings/user", {
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

function GetDataMeeting() {
  const {
    data: meetings,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["meetings"],
    queryFn: meetingApi,
  });

  return (
    <div className="mt-7">
      <div className="overflow-x-auto">
        <div className="w-full bg-blue-50 flex justify-end mb-2">
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
              <th className="py-2 px-4 text-left">Detail</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <div>Loading...</div>
            ) : (
              meetings?.map((item: MeetingType, index: number) => (
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
                    {item?.profile?.full_name}
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
                    <span
                      className={` italic text-sm rounded-full px-2  
                    ${
                      item.status === "pending"
                        ? "bg-yellow-200 text-yellow-700"
                        : item.status === "rejected"
                        ? "bg-red-200 text-red-700"
                        : "bg-blue-200 text-blue-700"
                    }
                    `}
                    >
                      {item.status === "approve"
                        ? "Diterima"
                        : item.status === "rejected"
                        ? "Ditolak"
                        : "Proses"}
                    </span>
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
export default GetDataMeeting;
