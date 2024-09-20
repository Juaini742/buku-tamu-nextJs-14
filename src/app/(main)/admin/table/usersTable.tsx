import prisma from "@/lib/prisma";
import { ButtonDeleteUse } from "@/components/custom/ButtonDeleteUser";

async function UsersTable() {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      created_at: true,
    },
  });

  return (
    <>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-blue-50">
            <tr>
              <th className="py-2 px-4 text-left">No</th>
              <th className="py-2 px-4 text-left">Username</th>
              <th className="py-2 px-4 text-left">Email</th>
              <th className="py-2 px-4 text-left">Role</th>
              <th className="py-2 px-4 text-left">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((item, index) => (
              <tr
                key={item.id}
                className={`hover:bg-zinc-200 transition duration-300 ${
                  index % 2 === 1 ? "bg-zinc-100" : ""
                }`}
              >
                <td className="text-sm py-2 px-4">{index + 1}</td>
                <td className="text-sm py-2 px-4">{item.name}</td>
                <td className="text-sm py-2 px-4">{item.email}</td>
                <td className="text-sm py-2 px-4">
                  <span
                    className={`rounded-full px-2  ${
                      item.role === "ADMIN"
                        ? "bg-red-200 text-red-700"
                        : "bg-green-200 text-green-700"
                    }`}
                  >
                    {item.role}
                  </span>
                </td>
                <td className="flex gap-2 text-sm py-2 px-4">
                  <ButtonDeleteUse id={item.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default UsersTable;
