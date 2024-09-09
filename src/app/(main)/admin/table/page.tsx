import GetDataMeetingAdmin from "../meetings/getDataMeetingAdmin";
import ProfilesTable from "./profilesTable";
import UsersTable from "./usersTable";

function Page() {
  return (
    <section className="flex flex-col gap-5">
      <div>
        <h2 className="mb-2 font-bold text-xl">Table User</h2>
        <UsersTable />
      </div>
      <div>
        <h2 className="mb-2 font-bold text-xl">Table biodata user</h2>
        <ProfilesTable />
      </div>
      <div>
        <h2 className="mb-2 font-bold text-xl">Table Pertemuan</h2>
        <GetDataMeetingAdmin />
      </div>
    </section>
  );
}

export default Page;
