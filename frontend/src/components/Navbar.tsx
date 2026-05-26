"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const LINKS = [
  { href: "/", label: "Dashboard" },
  { href: "/swap/", label: "Swap" },
  { href: "/liquidity/", label: "Liquidity" },
  { href: "/bridge/", label: "Bridge" },
  { href: "/staking/", label: "Staking" },
];

export default function Navbar() {
  const pathname = usePathname();
  return (
    <nav
      className="sticky top-0 z-50 border-b"
      style={{
        background: "rgba(2, 6, 23, 0.88)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderColor: "var(--border-default)",
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-3 group no-underline">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm transition-shadow"
              style={{
                background: "linear-gradient(135deg, var(--accent-green), var(--accent-green-soft))",
                fontFamily: "var(--font-brand)",
                color: "white",
                boxShadow: "0 2px 12px var(--accent-green-glow)",
              }}
            >
              L
            </div>
            <span className="text-lg font-semibold tracking-wide" style={{ fontFamily: "var(--font-brand)", letterSpacing: "0.05em" }}>
              LITVM
            </span>
          </Link>
          <div className="hidden md:flex items-center gap-1">
            {LINKS.map((l) => {
              const active = pathname === l.href || (l.href === "/" && pathname === "/");
              return (
                <Link key={l.href} href={l.href} className={`nav-link${active ? " active" : ""}`}>
                  {l.label}
                </Link>
              );
            })}
          </div>
        </div>
        <ConnectButton />
      </div>
    </nav>
  );
}
