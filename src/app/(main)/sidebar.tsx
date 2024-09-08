"use client";

import { BookUser, House, Library, LogOut, Table2, User } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import bpsIcon from "Image/images/logoStatistik.png";
import bellIcon from "Image/images/bell.png";
import Image from "next/image";
import SidebarItem from "./sidebarItem";
import NotificationSidebar from "./notification";
import { signOut } from "next-auth/react";
import { useUser } from "@/hooks/useUser";

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
    title: "Tabel",
    type: "nav",
    path: "/table",
    icon: <Table2 className="size-4" />,
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

export function Sidebar() {
  const { user } = useUser();
  const [isVIsible, setIsVIsible] = useState(false);
  const [isVIsibleNotification, setIsVIsibleNotification] = useState(false);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    signOut({ redirect: true });
  };
  return (
    <>
      <button
        onClick={() => setIsVIsible((prev) => !prev)}
        className="block md:hidden absolute z-10 top-5 right-4 p-3 bg-gray-600 hover:bg-gray-800 rounded-tl-xl rounded-bl-xl rounded-br-xl shadow-md text-white trans-300"
      >
        <Image src={bpsIcon} alt="logo" className="w-10 animate-bounce" />
      </button>
      <div
        className={`pb-12 fixed md:relative z-20 top-0 left-0 h-full bg-card shadow-lg transform transition-transform duration-300 ${
          isVIsible ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:block`}
      >
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
            <Button onClick={handleLogout} variant="destructive">
              <LogOut className="size-4" />
              Logout
            </Button>
          </div>
        </div>
      </div>
      <button
        onClick={() => setIsVIsibleNotification((prev) => !prev)}
        className="absolute z-20 bottom-14 right-4 p-2 bg-blue-600 hover:bg-gray-800 rounded-tl-xl rounded-bl-xl rounded-br-xl shadow-md text-white trans-300"
      >
        <Image src={bellIcon} alt="logo" className="w-10 animate-bounce" />
        <div className="absolute -right-3 -top-3 py-1 px-2.5 text-xs rounded-full bg-red-500">
          1
        </div>
      </button>

      <div
        className={`absolute z-10 right-0 left-0 top-0 bottom-0 w-full bg-black/35 backdrop-blur-sm flex justify-end
        ${
          isVIsibleNotification ? "-translate-x-0" : "translate-x-full"
        } transform transition-transform duration-300
        `}
      >
        <div className="w-full md:w-[20rem] bg-white">
          <NotificationSidebar />
        </div>
      </div>
    </>
  );
}
