import Image from "next/image";
import pinImage from "Image/images/pin.png";
import { cn } from "@/lib/utils";

function HeaderText({
  className,
  title,
}: {
  className?: string;
  title: string;
}) {
  return (
    <div className="flex items-end gap-1">
      <Image src={pinImage} alt="Help" className="w-12" />
      <h2 className={cn("mt-5 font-bold", className)}>{title}</h2>
    </div>
  );
}

export default HeaderText;
