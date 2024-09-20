"use client";

import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import { signIn } from "next-auth/react";

const googleImageUrl =
  "https://res.cloudinary.com/dixdqxpza/image/upload/v1726618224/google_t2ktnn.png";

export default function GoogleButton() {
  const onClick = () => {
    signIn("google", {
      callbackUrl: "/",
    });
  };
  return (
    <div className="w-full">
      <Button
        onClick={onClick}
        variant="outline"
        className="w-full flex items-center gap-2 h-[3rem]"
      >
        <Image src={googleImageUrl} alt="Google icon" width={20} height={20} />
        <span className="text-lg">Masuk dengan akun google</span>
      </Button>
    </div>
  );
}
