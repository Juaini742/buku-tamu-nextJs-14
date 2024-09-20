// import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getServerProfile } from "@/lib/getServerProfile";
import Image from "next/image";
import profileImage from "Image/images/blank.jpg";
// import Link from "next/link";

async function Page() {
  const user = await getServerProfile();

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="p-2">
        <Image src={profileImage} alt="Profile" className="w-32 rounded-md" />
      </div>
      <Card className="mb-5 p-2">
        <ul className="flex flex-col gap-3">
          <li>Username: {user.username}</li>
          <li>Email: {user.email}</li>
          <li>Nama Lengkap: {user.full_name}</li>
          <li>Jenis Kelamin: {user.gender}</li>
          <li>Umur: {user.age}</li>
          <li>Tanggal Lahir: {user.born?.toDateString()}</li>
          <li>KTP: {user.ktp?.toString()}</li>
          <li>Pendidikan: {user.educate}</li>
          <li>Alamat Lengkap: {user.address}</li>
        </ul>
      </Card>
      {/* <div className="flex gap-3">
        <Link href="profile/bio">
          <Button>Perbaharui Biodata</Button>
        </Link>
        <Link href="profile/bio">
          <Button>Perbaharui Email</Button>
        </Link>
      </div> */}
    </div>
  );
}

export default Page;
