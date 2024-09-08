import { ScrollArea } from "@/components/ui/scroll-area";
import { Sidebar } from "./sidebar";
import BreadcrumbIndicator from "./breadcrumb";
import DialogProfile from "./dialogProfile";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen flex overflow-hidden relative">
      <Sidebar />
      <div className="flex-1 lg:border-l">
        <ScrollArea className="h-full px-4 py-6 lg:px-8">
          <BreadcrumbIndicator />
          <div className="font-bold text-primary mb-6">
            <h1>Selamat Datang Di Website</h1>
            <h1>Badan Pusat Statistik Kab. HST</h1>
          </div>
          {children}
        </ScrollArea>
      </div>
      <DialogProfile />
    </div>
  );
}
