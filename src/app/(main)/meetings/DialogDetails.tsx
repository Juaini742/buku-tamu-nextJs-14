import { Separator } from "@/components/ui/separator";
import { MeetingType } from "@/lib/types";

function DialogDetails({ item }: { item: MeetingType }) {
  return (
    <>
      <div className="container">
        <ul className="flex flex-col gap-3">
          <li>Username: {item?.users.username}</li>
          <li>Email: {item?.users.email}</li>
          <li>Nama Lengkap: {item?.profile?.full_name}</li>
          <li>Jenis Kelamin: {item.profile.gender}</li>
          <li>Umur: {item?.profile.age}</li>
          <li>Tanggal Lahir: {item?.profile?.born}</li>
          <li>KTP: {item?.profile.ktp?.toString()}</li>
          <li>Pendidikan: {item?.profile.educate}</li>
          <li>Alamat Lengkap: {item?.profile.address}</li>
          <Separator />
          <li>Tanggal Pengajuan: {item?.meeting_date}</li>
          <li>Subject: {item?.subject}</li>
          <li>Keperluan: {item?.description}</li>
          <li>
            Status:{" "}
            <span
              className={`italic text-sm rounded-full px-2  
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
          </li>
        </ul>
      </div>
    </>
  );
}
export default DialogDetails;
