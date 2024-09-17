"use client";

import { Button } from "../ui/button";
import { LogOut } from "lucide-react";
import { logout } from "@/actions/logout";

export default function ButtonLogout() {
  const handleLogout = () => {
    logout().then(() => {
      window.location.reload();
    });
  };
  return (
    <Button onClick={handleLogout} variant="destructive">
      <LogOut className="size-4" />
      Logout
    </Button>
  );
}
