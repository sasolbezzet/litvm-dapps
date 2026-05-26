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
      className="sticky top-0 z-50 border-b backdrop-blur-xl"
      style={{
        background: "rgba(10, 11, 13, 0.85)",
        borderColor: "var(--cb-border)",
      }}
    >
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold transition-colors"
              style={{ background: "var(--cb-blue)", color: "white" }}
            >
              L
            </div>
            <span className="text-lg font-semibold tracking-tight">LitVM DeFi</span>
          </Link>
          <div className="hidden md:flex items-center gap-1">
            {LINKS.map((l) => {
              const active = pathname === l.href || (l.href === "/" && pathname === "/");
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className="px-3.5 py-2 rounded-full text-sm font-medium transition-all"
                  style={{
                    color: active ? "white" : "var(--cb-text-secondary)",
                    background: active ? "var(--cb-surface)" : "transparent",
                  }}
                >
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
