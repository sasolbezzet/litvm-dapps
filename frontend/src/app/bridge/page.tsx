"use client";

import { useState } from "react";
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { parseUnits } from "viem";
import { TOKEN_LIST, BRIDGE_LITVM_ABI, BRIDGE_SEPOLIA_ABI, ADDRESSES } from "@/lib/constants";

export default function Bridge() {
  const { address } = useAccount();
  const [direction, setDirection] = useState<"litvm-to-sepolia" | "sepolia-to-litvm">("litvm-to-sepolia");
  const [token, setToken] = useState(TOKEN_LIST[0]);
  const [amount, setAmount] = useState("");

  const { writeContract, data: txHash, isPending } = useWriteContract();
  const { isLoading: waiting } = useWaitForTransactionReceipt({ hash: txHash });

  const handleBridge = () => {
    if (!amount || !address) return;
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

  if (!address) return <p className="text-gray-400 mt-8 text-center">Connect wallet</p>;

  return (
    <div className="mt-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6">Bridge</h1>
      <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 space-y-4">
        <div className="flex gap-2 mb-4">
          <button className={`px-4 py-2 rounded text-sm ${direction === "litvm-to-sepolia" ? "bg-blue-600" : "bg-gray-800"}`}
            onClick={() => setDirection("litvm-to-sepolia")}>
            LitVM → Sepolia
          </button>
          <button className={`px-4 py-2 rounded text-sm ${direction === "sepolia-to-litvm" ? "bg-blue-600" : "bg-gray-800"}`}
            onClick={() => setDirection("sepolia-to-litvm")}>
            Sepolia → LitVM
          </button>
        </div>
        <div>
          <label className="text-sm text-gray-400">Token</label>
          <select className="w-full bg-gray-800 rounded p-2 mt-1" value={token.symbol} onChange={(e) => setToken(TOKEN_LIST.find(t => t.symbol === e.target.value) || TOKEN_LIST[0])}>
            {TOKEN_LIST.map(t => <option key={t.symbol}>{t.symbol}</option>)}
          </select>
        </div>
        <div>
          <label className="text-sm text-gray-400">Amount</label>
          <input className="w-full bg-gray-800 rounded p-2 mt-1" placeholder="0.0" value={amount} onChange={(e) => setAmount(e.target.value)} />
        </div>
        <div className="text-xs text-gray-500 break-all">
          {txHash && <span>TX: {txHash} {waiting && "(pending...)"}</span>}
        </div>
        <button className="w-full bg-blue-600 hover:bg-blue-700 rounded-lg py-3 font-semibold disabled:opacity-50"
          disabled={!amount || isPending || waiting} onClick={handleBridge}>
          {isPending || waiting ? "Bridging..." : `Bridge ${direction === "litvm-to-sepolia" ? "LitVM → Sepolia" : "Sepolia → LitVM"}`}
        </button>
      </div>
    </div>
  );
}
