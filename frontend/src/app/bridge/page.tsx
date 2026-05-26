"use client";

import { useState } from "react";
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { parseUnits } from "viem";
import { TOKEN_LIST, BRIDGE_LITVM_ABI, BRIDGE_SEPOLIA_ABI, ADDRESSES } from "@/lib/constants";

export default function Bridge() {
  const { address } = useAccount();
  const [dir, setDir] = useState<"litvm-to-sepolia" | "sepolia-to-litvm">("litvm-to-sepolia");
  const [tok, setTok] = useState(0);
  const [amt, setAmt] = useState("");

  const { writeContract, data: txHash, isPending } = useWriteContract();
  const { isLoading: waiting } = useWaitForTransactionReceipt({ hash: txHash });

  if (!address)
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3 animate-fade-in">
        <h2 className="text-2xl font-bold" style={{ fontFamily: "var(--font-brand)" }}>Connect Wallet</h2>
      </div>
    );

  const token = TOKEN_LIST[tok];

  return (
    <div className="mt-10 max-w-[460px] mx-auto animate-fade-in">
      <h1 className="text-2xl font-bold mb-6" style={{ fontFamily: "var(--font-brand)" }}>Bridge</h1>
      <div className="glass-card p-6">
        <div className="segment mb-6">
          {["litvm-to-sepolia", "sepolia-to-litvm"].map((d) => (
            <button key={d} className={`segment-btn${dir === d ? " active" : ""}`} onClick={() => setDir(d as typeof dir)}>
              {d === "litvm-to-sepolia" ? "LitVM → Sepolia" : "Sepolia → LitVM"}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-center gap-3 mb-6">
          <span className="token-pill">{dir === "litvm-to-sepolia" ? "LitVM" : "Sepolia"}</span>
          <span style={{ color: "var(--accent-green)", fontSize: 18 }}>→</span>
          <span className="token-pill">{dir === "litvm-to-sepolia" ? "Sepolia" : "LitVM"}</span>
        </div>

        <div className="mb-4">
          <span className="text-xs font-semibold uppercase tracking-wider mb-1.5 block" style={{ color: "var(--text-tertiary)" }}>Token</span>
          <select className="select" style={{ height: 56 }} value={tok} onChange={(e) => setTok(Number(e.target.value))}>
            {TOKEN_LIST.map((t, i) => <option key={t.symbol} value={i}>{t.symbol}</option>)}
          </select>
        </div>
        <div className="mb-4">
          <span className="text-xs font-semibold uppercase tracking-wider mb-1.5 block" style={{ color: "var(--text-tertiary)" }}>Amount</span>
          <input className="input" style={{ height: 56, fontSize: 22 }} placeholder="0.0" value={amt} onChange={(e) => setAmt(e.target.value)} />
        </div>

        {txHash && (
          <div className="mb-3 text-xs font-mono truncate" style={{ color: "var(--text-tertiary)" }}>
            {txHash} {waiting && <span style={{ color: "var(--accent-amber)" }}>(pending)</span>}
          </div>
        )}

        <button className="btn btn-primary btn-lg w-full" disabled={!amt || isPending || waiting}
          onClick={() => {
            const a = parseUnits(amt, token.decimals);
            if (dir === "litvm-to-sepolia") {
              writeContract({ address: ADDRESSES.litvm.bridgeLitVM as `0x${string}`, abi: BRIDGE_LITVM_ABI, functionName: "lock", args: [token.address, a, address] });
            } else {
              writeContract({ address: ADDRESSES.sepolia.bridgeSepolia as `0x${string}`, abi: BRIDGE_SEPOLIA_ABI, functionName: "burn", args: [token.address, a, address] });
            }
          }}>
          {isPending || waiting ? "Bridging..." : `Bridge to ${dir === "litvm-to-sepolia" ? "Sepolia" : "LitVM"}`}
        </button>
      </div>
    </div>
  );
}
