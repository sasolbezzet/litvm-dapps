"use client";

import { useState } from "react";
import { useAccount, useWriteContract, useWaitForTransactionReceipt, useReadContract } from "wagmi";
import { parseUnits } from "viem";
import { TOKEN_LIST, ERC20_ABI, ROUTER_ABI, ADDRESSES } from "@/lib/constants";

export default function Liquidity() {
  const { address } = useAccount();
  const [tokenA, setTokenA] = useState(TOKEN_LIST[0]);
  const [tokenB, setTokenB] = useState(TOKEN_LIST[1]);
  const [amountA, setAmountA] = useState("");
  const [amountB, setAmountB] = useState("");
  const [mode, setMode] = useState<"add" | "remove">("add");

  const { writeContract, data: txHash, isPending } = useWriteContract();
  const { isLoading: waiting } = useWaitForTransactionReceipt({ hash: txHash });

  const handleAdd = async () => {
    if (!amountA || !amountB || !address) return;
    const amtA = parseUnits(amountA, tokenA.decimals);
    const amtB = parseUnits(amountB, tokenB.decimals);
    const deadline = BigInt(Math.floor(Date.now() / 1000) + 1200);
    writeContract({
      address: ADDRESSES.litvm.router as `0x${string}`,
      abi: ROUTER_ABI,
      functionName: "addLiquidity",
      args: [tokenA.address, tokenB.address, amtA, amtB, 0n, 0n, address, deadline],
    });
  };

  if (!address) return <p className="text-gray-400 mt-8 text-center">Connect wallet</p>;

  return (
    <div className="mt-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6">Liquidity</h1>
      <div className="flex gap-2 mb-4">
        <button className={`px-4 py-2 rounded ${mode === "add" ? "bg-blue-600" : "bg-gray-800"}`} onClick={() => setMode("add")}>Add</button>
        <button className={`px-4 py-2 rounded ${mode === "remove" ? "bg-blue-600" : "bg-gray-800"}`} onClick={() => setMode("remove")}>Remove</button>
      </div>
      <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 space-y-4">
        {mode === "add" ? (
          <>
            <TokenSelect token={tokenA} setToken={setTokenA} amount={amountA} setAmount={setAmountA} />
            <TokenSelect token={tokenB} setToken={setTokenB} amount={amountB} setAmount={setAmountB} />
            <div className="text-xs text-gray-500 break-all">
              {txHash && <span>TX: {txHash} {waiting && "(pending...)"}</span>}
            </div>
            <button className="w-full bg-blue-600 hover:bg-blue-700 rounded-lg py-3 font-semibold disabled:opacity-50"
              disabled={!amountA || !amountB || isPending || waiting} onClick={handleAdd}>
              {isPending || waiting ? "Adding..." : "Add Liquidity"}
            </button>
          </>
        ) : (
          <RemoveLiquidity />
        )}
      </div>
    </div>
  );
}

function TokenSelect({ token, setToken, amount, setAmount }: { token: typeof TOKEN_LIST[0]; setToken: (t: typeof TOKEN_LIST[0]) => void; amount: string; setAmount: (v: string) => void }) {
  return (
    <div>
      <select className="w-full bg-gray-800 rounded p-2" value={token.symbol} onChange={(e) => setToken(TOKEN_LIST.find(t => t.symbol === e.target.value) || TOKEN_LIST[0])}>
        {TOKEN_LIST.map(t => <option key={t.symbol}>{t.symbol}</option>)}
      </select>
      <input className="w-full bg-gray-800 rounded p-2 mt-2" placeholder="0.0" value={amount} onChange={(e) => setAmount(e.target.value)} />
    </div>
  );
}

function RemoveLiquidity() {
  const { address } = useAccount();
  const [lpAmount, setLpAmount] = useState("");
  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-400">Enter LP token amount to remove</p>
      <input className="w-full bg-gray-800 rounded p-2" placeholder="LP amount" value={lpAmount} onChange={(e) => setLpAmount(e.target.value)} />
      <button className="w-full bg-blue-600 hover:bg-blue-700 rounded-lg py-3 font-semibold disabled:opacity-50" disabled={!lpAmount}>
        Remove Liquidity
      </button>
    </div>
  );
}
