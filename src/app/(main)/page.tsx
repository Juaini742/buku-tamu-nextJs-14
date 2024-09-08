import { Card } from "@/components/ui/card";
import Image from "next/image";
import welcomeImage from "Image/images/welcome.png";
import Help from "@/components/main/home/Help";

export default function Home() {
  return (
    <>
      <Card className="flex items-center p-3 lg:h-44 bg-blue-200 relative">
        <div className="w-[65%] md:w-1/2">
          <h3 className="text-xl lg:text-4xl font-bold">Hello, John Doe</h3>
          <p className="text-[11px] md:text-sm lg:text-base text-muted-foreground">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis
            quod totam eaque adipisci, quia ea sint pariatur harum.
          </p>
        </div>
        <Image
          src={welcomeImage}
          alt="Welcome"
          className="w-[11rem] md:w-[15rem] lg:w-[27rem] absolute -top-10 md:-top-16 lg:-top-28 -right-5"
        />
      </Card>
      <Help />
      <div className="mt-3">
        <h2>home</h2>
      </div>
    </>
  );
}
