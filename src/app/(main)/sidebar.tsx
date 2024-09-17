"use server";

import { BookUser, House, Library, Table2, User } from "lucide-react";
import SidebarItem from "./sidebarItem";
import { SidebarWrapper } from "./sidebar-wrapper";
import { getServerUser } from "@/lib/getServerUser";
import ButtonLogout from "@/components/custom/button-logout";

const navItems = [
  {
    title: "Beranda",
    type: "nav",
    path: "/",
    icon: <House className="size-4" />,
  },
  {
    title: "Tentang",
    type: "nav",
    path: "/about",
    icon: <Library className="size-4" />,
  },
  {
    title: "Pertemuan",
    type: "nav",
    path: "/meetings",
    icon: <BookUser className="size-4" />,
  },
  {
    title: "Profil",
    type: "nav",
    path: "/profile",
    icon: <User className="size-4" />,
  },
];

const navItemsAdmin = [
  {
    title: "Beranda",
    type: "nav",
    path: "/admin",
    icon: <House className="size-4" />,
  },
  {
    title: "Tentang",
    type: "nav",
    path: "/admin/about",
    icon: <Library className="size-4" />,
  },
  {
    title: "Pertemuan",
    type: "nav",
    path: "/admin/meetings",
    icon: <BookUser className="size-4" />,
  },
  {
    title: "Tabel",
    type: "nav",
    path: "/admin/table",
    icon: <Table2 className="size-4" />,
  },
  {
    title: "Profil",
    type: "nav",
    path: "/admin/profile",
    icon: <User className="size-4" />,
  },
];

export async function Sidebar() {
  const user = await getServerUser();

  return (
    <SidebarWrapper>
      <div className="h-full space-y-4 pt-4">
        <div className="px-3 pt-2 flex flex-col h-full">
          <h2 className="mb-2 px-4 text-[15px] font-semibold tracking-tight">
            Badan Pusat Statistik
          </h2>
          <div className="space-y-1 flex-1 flex flex-col gap-1">
            {user?.role === "ADMIN"
              ? navItemsAdmin.map((item, index) => (
                  <SidebarItem item={item} role={user?.role} key={index} />
                ))
              : navItems.map((item, index) => (
                  <SidebarItem item={item} role={user?.role} key={index} />
                ))}
          </div>
          <ButtonLogout />
        </div>
      </div>
    </SidebarWrapper>
  );
}
