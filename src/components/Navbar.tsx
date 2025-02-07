"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full bg-white text-black border-b border-[var(--border-color)] py-4 flex justify-between items-center z-50 px-[7%]">
      <Link href="/" className="text-2xl font-extrabold text-[var(--primary-color)] cursor-pointer">
        DummyJSONCRUD
      </Link>

      <span className="text-md font-medium bg-[var(--primary-color)] px-4 rounded-full leading-none text-black py-2">
        Oreanu
      </span>
    </nav>
  );
}
