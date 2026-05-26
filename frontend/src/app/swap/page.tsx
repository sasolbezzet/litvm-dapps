"use client";
import { useState } from "react";
import { useAccount } from "wagmi";
import { formatUnits } from "viem";
import { TOKENS } from "@/config/addresses";
import { useSwap } from "@/hooks/useSwap";
import { fmtUnits } from "@/lib/utils";
import { StatsCard } from "@/components/StatsCard";

export default function SwapPage() {
  const { address, isConnected } = useAccount();
  const [from, setFrom] = useState(TOKENS[0]);
  const [to, setTo] = useState(TOKENS[1]);
  const [amount, setAmount] = useState("");
  const [slippage, setSlippage] = useState(0.5);

  const { outAmount, needApprove, txHash, isPending, approve, swap } = useSwap(from.address, to.address, amount, from.decimals, to.decimals, slippage);
  const out = outAmount > 0n ? Number(formatUnits(outAmount, to.decimals)) : 0;

  if (!isConnected) return <Connect />;

  const handleSwap = () => { if (address) swap(address); };

  return (
    <div className="mt-10 max-w-[480px] mx-auto">
      <h1 className="text-2xl font-bold text-white mb-6">Swap</h1>
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 space-y-1">
        <div className="text-xs text-zinc-500 mb-2">You pay</div>
        <div className="flex gap-3 items-end">
          <input className="flex-1 h-16 bg-zinc-800/30 border-0 rounded-xl px-4 text-2xl font-semibold text-white outline-none placeholder:text-zinc-600" placeholder="0.0" value={amount} onChange={e => setAmount(e.target.value)} />
          <select className="bg-zinc-800/50 border border-zinc-700 rounded-xl px-3 py-2.5 text-white text-sm font-semibold outline-none min-w-[110px]" value={from.symbol} onChange={e => setFrom(TOKENS.find(t => t.symbol === e.target.value) || TOKENS[0])}>
            {TOKENS.map(t => <option key={t.symbol}>{t.symbol}</option>)}
          </select>
        </div>
        <div className="flex justify-center py-1">
          <button onClick={() => { const f = from; setFrom(to); setTo(f); }} className="w-9 h-9 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center hover:bg-zinc-700 text-lg">↓</button>
        </div>
        <div className="text-xs text-zinc-500 mb-2">You receive</div>
        <div className="flex gap-3 items-end">
          <div className="flex-1 h-16 bg-zinc-800/30 rounded-xl px-4 flex items-center text-2xl font-semibold text-zinc-400">{out.toFixed(6)}</div>
          <select className="bg-zinc-800/50 border border-zinc-700 rounded-xl px-3 py-2.5 text-white text-sm font-semibold outline-none min-w-[110px]" value={to.symbol} onChange={e => setTo(TOKENS.find(t => t.symbol === e.target.value) || TOKENS[1])}>
            {TOKENS.map(t => <option key={t.symbol}>{t.symbol}</option>)}
          </select>
        </div>
        {out > 0 && (
          <div className="pt-3 space-y-1.5 text-xs">
            <Row l="Price" v={`1 ${from.symbol} = ${(out / Number(amount || "1")).toFixed(6)} ${to.symbol}`} />
            <Row l="Slippage" v={<span className="flex gap-1">{[0.1,0.5,1].map(s => <button key={s} onClick={()=>setSlippage(s)} className={`px-2 py-0.5 rounded ${slippage===s?"bg-green-500/20 text-green-400":"text-zinc-500"}`}>{s}%</button>)}</span>} />
            <Row l="Min received" v={`${(out * (1 - slippage/100)).toFixed(6)} ${to.symbol}`} />
          </div>
        )}
        {txHash && <div className="pt-2 text-xs font-mono text-zinc-500 truncate">{txHash} {isPending && <span className="text-amber-400">pending...</span>}</div>}
        {needApprove ? (
          <button onClick={approve} disabled={isPending} className="w-full h-12 mt-3 rounded-xl bg-green-500 text-black font-semibold hover:bg-green-600 disabled:opacity-40 transition-colors">{isPending ? "Approving..." : `Approve ${from.symbol}`}</button>
        ) : (
          <button onClick={handleSwap} disabled={!amount || isPending} className="w-full h-12 mt-3 rounded-xl bg-green-500 text-black font-semibold hover:bg-green-600 disabled:opacity-40 transition-colors">{isPending ? "Swapping..." : "Swap"}</button>
        )}
      </div>
    </div>
  );
}

function Row({ l, v }: { l: string; v: React.ReactNode }) { return <div className="flex justify-between"><span className="text-zinc-500">{l}</span><span className="text-white">{v}</span></div>; }
function Connect() { return <div className="flex items-center justify-center min-h-[60vh]"><h2 className="text-xl font-bold text-white">Connect Wallet</h2></div>; }
