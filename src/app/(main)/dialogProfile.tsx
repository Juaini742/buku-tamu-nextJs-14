import BioForm from "@/app/(main)/profile/bio/form";
import { Card } from "@/components/ui/card";
import { getServerUser } from "@/lib/getServerUser";
import prisma from "@/lib/prisma";

export default async function DialogProfile() {
  const user = await getServerUser();
  const profile = await prisma.user_profiles.findFirst({
    where: { user_id: user?.id },
  });
  return (
    <>
      {user && !profile && user.role !== "ADMIN" && (
        <div className="px-2 md:px-5 absolute z-30 w-full top-0 bottom-0 left-0 right-0 bg-black/25 backdrop-blur-sm flex justify-center items-center">
          <Card className="p-2 flex-1 bg-white">
            <BioForm user_id={user.id} />
          </Card>
        </div>
      )}
    </>
  );
}
