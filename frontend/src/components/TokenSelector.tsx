"use client";
import { useAccount, useReadContract } from "wagmi";
import { formatUnits } from "viem";
import { useState, useRef, useEffect } from "react";
import { ERC20_ABI } from "@/lib/constants";
import { cn, fmtUnits, shorten } from "@/lib/utils";

interface Token { symbol: string; address: string; decimals: number; icon?: string }

export function TokenSelector({ tokens, selected, onSelect, label, showBalance = true }: {
  tokens: Token[]; selected: Token; onSelect: (t: Token) => void; label?: string; showBalance?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { address } = useAccount();

  useEffect(() => {
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", h); return () => document.removeEventListener("mousedown", h);
  }, []);

  const { data: bal } = useReadContract({
    address: selected.address as `0x${string}`, abi: ERC20_ABI, functionName: "balanceOf",
    args: address ? [address] : undefined, query: { enabled: !!address && showBalance },
  });

  return (
    <div className="relative" ref={ref}>
      {label && <div className="text-xs font-medium text-zinc-500 mb-1.5">{label}</div>}
      <button onClick={() => setOpen(!open)} className="flex items-center gap-2.5 bg-zinc-800/50 border border-zinc-700 rounded-xl px-3.5 py-2.5 hover:border-zinc-600 transition-colors min-w-[130px]">
        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0">
          {selected.symbol.slice(0, 2)}
        </div>
        <span className="font-semibold text-sm">{selected.symbol}</span>
        <svg className="ml-auto w-3.5 h-3.5 text-zinc-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
      </button>
      {showBalance && address && (
        <div className="text-xs text-zinc-500 mt-1">Balance: {bal ? Number(formatUnits(bal as bigint, selected.decimals)).toFixed(4) : "0"}</div>
      )}
      {open && (
        <div className="absolute top-full mt-1 w-56 rounded-xl bg-zinc-900 border border-zinc-700 shadow-xl z-50 overflow-hidden">
          <div className="p-2">
            {tokens.map((t) => (
              <button key={t.symbol} onClick={() => { onSelect(t); setOpen(false); }}
                className={cn("w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm hover:bg-zinc-800 transition-colors",
                  t.symbol === selected.symbol && "bg-zinc-800")}>
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0">{t.symbol.slice(0, 2)}</div>
                <div className="text-left"><div className="font-semibold">{t.symbol}</div></div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
