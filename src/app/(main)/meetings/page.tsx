import DialogForm from "./DialogForm";
import GetDataMeeting from "./getDataMeeting";

function Page() {
  return (
    <div>
      <h2 className="mb-3 font-bold text-xl">Form Pengajuan Pertemuan</h2>
      <DialogForm />
      <GetDataMeeting />
    </div>
  );
}

export default Page;
