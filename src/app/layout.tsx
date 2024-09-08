import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ReactQueryConfiguration from "./ReactQueryConfiguration";
import { Toaster } from "@/components/ui/toaster";
import AuthProvider from "@/lib/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Buku Tamu",
  description: "Buku tamu Badan Pusat Statistik Kab HTS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <ReactQueryConfiguration>{children}</ReactQueryConfiguration>
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
