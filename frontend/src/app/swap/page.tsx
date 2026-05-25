"use client";

import { useState } from "react";
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { parseUnits, formatUnits } from "viem";
import { TOKEN_LIST, ERC20_ABI, ROUTER_ABI, ADDRESSES } from "@/lib/constants";

export default function Swap() {
  const { address } = useAccount();
  const [fromToken, setFromToken] = useState(TOKEN_LIST[0]);
  const [toToken, setToToken] = useState(TOKEN_LIST[1]);
  const [amount, setAmount] = useState("");
  const [slippage, setSlippage] = useState("0.5");

  const parsedAmount = amount ? parseUnits(amount, fromToken.decimals) : 0n;

  const { data: amountOut } = useReadContract({
    address: ADDRESSES.litvm.router as `0x${string}`,
    abi: ROUTER_ABI,
    functionName: "getAmountsOut" as never,
    args: parsedAmount > 0n ? [parsedAmount, [fromToken.address, toToken.address]] : undefined,
  });

  const { writeContract, data: txHash, isPending } = useWriteContract();
  const { isLoading: waiting } = useWaitForTransactionReceipt({ hash: txHash });

  const handleSwap = () => {
    if (!amount || !address) return;
    const minOut = amountOut ? (amountOut as bigint[])[1] * BigInt(Math.floor((1 - Number(slippage) / 100) * 1000)) / 1000n : 0n;
    writeContract({
      address: ADDRESSES.litvm.router as `0x${string}`,
      abi: ROUTER_ABI,
      functionName: "swapExactTokensForTokens",
      args: [parsedAmount, minOut, [fromToken.address, toToken.address], address, BigInt(Math.floor(Date.now() / 1000) + 1200)],
    });
  };

  const needsApproval = amount && address;
  const { data: allowance } = useReadContract({
    address: fromToken.address as `0x${string}`,
    abi: ERC20_ABI,
    functionName: "allowance",
    args: address && needsApproval ? [address, ADDRESSES.litvm.router] : undefined,
  });

  const needApprove = allowance !== undefined && (allowance as bigint) < parsedAmount;

  const { writeContract: approve, isPending: approving } = useWriteContract();

  if (!address) return <p className="text-gray-400 mt-8 text-center">Connect wallet</p>;

  return (
    <div className="mt-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6">Swap</h1>
      <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 space-y-4">
        <div>
          <label className="text-sm text-gray-400">From</label>
          <select className="w-full bg-gray-800 rounded p-2 mt-1" value={fromToken.symbol} onChange={(e) => setFromToken(TOKEN_LIST.find(t => t.symbol === e.target.value) || TOKEN_LIST[0])}>
            {TOKEN_LIST.map(t => <option key={t.symbol}>{t.symbol}</option>)}
          </select>
          <input className="w-full bg-gray-800 rounded p-2 mt-2" placeholder="0.0" value={amount} onChange={(e) => setAmount(e.target.value)} />
        </div>
        <div>
          <label className="text-sm text-gray-400">To</label>
          <select className="w-full bg-gray-800 rounded p-2 mt-1" value={toToken.symbol} onChange={(e) => setToToken(TOKEN_LIST.find(t => t.symbol === e.target.value) || TOKEN_LIST[1])}>
            {TOKEN_LIST.map(t => <option key={t.symbol}>{t.symbol}</option>)}
          </select>
          <div className="w-full bg-gray-800 rounded p-2 mt-2 text-gray-400">
            {amountOut ? formatUnits((amountOut as bigint[])[1], toToken.decimals) : "0.0"}
          </div>
        </div>
        <div>
          <label className="text-sm text-gray-400">Slippage %</label>
          <input className="w-full bg-gray-800 rounded p-2 mt-1" value={slippage} onChange={(e) => setSlippage(e.target.value)} />
        </div>
        <div className="text-xs text-gray-500 break-all">
          {txHash && <span>TX: {txHash} {waiting && "(pending...)"}</span>}
        </div>
        {needApprove ? (
          <button
            className="w-full bg-blue-600 hover:bg-blue-700 rounded-lg py-3 font-semibold disabled:opacity-50"
            disabled={approving}
            onClick={() => approve({ address: fromToken.address as `0x${string}`, abi: ERC20_ABI, functionName: "approve", args: [ADDRESSES.litvm.router, parsedAmount] })}
          >
            {approving ? "Approving..." : "Approve"}
          </button>
        ) : (
          <button
            className="w-full bg-blue-600 hover:bg-blue-700 rounded-lg py-3 font-semibold disabled:opacity-50"
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
