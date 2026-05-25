"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const LINKS = [
  { href: "/", label: "Dashboard" },
  { href: "/swap", label: "Swap" },
  { href: "/liquidity", label: "Liquidity" },
  { href: "/bridge", label: "Bridge" },
  { href: "/staking", label: "Staking" },
];

export default function Navbar() {
  const pathname = usePathname();
  return (
    <nav className="bg-gray-900 border-b border-gray-800 px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-6">
        <Link href="/" className="text-xl font-bold text-blue-400">
          LitVM DeFi
        </Link>
        {LINKS.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className={`text-sm ${pathname === l.href ? "text-blue-400" : "text-gray-400 hover:text-white"}`}
          >
            {l.label}
          </Link>
        ))}
      </div>
      <ConnectButton />
    </nav>
  );
}
