"use client";

import { useState } from "react";
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { parseUnits } from "viem";
import { TOKEN_LIST, ROUTER_ABI, ADDRESSES } from "@/lib/constants";

export default function Liquidity() {
  const { address } = useAccount();
  const [tokenAIdx, setTokenAIdx] = useState(0);
  const [tokenBIdx, setTokenBIdx] = useState(1);
  const [amountA, setAmountA] = useState("");
  const [amountB, setAmountB] = useState("");
  const [mode, setMode] = useState<"add" | "remove">("add");

  const { writeContract, data: txHash, isPending } = useWriteContract();
  const { isLoading: waiting } = useWaitForTransactionReceipt({ hash: txHash });

  if (!address)
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <h2 className="text-2xl font-semibold">Connect your wallet</h2>
        <p className="text-sm" style={{ color: "var(--cb-text-secondary)" }}>Connect to provide liquidity</p>
      </div>
    );

  const tokenA = TOKEN_LIST[tokenAIdx];
  const tokenB = TOKEN_LIST[tokenBIdx];

  return (
    <div className="mt-10 max-w-[440px] mx-auto">
      <h1 className="text-2xl font-bold mb-6">Liquidity</h1>
      <div className="card-defi">
        {/* Tabs */}
        <div className="flex bg-[var(--cb-surface)] rounded-full p-1 mb-6">
          <button
            className="flex-1 py-2.5 rounded-full text-sm font-semibold transition-all"
            style={{ background: mode === "add" ? "var(--cb-blue)" : "transparent", color: mode === "add" ? "white" : "var(--cb-text-secondary)" }}
            onClick={() => setMode("add")}
          >
            Add
          </button>
          <button
            className="flex-1 py-2.5 rounded-full text-sm font-semibold transition-all"
            style={{ background: mode === "remove" ? "var(--cb-blue)" : "transparent", color: mode === "remove" ? "white" : "var(--cb-text-secondary)" }}
            onClick={() => setMode("remove")}
          >
            Remove
          </button>
        </div>

        {mode === "add" ? (
          <>
            <div className="mb-4">
              <span className="text-xs font-medium" style={{ color: "var(--cb-text-secondary)" }}>Token A</span>
              <div className="flex gap-3 mt-1.5">
                <input className="input-defi" placeholder="0" value={amountA} onChange={(e) => setAmountA(e.target.value)} />
                <select className="select-defi" style={{ width: 140 }} value={tokenAIdx} onChange={(e) => setTokenAIdx(Number(e.target.value))}>
                  {TOKEN_LIST.map((t, i) => <option key={t.symbol} value={i}>{t.symbol}</option>)}
                </select>
              </div>
            </div>
            <div className="flex justify-center -my-2 relative z-10">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm" style={{ background: "var(--cb-surface)", border: "1px solid var(--cb-border)" }}>+</div>
            </div>
            <div className="mb-4">
              <span className="text-xs font-medium" style={{ color: "var(--cb-text-secondary)" }}>Token B</span>
              <div className="flex gap-3 mt-1.5">
                <input className="input-defi" placeholder="0" value={amountB} onChange={(e) => setAmountB(e.target.value)} />
                <select className="select-defi" style={{ width: 140 }} value={tokenBIdx} onChange={(e) => setTokenBIdx(Number(e.target.value))}>
                  {TOKEN_LIST.map((t, i) => <option key={t.symbol} value={i}>{t.symbol}</option>)}
                </select>
              </div>
            </div>
            {txHash && <div className="text-xs truncate mb-3" style={{ color: "var(--cb-text-secondary)" }}>TX: {txHash} {waiting && "(pending...)"}</div>}
            <button
              className="btn-pill btn-primary w-full h-[54px]"
              disabled={!amountA || !amountB || isPending || waiting}
              onClick={() => {
                writeContract({
                  address: ADDRESSES.litvm.router as `0x${string}`,
                  abi: ROUTER_ABI,
                  functionName: "addLiquidity",
                  args: [tokenA.address, tokenB.address, parseUnits(amountA, tokenA.decimals), parseUnits(amountB, tokenB.decimals), 0n, 0n, address, BigInt(Math.floor(Date.now() / 1000) + 1200)],
                });
              }}
            >
              {isPending || waiting ? "Adding Liquidity..." : "Add Liquidity"}
            </button>
          </>
        ) : (
          <div className="text-center py-12" style={{ color: "var(--cb-text-secondary)" }}>
            <div className="text-3xl mb-3">🛠</div>
            <p className="text-sm">Remove liquidity via contract interaction</p>
          </div>
        )}
      </div>
    </div>
  );
}
