import { BellDot } from "lucide-react";

function NotificationSidebar() {
  const notifications = [
    {
      id: 1,
      title: "Notification 1",
      description: "This is the first notification",
    },
    {
      id: 2,
      title: "Notification 2",
      description: "This is the first notification",
    },
  ];
  return (
    <div className="px-3 mt-5">
      <h2 className="font-bold">Pesan</h2>
      <div className="flex flex-col gap-3 mt-5">
        {notifications.map(
          (item: { id: number; title: string; description: string }) => (
            <div key={item.id} className="border-b p-2 rounded-sm">
              <div className="flex gap-2 items-end mb-2">
                <BellDot />
                <h6 className="font-bold">{item.title}</h6>
              </div>
              <p className="text-sm">{item.description}</p>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default NotificationSidebar;
