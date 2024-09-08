import { EyeIcon } from "lucide-react";
import Link from "next/link";

function GuestTableUser() {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead className="bg-blue-50">
          <tr>
            <th className="py-2 px-4 text-left">No</th>
            <th className="py-2 px-4 text-left">Tanggal Kunjungan</th>
            <th className="py-2 px-4 text-left">Nama</th>
            <th className="py-2 px-4 text-left">JK</th>
            <th className="py-2 px-4 text-left">Keperluan</th>
            <th className="py-2 px-4 text-left">Status</th>
            <th className="py-2 px-4 text-left">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {[...Array(10)].map((_, index) => (
            <tr
              key={index}
              className={`hover:bg-zinc-200 transition duration-300 ${
                index % 2 === 1 ? "bg-zinc-100" : ""
              }`}
            >
              <td className="text-sm py-2 px-4">{index + 1}</td>
              <td className="text-sm py-2 px-4">1/23/2034</td>
              <td className="text-sm py-2 px-4">John</td>
              <td className="text-sm py-2 px-4">
                <span className="bg-blue-200 rounded-full px-2 text-blue-700">
                  Pria
                </span>
              </td>
              <td className="text-sm py-2 px-4">Minta Data Sosial</td>
              <td className="text-sm py-2 px-4">
                <span className="bg-blue-200 italic text-sm rounded-full px-2 text-blue-700">
                  Diterima
                </span>
              </td>
              <td className="flex gap-2 text-sm py-2 px-4">
                <span className="rounded cursor-pointer">
                  <Link href="/">
                    <EyeIcon className="size-4 my-1" />
                  </Link>
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default GuestTableUser;
