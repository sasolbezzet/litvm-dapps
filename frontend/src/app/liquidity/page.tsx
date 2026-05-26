"use client";
import { useState } from "react";
import { useAccount } from "wagmi";
import { formatUnits } from "viem";
import { TOKENS, ADDR } from "@/config/addresses";
import { useLiquidity } from "@/hooks/useLiquidity";
import { fmtUnits } from "@/lib/utils";

const PAIRS = [[0, 1], [0, 3], [1, 3]];

export default function LiquidityPage() {
  const { address, isConnected } = useAccount();
  const [pIdx, setPIdx] = useState(0);
  const [aA, sAA] = useState(""); const [aB, sAB] = useState("");
  const [mode, setMode] = useState<"add" | "remove">("add");

  const tA = TOKENS[PAIRS[pIdx][0]]; const tB = TOKENS[PAIRS[pIdx][1]];
  const { pairAddr, reserves, lpBal, lpTotal, add, txHash, isPending } = useLiquidity(tA.address, tB.address, address);

  if (!isConnected) return <C />;

  const share = lpBal && lpTotal && (lpTotal as bigint) > 0n ? Number((lpBal as bigint) * 10000n / (lpTotal as bigint)) / 100 : 0;

  return (
    <div className="mt-10 max-w-[520px] mx-auto">
      <h1 className="text-2xl font-bold text-white mb-6">Liquidity</h1>
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6">
        <div className="flex bg-zinc-800/50 rounded-xl p-1 mb-6">
          {["add","remove"].map(m => <button key={m} onClick={()=>setMode(m as any)} className={`flex-1 py-2.5 rounded-lg text-sm font-semibold ${mode===m?"bg-green-500 text-black":"text-zinc-400"}`}>{m==="add"?"Add":"Remove"}</button>)}
        </div>

        <div className="mb-4">
          <div className="text-xs text-zinc-500 mb-2">Pair</div>
          <select className="w-full bg-zinc-800/50 border border-zinc-700 rounded-xl px-4 py-3 text-white font-medium outline-none" value={pIdx} onChange={e=>setPIdx(Number(e.target.value))}>
            {PAIRS.map((p,i) => <option key={i} value={i}>{TOKENS[p[0]].symbol}/{TOKENS[p[1]].symbol}</option>)}
          </select>
        </div>

        {reserves && <div className="text-xs text-zinc-500 mb-4">Reserves: {fmtUnits(reserves[0], tA.decimals)} {tA.symbol} / {fmtUnits(reserves[1], tB.decimals)} {tB.symbol}</div>}

        {mode === "add" ? (
          <>
            <input className="w-full h-12 bg-zinc-800/30 rounded-xl px-4 text-white font-semibold outline-none mb-2" placeholder={`${tA.symbol} amount`} value={aA} onChange={e=>sAA(e.target.value)} />
            <div className="flex justify-center py-1"><div className="w-7 h-7 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center text-xs text-white">+</div></div>
            <input className="w-full h-12 bg-zinc-800/30 rounded-xl px-4 text-white font-semibold outline-none mb-4" placeholder={`${tB.symbol} amount`} value={aB} onChange={e=>sAB(e.target.value)} />
            {txHash && <div className="text-xs font-mono text-zinc-500 mb-3">{txHash}</div>}
            <button onClick={()=>address&&add(aA,aB,tA.decimals,tB.decimals,address)} disabled={!aA||!aB||isPending} className="w-full h-12 rounded-xl bg-green-500 text-black font-semibold hover:bg-green-600 disabled:opacity-40">{isPending?"Adding...":"Add Liquidity"}</button>
          </>
        ) : (
          <div className="text-center py-8">
            {lpBal && (lpBal as bigint) > 0n ? <div><p className="text-zinc-400 text-sm mb-3">Your LP: {formatUnits(lpBal as bigint, 18)} ({share}% share)</p><button className="px-4 py-2 rounded-xl border border-green-500/30 text-green-400 text-sm">Remove (see contract)</button></div>
            : <p className="text-zinc-500 text-sm">No liquidity position</p>}
          </div>
        )}
      </div>
    </div>
  );
}
function C(){return <div className="flex items-center justify-center min-h-[60vh]"><h2 className="text-xl font-bold text-white">Connect Wallet</h2></div>;}
