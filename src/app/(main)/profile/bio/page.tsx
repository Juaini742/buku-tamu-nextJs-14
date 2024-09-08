import React from "react";
// import BioForm from "./form";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronsLeft } from "lucide-react";

function Page() {
  return (
    <div>
      <Link href="/profile">
        <Button variant="warning">
          <ChevronsLeft />
        </Button>
      </Link>
      {/* <div className="md:px-1 mt-4">
        <BioForm />
      </div> */}
    </div>
  );
}

export default Page;
