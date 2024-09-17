"use client";

import { useState } from "react";
import bpsIcon from "Image/images/logoStatistik.png";
import bellIcon from "Image/images/bell.png";
import Image from "next/image";
import NotificationSidebar from "./notification";

export function SidebarWrapper({ children }: { children: React.ReactNode }) {
  const [isVIsible, setIsVIsible] = useState(false);
  const [isVIsibleNotification, setIsVIsibleNotification] = useState(false);

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
        {children}
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
