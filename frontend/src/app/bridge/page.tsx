"use client";

import { useState } from "react";
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { parseUnits } from "viem";
import { TOKEN_LIST, BRIDGE_LITVM_ABI, BRIDGE_SEPOLIA_ABI, ADDRESSES } from "@/lib/constants";

export default function Bridge() {
  const { address } = useAccount();
  const [direction, setDirection] = useState<"litvm-to-sepolia" | "sepolia-to-litvm">("litvm-to-sepolia");
  const [tokenIdx, setTokenIdx] = useState(0);
  const [amount, setAmount] = useState("");

  const { writeContract, data: txHash, isPending } = useWriteContract();
  const { isLoading: waiting } = useWaitForTransactionReceipt({ hash: txHash });

  if (!address)
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <h2 className="text-2xl font-semibold">Connect your wallet</h2>
      </div>
    );

  const token = TOKEN_LIST[tokenIdx];

  const handleBridge = () => {
    if (!amount) return;
    const amt = parseUnits(amount, token.decimals);
    if (direction === "litvm-to-sepolia") {
      writeContract({
        address: ADDRESSES.litvm.bridgeLitVM as `0x${string}`,
        abi: BRIDGE_LITVM_ABI,
        functionName: "lock",
        args: [token.address, amt, address],
      });
    } else {
      writeContract({
        address: ADDRESSES.sepolia.bridgeSepolia as `0x${string}`,
        abi: BRIDGE_SEPOLIA_ABI,
        functionName: "burn",
        args: [token.address, amt, address],
      });
    }
  };

  return (
    <div className="mt-10 max-w-[440px] mx-auto">
      <h1 className="text-2xl font-bold mb-6">Bridge</h1>
      <div className="card-defi">
        {/* Direction */}
        <div className="flex bg-[var(--cb-surface)] rounded-full p-1 mb-6">
          <button
            className="flex-1 py-2.5 rounded-full text-xs font-semibold transition-all"
            style={{ background: direction === "litvm-to-sepolia" ? "var(--cb-blue)" : "transparent", color: direction === "litvm-to-sepolia" ? "white" : "var(--cb-text-secondary)" }}
            onClick={() => setDirection("litvm-to-sepolia")}
          >
            LitVM → Sepolia
          </button>
          <button
            className="flex-1 py-2.5 rounded-full text-xs font-semibold transition-all"
            style={{ background: direction === "sepolia-to-litvm" ? "var(--cb-blue)" : "transparent", color: direction === "sepolia-to-litvm" ? "white" : "var(--cb-text-secondary)" }}
            onClick={() => setDirection("sepolia-to-litvm")}
          >
            Sepolia → LitVM
          </button>
        </div>

        {/* From/To indicator */}
        <div className="flex items-center justify-center gap-3 mb-5 text-sm font-medium">
          <span className="token-pill">{direction === "litvm-to-sepolia" ? "LitVM" : "Sepolia"}</span>
          <span style={{ color: "var(--cb-text-secondary)" }}>→</span>
          <span className="token-pill">{direction === "litvm-to-sepolia" ? "Sepolia" : "LitVM"}</span>
        </div>

        <div className="mb-4">
          <span className="text-xs font-medium" style={{ color: "var(--cb-text-secondary)" }}>Token</span>
          <select className="select-defi mt-1.5" style={{ height: 56 }} value={tokenIdx} onChange={(e) => setTokenIdx(Number(e.target.value))}>
            {TOKEN_LIST.map((t, i) => <option key={t.symbol} value={i}>{t.symbol}</option>)}
          </select>
        </div>

        <div className="mb-4">
          <span className="text-xs font-medium" style={{ color: "var(--cb-text-secondary)" }}>Amount</span>
          <input className="input-defi mt-1.5" style={{ fontSize: 22, height: 56 }} placeholder="0.0" value={amount} onChange={(e) => setAmount(e.target.value)} />
        </div>

        {txHash && <div className="text-xs truncate mb-3" style={{ color: "var(--cb-text-secondary)" }}>TX: {txHash} {waiting && "(pending...)"}</div>}

        <button className="btn-pill btn-primary w-full h-[54px]" disabled={!amount || isPending || waiting} onClick={handleBridge}>
          {isPending || waiting ? "Bridging..." : `Bridge to ${direction === "litvm-to-sepolia" ? "Sepolia" : "LitVM"}`}
        </button>
      </div>
    </div>
  );
}
