import "./globals.css";
import type { Metadata } from "next";
import { Navbar, Footer, SessionProvider } from "@/components/index";
//next auth
import { getServerSession } from "next-auth";
import { options } from "./api/auth/[...nextauth]/options";
export const metadata: Metadata = {
  title: "JobNow | Get your job right now",
  description: "Join Now and Discover over 10.000 job offers ",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(options);
  return (
    <html lang="en">
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <body className="relative overflow-x-hidden ">
        <SessionProvider session={session}>
          <Navbar />
          {children}
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
