"use client";

import { useState } from "react";
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { parseUnits, formatUnits } from "viem";
import { TOKEN_LIST, ERC20_ABI, ROUTER_ABI, ADDRESSES } from "@/lib/constants";

export default function Swap() {
  const { address } = useAccount();
  const [fromIdx, setFromIdx] = useState(0);
  const [toIdx, setToIdx] = useState(1);
  const [amount, setAmount] = useState("");

  const fromT = TOKEN_LIST[fromIdx];
  const toT = TOKEN_LIST[toIdx];
  const parsed = amount ? parseUnits(amount, fromT.decimals) : 0n;

  const { data: outRaw } = useReadContract({
    address: ADDRESSES.litvm.router as `0x${string}`, abi: ROUTER_ABI,
    functionName: "getAmountsOut" as never,
    args: parsed > 0n ? [parsed, [fromT.address, toT.address]] : undefined,
  });

  const { writeContract, data: txHash, isPending } = useWriteContract();
  const { isLoading: waiting } = useWaitForTransactionReceipt({ hash: txHash });

  const { data: allowance } = useReadContract({
    address: fromT.address as `0x${string}`, abi: ERC20_ABI, functionName: "allowance",
    args: address ? [address, ADDRESSES.litvm.router] : undefined,
  });
  const needApprove = allowance !== undefined && parsed > 0n && (allowance as bigint) < parsed;
  const { writeContract: approve, isPending: approving } = useWriteContract();

  if (!address)
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 animate-fade-in">
        <h2 className="text-2xl font-bold" style={{ fontFamily: "var(--font-brand)" }}>Connect Wallet</h2>
        <p style={{ color: "var(--text-secondary)" }}>Connect to start swapping</p>
      </div>
    );

  return (
    <div className="mt-10 max-w-[460px] mx-auto animate-fade-in">
      <h1 className="text-2xl font-bold mb-6" style={{ fontFamily: "var(--font-brand)" }}>Swap</h1>

      <div className="glass-card p-6">
        {/* From */}
        <div className="mb-1">
          <div className="flex justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-tertiary)" }}>You pay</span>
          </div>
          <div className="flex gap-3">
            <input className="input flex-1" style={{ fontSize: 26, fontWeight: 600, height: 68 }} placeholder="0"
              value={amount} onChange={(e) => setAmount(e.target.value)} />
            <select className="select" style={{ width: 140, height: 68, fontSize: 16 }} value={fromIdx}
              onChange={(e) => setFromIdx(Number(e.target.value))}>
              {TOKEN_LIST.map((t, i) => <option key={t.symbol} value={i}>{t.symbol}</option>)}
            </select>
          </div>
        </div>

        {/* Arrow */}
        <div className="flex justify-center -my-2 relative z-10">
          <button className="w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold transition-transform hover:scale-110"
            style={{ background: "var(--bg-surface)", border: "1px solid var(--border-default)" }}
            onClick={() => { setFromIdx(toIdx); setToIdx(fromIdx); }}>↓</button>
        </div>

        {/* To */}
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-tertiary)" }}>You receive</span>
          </div>
          <div className="flex gap-3">
            <div className="input flex-1 flex items-center" style={{ fontSize: 26, fontWeight: 600, height: 68 }}>
              {outRaw ? Number(formatUnits((outRaw as bigint[])[1], toT.decimals)).toFixed(6) : "0"}
            </div>
            <select className="select" style={{ width: 140, height: 68, fontSize: 16 }} value={toIdx}
              onChange={(e) => setToIdx(Number(e.target.value))}>
              {TOKEN_LIST.map((t, i) => <option key={t.symbol} value={i}>{t.symbol}</option>)}
            </select>
          </div>
        </div>

        {/* TX */}
        {txHash && (
          <div className="mt-4 px-1 text-xs truncate font-mono" style={{ color: "var(--text-tertiary)" }}>
            {txHash} {waiting && <span style={{ color: "var(--accent-amber)" }}>(pending)</span>}
          </div>
        )}

        {/* Button */}
        {needApprove ? (
          <button className="btn btn-primary btn-lg w-full mt-5" disabled={approving}
            onClick={() => approve({ address: fromT.address as `0x${string}`, abi: ERC20_ABI, functionName: "approve", args: [ADDRESSES.litvm.router, parsed] })}>
            {approving ? "Approving..." : `Approve ${fromT.symbol}`}
          </button>
        ) : (
          <button className="btn btn-primary btn-lg w-full mt-5" disabled={!amount || isPending || waiting}
            onClick={() => {
              const out = outRaw ? (outRaw as bigint[])[1] : 0n;
              const min = out * 995n / 1000n;
              writeContract({ address: ADDRESSES.litvm.router as `0x${string}`, abi: ROUTER_ABI, functionName: "swapExactTokensForTokens",
                args: [parsed, min, [fromT.address, toT.address], address, BigInt(Math.floor(Date.now() / 1000) + 1200)] });
            }}>
            {isPending || waiting ? "Swapping..." : "Swap"}
          </button>
        )}
      </div>
    </div>
  );
}
