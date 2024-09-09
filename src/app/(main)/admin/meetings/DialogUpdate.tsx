import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MeetingType } from "@/lib/types";
import { useState } from "react";
import useUpdateMeetingsStatus from "./mutation";

function DialogUpdate({ item }: { item: MeetingType }) {
  const [status, setStatus] = useState(item.status);
  const mutation = useUpdateMeetingsStatus();

  async function onSubmit(e: { preventDefault: () => void }) {
    e.preventDefault();
    const data = { status, id: item.id };
    mutation.mutateAsync(data);
    setStatus("");
  }

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <button
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
          </button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Form Perubahan Status Pertemuan</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            Silahkan confirmasi apakah pertemuan bisa dilakuakn
          </DialogDescription>
          <form onSubmit={onSubmit} className="w-full">
            <Select onValueChange={(value) => setStatus(value)}>
              <SelectTrigger>
                <SelectValue placeholder={item.status} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>{item.status}</SelectLabel>
                  <SelectItem value="pending">Tunggu</SelectItem>
                  <SelectItem value="approve">Terima</SelectItem>
                  <SelectItem value="rejected">Tolak</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Button
              disabled={mutation.isPending}
              className={`mt-3 w-full ${mutation.isPending && "animate-pulse"}`}
            >
              {mutation.isPending ? "Sedang proses..." : "Simpan"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default DialogUpdate;
