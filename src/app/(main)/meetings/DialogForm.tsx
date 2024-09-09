import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import MeetingsForm from "./form";

function DialogForm() {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button>Buat Pertemuan</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Form Pengajuan Bertamu</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            Isi form di bawah ini untuk mengajukan pertemuan
          </DialogDescription>
          <MeetingsForm />
        </DialogContent>
      </Dialog>
    </>
  );
}

export default DialogForm;
