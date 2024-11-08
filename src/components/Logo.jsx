import Link from "next/link";
import React from "react";

export default function Logo() {
  return (
    <Link href="/">
      <div className="   aspect-square flex items-center justify-center lg:text-2xl">
        Poster.xyz
      </div>
    </Link>
  );
}
