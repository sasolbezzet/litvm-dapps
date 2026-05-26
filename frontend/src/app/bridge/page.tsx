"use client";
import { useState } from "react";
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { parseUnits, formatUnits } from "viem";
import { TOKEN_LIST, ERC20_ABI, BRIDGE_LITVM_ABI, BRIDGE_SEPOLIA_ABI, ADDRESSES } from "@/lib/constants";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Bridge() {
  const { address, isConnected } = useAccount();
  const [dir, setDir] = useState<"L2S" | "S2L">("L2S");
  const [token, setToken] = useState(TOKEN_LIST[0]);
  const [amount, setAmount] = useState("");
  const { writeContract, data: txHash, isPending } = useWriteContract();
  const { isLoading: waiting } = useWaitForTransactionReceipt({ hash: txHash });

  const { data: bal } = useReadContract({ address: token.address as `0x${string}`, abi: ERC20_ABI, functionName: "balanceOf", args: address ? [address] : undefined, query: { enabled: !!address } });
  const balanceInsufficient = amount && bal ? parseUnits(amount, token.decimals) > (bal as bigint) : false;

  if (!isConnected) return <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3"><h2 className="text-xl font-bold">Connect Wallet</h2></div>;

  const isLitVM = dir === "L2S";

  return (
    <div className="mt-10 max-w-[480px] mx-auto">
      <h1 className="text-2xl font-bold mb-6">Bridge</h1>
      <Card className="p-6">
        {/* Direction tabs */}
        <div className="flex bg-zinc-800/50 rounded-xl p-1 mb-6">
          <button onClick={() => setDir("L2S")} className={`flex-1 py-2.5 rounded-lg text-xs font-semibold transition-all ${isLitVM ? "bg-green-500 text-black" : "text-zinc-400"}`}>LitVM → Sepolia</button>
          <button onClick={() => setDir("S2L")} className={`flex-1 py-2.5 rounded-lg text-xs font-semibold transition-all ${!isLitVM ? "bg-green-500 text-black" : "text-zinc-400"}`}>Sepolia → LitVM</button>
        </div>

        {/* Network indicator */}
        <div className="flex items-center justify-center gap-3 mb-5">
          <span className="px-4 py-1.5 rounded-full text-xs font-medium bg-zinc-800 border border-zinc-700">{isLitVM ? "LitVM" : "Sepolia"}</span>
          <span className="text-green-400">→</span>
          <span className="px-4 py-1.5 rounded-full text-xs font-medium bg-zinc-800 border border-zinc-700">{isLitVM ? "Sepolia" : "LitVM"}</span>
        </div>

        {/* Token + Amount */}
        <div className="mb-3"><div className="text-xs text-zinc-500 mb-2">Token</div>
          <select className="w-full bg-zinc-800/50 border border-zinc-700 rounded-xl px-4 py-3 text-white font-medium outline-none" value={token.symbol} onChange={e => setToken(TOKEN_LIST.find(t => t.symbol === e.target.value) || TOKEN_LIST[0])}>
            {TOKEN_LIST.map(t => <option key={t.symbol}>{t.symbol}</option>)}
          </select>
          <div className="text-xs text-zinc-500 mt-1">Balance: {bal ? Number(formatUnits(bal as bigint, token.decimals)).toFixed(4) : "0"} {token.symbol}</div>
        </div>
        <div className="mb-3"><Input className="text-xl h-14" placeholder="0.0" value={amount} onChange={e => setAmount(e.target.value)} /></div>

        {/* Fees */}
        {amount && <div className="text-xs text-zinc-500 space-y-1 mb-4"><div className="flex justify-between"><span>Bridge Fee</span><span>0.1%</span></div><div className="flex justify-between"><span>Est. Time</span><span>~2-5 min</span></div></div>}

        {balanceInsufficient && <div className="text-xs text-red-400 mb-3">⚠ Insufficient balance</div>}
        {txHash && <div className="text-xs font-mono text-zinc-500 truncate mb-3">{txHash} {waiting && <span className="text-amber-400">(pending)</span>}</div>}

        <Button className="w-full" disabled={!amount || isPending || balanceInsufficient} onClick={() => {
          const amt = parseUnits(amount, token.decimals);
          if (isLitVM) writeContract({ address: ADDRESSES.litvm.bridgeLitVM as `0x${string}`, abi: BRIDGE_LITVM_ABI, functionName: "lock", args: [token.address, amt, address] });
          else writeContract({ address: ADDRESSES.sepolia.bridgeSepolia as `0x${string}`, abi: BRIDGE_SEPOLIA_ABI, functionName: "burn", args: [token.address, amt, address] });
        }}>{isPending || waiting ? "Bridging..." : `Bridge to ${isLitVM ? "Sepolia" : "LitVM"}`}</Button>
      </Card>
    </div>
  );
}
