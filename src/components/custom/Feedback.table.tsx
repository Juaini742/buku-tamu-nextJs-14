import { EyeIcon, PencilIcon, Trash2Icon } from "lucide-react";
import { Badge } from "../ui/badge";
import Link from "next/link";

function FeedbackTable() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[600px]">
        <thead className="bg-blue-50">
          <tr>
            <th className="py-2 text-left">No</th>
            <th className="py-2 text-left">Tanggal</th>
            <th className="py-2 text-left">Nama</th>
            <th className="py-2 text-left">JK</th>
            <th className="py-2 text-left">Pesan</th>
            <th className="py-2 text-left">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {[...Array(10)].map((_, index) => (
            <tr
              key={index}
              className={`hover:bg-zinc-200 trans-300 ${
                index % 2 === 1 && "bg-zinc-100"
              }`}
            >
              <th className="text-sm py-2">{index + 1}</th>
              <td className="text-sm py-2">1/23/2034</td>
              <td className="text-sm py-2">John</td>
              <td className="text-sm py-2">
                <span className="bg-blue-200 rounded-full px-2 text-blue-700">
                  Pria
                </span>
              </td>
              <td className="text-sm py-2 w-52 lg:w-96">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde
                amet quia distinctio?
              </td>
              <td className="flex gap-2 text-sm py-2">
                <Badge className="rounded cursor-pointer">
                  <Link href="/">
                    <EyeIcon className="size-4 my-1" />
                  </Link>
                </Badge>
                <Badge variant="warning" className="rounded cursor-pointer">
                  <Link href="/">
                    <PencilIcon className="size-4 my-1" />
                  </Link>
                </Badge>
                <Badge variant="destructive" className="rounded cursor-pointer">
                  <Trash2Icon className="size-4 my-1" />
                </Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FeedbackTable;
