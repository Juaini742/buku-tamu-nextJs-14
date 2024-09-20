import { Card } from "@/components/ui/card";
import RegisterForm from "./Form";
import Image from "next/image";
import imageUrl from "Image/images/logoStatistik black.png";
// import GoogleButton from "@/components/auth/google-button";

export default function Page() {
  return (
    <div className="min-h-screen w-full flex justify-center items-center">
      <Card className="container px-5 py-10">
        <div className="mb-4 w-full flex justify-center">
          <Image src={imageUrl} alt="Logo" className="w-32 md:w-52" />
        </div>
        <RegisterForm />
        {/* <p className="py-2 text-center text-muted-foreground">atau</p>
        <GoogleButton /> */}
      </Card>
    </div>
  );
}
