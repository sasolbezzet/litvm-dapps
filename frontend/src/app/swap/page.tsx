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
  const [slippage, setSlippage] = useState("0.5");

  const fromToken = TOKEN_LIST[fromIdx];
  const toToken = TOKEN_LIST[toIdx];
  const parsedAmount = amount ? parseUnits(amount, fromToken.decimals) : 0n;

  const { data: amountOut } = useReadContract({
    address: ADDRESSES.litvm.router as `0x${string}`,
    abi: ROUTER_ABI,
    functionName: "getAmountsOut" as never,
    args: parsedAmount > 0n ? [parsedAmount, [fromToken.address, toToken.address]] : undefined,
  });

  const { writeContract, data: txHash, isPending } = useWriteContract();
  const { isLoading: waiting } = useWaitForTransactionReceipt({ hash: txHash });

  const { data: allowance } = useReadContract({
    address: fromToken.address as `0x${string}`,
    abi: ERC20_ABI,
    functionName: "allowance",
    args: address ? [address, ADDRESSES.litvm.router] : undefined,
  });
  const needApprove = allowance !== undefined && parsedAmount > 0n && (allowance as bigint) < parsedAmount;

  const { writeContract: approve, isPending: approving } = useWriteContract();

  if (!address)
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <h2 className="text-2xl font-semibold">Connect your wallet</h2>
        <p className="text-sm" style={{ color: "var(--cb-text-secondary)" }}>Connect to start swapping tokens</p>
      </div>
    );

  const handleSwap = () => {
    if (!amount) return;
    const out = amountOut ? (amountOut as bigint[])[1] : 0n;
    const minOut = out * BigInt(Math.floor((1 - Number(slippage) / 100) * 1000)) / 1000n;
    writeContract({
      address: ADDRESSES.litvm.router as `0x${string}`,
      abi: ROUTER_ABI,
      functionName: "swapExactTokensForTokens",
      args: [parsedAmount, minOut, [fromToken.address, toToken.address], address, BigInt(Math.floor(Date.now() / 1000) + 1200)],
    });
  };

  return (
    <div className="mt-10 max-w-[440px] mx-auto">
      <h1 className="text-2xl font-bold mb-6">Swap</h1>
      <div className="card-defi">
        {/* From */}
        <div className="mb-1">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium" style={{ color: "var(--cb-text-secondary)" }}>You pay</span>
          </div>
          <div className="flex gap-3">
            <input
              className="input-defi flex-1"
              style={{ fontSize: 24, fontWeight: 500, height: 64 }}
              placeholder="0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <select
              className="select-defi"
              style={{ width: 140, height: 64, fontSize: 16 }}
              value={fromIdx}
              onChange={(e) => setFromIdx(Number(e.target.value))}
            >
              {TOKEN_LIST.map((t, i) => (
                <option key={t.symbol} value={i}>{t.symbol}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Arrow */}
        <div className="flex justify-center -my-2 relative z-10">
          <button
            className="w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold transition-transform hover:scale-110"
            style={{ background: "var(--cb-surface)", border: "1px solid var(--cb-border)" }}
            onClick={() => { setFromIdx(toIdx); setToIdx(fromIdx); }}
          >
            ↓
          </button>
        </div>

        {/* To */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium" style={{ color: "var(--cb-text-secondary)" }}>You receive</span>
          </div>
          <div className="flex gap-3">
            <div className="input-defi flex-1 flex items-center" style={{ fontSize: 24, fontWeight: 500, height: 64 }}>
              {amountOut ? Number(formatUnits((amountOut as bigint[])[1], toToken.decimals)).toFixed(6) : "0"}
            </div>
            <select
              className="select-defi"
              style={{ width: 140, height: 64, fontSize: 16 }}
              value={toIdx}
              onChange={(e) => setToIdx(Number(e.target.value))}
            >
              {TOKEN_LIST.map((t, i) => (
                <option key={t.symbol} value={i}>{t.symbol}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Slippage */}
        <div className="flex items-center justify-between mt-4 px-1">
          <span className="text-xs" style={{ color: "var(--cb-text-secondary)" }}>Slippage tolerance</span>
          <div className="flex gap-1">
            {["0.1", "0.5", "1.0"].map((s) => (
              <button
                key={s}
                className="px-2.5 py-1 rounded-full text-xs font-semibold transition-all"
                style={{
                  background: slippage === s ? "var(--cb-blue)" : "var(--cb-surface)",
                  color: slippage === s ? "white" : "var(--cb-text-secondary)",
                }}
                onClick={() => setSlippage(s)}
              >
                {s}%
              </button>
            ))}
          </div>
        </div>

        {/* TX hash */}
        {txHash && (
          <div className="mt-3 px-1 text-xs truncate" style={{ color: "var(--cb-text-secondary)" }}>
            TX: {txHash} {waiting && "(pending...)"}
          </div>
        )}

        {/* Button */}
        {needApprove ? (
          <button
            className="btn-pill btn-primary w-full mt-5 h-[54px]"
            disabled={approving}
            onClick={() =>
              approve({ address: fromToken.address as `0x${string}`, abi: ERC20_ABI, functionName: "approve", args: [ADDRESSES.litvm.router, parsedAmount] })
            }
          >
            {approving ? "Approving..." : `Approve ${fromToken.symbol}`}
          </button>
        ) : (
          <button
            className="btn-pill btn-primary w-full mt-5 h-[54px]"
            disabled={!amount || isPending || waiting}
            onClick={handleSwap}
          >
            {isPending || waiting ? "Swapping..." : "Swap"}
          </button>
        )}
      </div>
    </div>
  );
}
