"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import Logo from "./Logo";
import { Button } from "./ui/button";

export default function Header() {
  const { data: session } = useSession();

  return (
    <header className="bg-white shadow-sm w-screen">
      <nav className="max-w-7xl mx-auto px-10 py-1 flex justify-between items-center">
        <Logo />
        <div>
          {session ? (
            <>
              <Link href="/dashboard" className="mr-4">
                Dashboard
              </Link>
              <button onClick={() => signOut()}>Sign out</button>
            </>
          ) : (
            <Link href="/auth">
              {" "}
              <Button className="bg-pred px-10 py-6 text-lg rounded-xl">
                Sign in
              </Button>
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
