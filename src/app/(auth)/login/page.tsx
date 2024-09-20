import { Card } from "@/components/ui/card";
import LoginForm from "./Form";
import Image from "next/image";
import imageUrl from "Image/images/logoStatistik black.png";
// import LoginGoogleButton from "@/components/auth/login-google-button";

export default function Page() {
  return (
    <div className="min-h-screen w-full flex justify-center items-center">
      <Card className="container px-5 py-10">
        <div className="mb-4 w-full flex justify-center">
          <Image src={imageUrl} alt="Logo" className="w-32 md:w-52" />
        </div>
        <LoginForm />
        {/* <p className="py-2 text-center text-muted-foreground">atau</p>
        <LoginGoogleButton /> */}
      </Card>
    </div>
  );
}
