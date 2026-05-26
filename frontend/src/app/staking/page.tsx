"use client";
import { useState } from "react";
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { parseUnits, formatUnits } from "viem";
import { STAKING_ABI, ADDRESSES } from "@/lib/constants";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Staking() {
  const { address, isConnected } = useAccount();
  const [stakeV, setStakeV] = useState("");
  const [withdrawV, setWithdrawV] = useState("");
  const { data: earned } = useReadContract({ address: ADDRESSES.litvm.staking as `0x${string}`, abi: STAKING_ABI, functionName: "earned", args: address ? [address] : undefined, query: { enabled: !!address } });
  const { data: staked } = useReadContract({ address: ADDRESSES.litvm.staking as `0x${string}`, abi: STAKING_ABI, functionName: "stakes", args: address ? [address] : undefined, query: { enabled: !!address } });
  const { writeContract, data: txHash, isPending } = useWriteContract();
  const { isLoading: waiting } = useWaitForTransactionReceipt({ hash: txHash });

  if (!isConnected) return <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3"><h2 className="text-xl font-bold">Connect Wallet</h2></div>;

  const e = earned ? formatUnits(earned as bigint, 6) : "0";
  const s = staked ? formatUnits(staked as bigint, 18) : "0";

  return (
    <div className="mt-10 max-w-[520px] mx-auto">
      <h1 className="text-2xl font-bold mb-6">Staking</h1>
      <Card className="p-6">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-zinc-800/50 rounded-xl p-4 text-center">
            <div className="text-xs text-zinc-500 mb-1">APY</div><div className="text-xl font-bold text-green-400">~12%</div>
          </div>
          <div className="bg-zinc-800/50 rounded-xl p-4 text-center">
            <div className="text-xs text-zinc-500 mb-1">Staked</div><div className="text-xl font-bold">{Number(s).toFixed(2)}</div>
          </div>
          <div className="bg-zinc-800/50 rounded-xl p-4 text-center">
            <div className="text-xs text-zinc-500 mb-1">Earned</div><div className="text-xl font-bold text-green-400">{Number(e).toFixed(2)}</div>
          </div>
        </div>

        {/* Claim */}
        <Button variant="outline" className="w-full mb-6 border-green-500/30 text-green-400 hover:bg-green-500/10" disabled={!earned || (earned as bigint) === 0n || isPending}
          onClick={() => writeContract({ address: ADDRESSES.litvm.staking as `0x${string}`, abi: STAKING_ABI, functionName: "claimReward" })}>
          {isPending ? "Claiming..." : "Claim Rewards"}
        </Button>

        {/* Stake */}
        <div className="mb-4"><div className="text-xs text-zinc-500 mb-2">Stake LP Tokens</div></div>
        <div className="flex gap-3 mb-4">
          <Input placeholder="LP amount" value={stakeV} onChange={e => setStakeV(e.target.value)} />
          <Button disabled={!stakeV || isPending} onClick={() => writeContract({ address: ADDRESSES.litvm.staking as `0x${string}`, abi: STAKING_ABI, functionName: "stake", args: [parseUnits(stakeV, 18)] })}>Stake</Button>
        </div>

        {/* Withdraw */}
        <div className="mb-4"><div className="text-xs text-zinc-500 mb-2">Withdraw LP Tokens</div></div>
        <div className="flex gap-3">
          <Input placeholder="LP amount" value={withdrawV} onChange={e => setWithdrawV(e.target.value)} />
          <Button variant="secondary" disabled={!withdrawV || isPending} onClick={() => writeContract({ address: ADDRESSES.litvm.staking as `0x${string}`, abi: STAKING_ABI, functionName: "withdraw", args: [parseUnits(withdrawV, 18)] })}>Withdraw</Button>
        </div>

        {txHash && <div className="mt-4 text-xs font-mono text-zinc-500 truncate">{txHash} {waiting && <span className="text-amber-400">(pending)</span>}</div>}
      </Card>
    </div>
  );
}
