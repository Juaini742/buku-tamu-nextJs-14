import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";

const user = {
  username: "Dody123",
  email: "Dody@gmail.com",
  full_name: "Dody",
  gender: "Laki-Laki",
  age: 24,
  born: "xx day 2024",
  KTP: 23984729342,
  educate: "S2",
  address: "Jl.Pancasila Pantai Hambawang Barat",
};

function Page() {
  return (
    <div>
      <Card className="mb-5 p-2">
        <ul className="flex flex-col gap-3">
          <li>Username: {user.username}</li>
          <li>Email: {user.email}</li>
          <li>Nama Lengkap: {user.full_name}</li>
          <li>Jenis Kelamin: {user.gender}</li>
          <li>Umur: {user.age}</li>
          <li>Tanggal Lahir: {user.born}</li>
          <li>KTP: {user.KTP}</li>
          <li>Pendidikan: {user.educate}</li>
          <li>Alamat Lengkap: {user.address}</li>
        </ul>
      </Card>
      <div className="flex gap-3">
        <Link href="profile/bio">
          <Button>Perbaharui Biodata</Button>
        </Link>
        <Link href="profile/bio">
          <Button>Perbaharui Email</Button>
        </Link>
      </div>
    </div>
  );
}

export default Page;
