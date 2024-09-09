import { Card } from "@/components/ui/card";
import { getServerUser } from "@/lib/getServerUser";
import AddingUserForm from "./Form";

async function Page() {
  const user = await getServerUser();
  return (
    <div>
      <Card className="mb-5 p-2">
        <ul className="flex flex-col gap-3">
          <li>Username: {user?.username}</li>
          <li>Email: {user?.email}</li>
          <li>Role: {user?.role}</li>
        </ul>
      </Card>

      <Card className="mt-10 p-3">
        <AddingUserForm />
      </Card>
    </div>
  );
}

export default Page;
