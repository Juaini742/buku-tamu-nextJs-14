"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

interface Props {
  item: {
    title: string;
    type: string;
    path: string;
    icon: React.ReactNode;
    data?: {
      name: string;
      path: string;
      icon: React.ReactNode;
    }[];
  };
  role: undefined | string;
}

function SidebarItem({ item, role }: Props) {
  const pathname = usePathname();

  return (
    <>
      <Link href={item.path} key={item.title}>
        <Button
          variant="ghost"
          className={`w-full flex items-center gap-2 justify-start ${
            role === "GUEST"
              ? (
                  item.path === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.path)
                )
                ? "bg-primary text-white"
                : ""
              : role === "ADMIN"
              ? (
                  item.path === "/admin"
                    ? pathname === "/admin"
                    : pathname.startsWith(item.path)
                )
                ? "bg-primary text-white"
                : ""
              : ""
          }`}
        >
          {item.icon}
          <span className="text-sm">{item.title}</span>
        </Button>
      </Link>
    </>
  );
}
export default SidebarItem;
