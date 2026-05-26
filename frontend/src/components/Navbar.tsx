"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAccount, useConnect, useDisconnect, useBalance } from "wagmi";
import { injected } from "wagmi/connectors";
import { useState, useRef, useEffect } from "react";
import { formatUnits } from "viem";
import { cn, shorten } from "@/lib/utils";

const links = [
  { h: "/", l: "Dashboard" }, { h: "/swap/", l: "Swap" }, { h: "/liquidity/", l: "Liquidity" },
  { h: "/bridge/", l: "Bridge" }, { h: "/staking/", l: "Staking" },
];

export default function Navbar() {
  const p = usePathname();
  return (
    <nav className="sticky top-0 z-50 border-b border-zinc-800/50 bg-[#020617]/90 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2.5 no-underline">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-xs font-bold text-black">L</div>
            <span className="text-base font-bold tracking-tight text-white">LitVM DeFi</span>
          </Link>
          <div className="hidden md:flex gap-1">
            {links.map(l => {
              const active = p === l.h || (l.h === "/" && p === "/");
              return <Link key={l.h} href={l.h} className={cn("px-3 py-2 rounded-lg text-sm font-medium no-underline transition-colors", active ? "bg-zinc-800 text-white" : "text-zinc-400 hover:text-zinc-200")}>{l.l}</Link>;
            })}
          </div>
        </div>
        <ConnectBtn />
      </div>
    </nav>
  );
}

function ConnectBtn() {
  const { address, isConnected, chainId } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();
  const { data: bal } = useBalance({ address });
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => { const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); }; document.addEventListener("mousedown", h); return () => document.removeEventListener("mousedown", h); }, []);

  if (isConnected && address) return (
    <div className="relative" ref={ref}>
      <button onClick={() => setOpen(!open)} className="flex items-center gap-2.5 bg-zinc-800/50 border border-zinc-700 rounded-xl px-3.5 py-2 hover:border-zinc-600 transition-colors">
        <div className="w-2 h-2 rounded-full bg-green-400" />
        <span className="text-sm font-medium text-white">{shorten(address)}</span>
        {bal && <span className="text-xs text-zinc-500">{Number(formatUnits(bal.value, bal.decimals)).toFixed(3)} {bal.symbol}</span>}
      </button>
      {open && (
        <div className="absolute right-0 top-12 w-64 rounded-xl bg-zinc-900 border border-zinc-700 shadow-2xl overflow-hidden z-50">
          <div className="p-3 border-b border-zinc-800"><div className="text-xs font-mono text-zinc-300">{address.slice(0,10)}...{address.slice(-8)}</div><div className="text-xs text-zinc-500 mt-1">{chainId===4441?"LitVM":"Sepolia"} · Chain {chainId}</div></div>
          <button onClick={()=>{disconnect();setOpen(false)}} className="w-full text-left px-4 py-3 text-sm text-red-400 hover:bg-zinc-800">Disconnect</button>
        </div>
      )}
    </div>
  );

  return (
    <div className="relative" ref={ref}>
      <button onClick={() => setOpen(!open)} className="bg-green-500 hover:bg-green-600 text-black font-semibold rounded-xl px-5 py-2.5 text-sm transition-colors">Connect Wallet</button>
      {open && (
        <div className="absolute right-0 top-12 w-64 rounded-xl bg-zinc-900 border border-zinc-700 shadow-2xl overflow-hidden z-50">
          <div className="p-2">
            <button onClick={()=>{connect({connector:injected()});setOpen(false)}} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-white hover:bg-zinc-800"><span className="text-lg">🦊</span> MetaMask</button>
          </div>
        </div>
      )}
    </div>
  );
}
