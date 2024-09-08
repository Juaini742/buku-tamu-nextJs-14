"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export default function BreadcrumbIndicator({
  className,
}: {
  className?: string;
}) {
  const pathname = usePathname();
  const selectedPathname = pathname.split("/").filter((path) => path);

  return (
    <Breadcrumb className={cn(className)}>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">BPS</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          {selectedPathname.map((path, index) => {
            return (
              <>
                <BreadcrumbLink
                  key={index}
                  href={`/${selectedPathname.slice(0, index + 1).join("/")}`}
                >
                  <BreadcrumbItem>
                    <BreadcrumbPage>{path}</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbLink>
                <BreadcrumbSeparator />
              </>
            );
          })}
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
