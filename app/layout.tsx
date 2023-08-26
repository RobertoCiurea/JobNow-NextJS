import "./globals.css";
import type { Metadata } from "next";
import { Navbar, Footer } from "@/components/index";

export const metadata: Metadata = {
  title: "JobNow | Get your job right now",
  description: "Discover over 10.000 job offers ",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <body className="relative overflow-x-hidden ">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
