"use client";
import "@/app/globals.css";
import { Providers } from "@/components/providers/Providers";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";

export default function RootLayout({ children }) {
  const session = useSession();
  const router = useRouter();
  console.log(session);
  if (session.status == "unauthenticated") {
    router.push("/auth");
  }
  return (
    <html lang="en">
      <body className={`antialiased min-h-screen`}>
        <Providers>
          <Navbar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
