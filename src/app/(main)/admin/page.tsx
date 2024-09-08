import { getServerUser } from "@/lib/getServerUser";
import React from "react";

export default async function Page() {
  const user = await getServerUser();

  console.log(user);

  return (
    <div>
      <h1>Halaman admin</h1>
    </div>
  );
}
