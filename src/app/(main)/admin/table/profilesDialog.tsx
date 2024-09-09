"use client";

import {
  DialogTitle,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ProfileType } from "@/lib/types";
import { EyeIcon } from "lucide-react";

function DialogUserDetails({ item }: { item: ProfileType }) {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <button className="rounded cursor-pointer">
            <EyeIcon className="size-4 my-1" />
          </button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Form Pengajuan Bertamu</DialogTitle>
          </DialogHeader>
          <div className="container">
            <ul className="flex flex-col gap-3">
              <li>Nama Lengkap: {item?.full_name}</li>
              <li>Jenis Kelamin: {item.gender}</li>
              <li>Umur: {item?.age}</li>
              <li>Tanggal Lahir: {item?.born}</li>
              <li>KTP: {item?.ktp}</li>
              <li>Pendidikan: {item?.educate}</li>
              <li>Alamat Lengkap: {item?.address}</li>
            </ul>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
export default DialogUserDetails;
