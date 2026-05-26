"use client";

import { useState } from "react";
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { parseUnits, formatUnits } from "viem";
import { STAKING_ABI, ADDRESSES } from "@/lib/constants";

export default function Staking() {
  const { address } = useAccount();
  const [stakeAmount, setStakeAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");

  const { data: earned } = useReadContract({
    address: ADDRESSES.litvm.staking as `0x${string}`,
    abi: STAKING_ABI,
    functionName: "earned",
    args: address ? [address] : undefined,
  });

  const { data: staked } = useReadContract({
    address: ADDRESSES.litvm.staking as `0x${string}`,
    abi: STAKING_ABI,
    functionName: "stakes",
    args: address ? [address] : undefined,
  });

  const { writeContract, data: txHash, isPending } = useWriteContract();
  const { isLoading: waiting } = useWaitForTransactionReceipt({ hash: txHash });

  if (!address)
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <h2 className="text-2xl font-semibold">Connect your wallet</h2>
      </div>
    );

  const earnedVal = earned ? formatUnits(earned as bigint, 6) : "0";
  const stakedVal = staked ? formatUnits(staked as bigint, 18) : "0";

  return (
    <div className="mt-10 max-w-[440px] mx-auto">
      <h1 className="text-2xl font-bold mb-6">Staking</h1>
      <div className="card-defi">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="stat-card">
            <div className="text-xs font-medium mb-1.5" style={{ color: "var(--cb-text-secondary)" }}>Staked LP</div>
            <div className="text-xl font-bold">{Number(stakedVal).toFixed(4)}</div>
          </div>
          <div className="stat-card">
            <div className="text-xs font-medium mb-1.5" style={{ color: "var(--cb-text-secondary)" }}>Rewards</div>
            <div className="text-xl font-bold" style={{ color: "var(--cb-green)" }}>{Number(earnedVal).toFixed(4)} USDC</div>
          </div>
        </div>

        {/* Claim */}
        <button
          className="btn-pill w-full h-[46px] mb-5 font-semibold text-sm"
          style={{ background: "transparent", border: "1px solid rgba(0, 213, 75, 0.3)", color: "var(--cb-green)" }}
          disabled={!earned || (earned as bigint) === 0n || isPending}
          onClick={() => writeContract({ address: ADDRESSES.litvm.staking as `0x${string}`, abi: STAKING_ABI, functionName: "claimReward" })}
        >
          {isPending ? "Claiming..." : "Claim Rewards"}
        </button>

        {/* Stake */}
        <div className="flex gap-3 mb-4">
          <input className="input-defi flex-1" style={{ height: 48, fontSize: 15 }} placeholder="LP amount" value={stakeAmount} onChange={(e) => setStakeAmount(e.target.value)} />
          <button
            className="btn-pill btn-primary px-6 h-[48px] text-sm"
            disabled={!stakeAmount || isPending}
            onClick={() => writeContract({ address: ADDRESSES.litvm.staking as `0x${string}`, abi: STAKING_ABI, functionName: "stake", args: [parseUnits(stakeAmount, 18)] })}
          >
            Stake
          </button>
        </div>

        {/* Withdraw */}
        <div className="flex gap-3">
          <input className="input-defi flex-1" style={{ height: 48, fontSize: 15 }} placeholder="LP amount" value={withdrawAmount} onChange={(e) => setWithdrawAmount(e.target.value)} />
          <button
            className="btn-pill btn-secondary px-6 h-[48px] text-sm"
            disabled={!withdrawAmount || isPending}
            onClick={() => writeContract({ address: ADDRESSES.litvm.staking as `0x${string}`, abi: STAKING_ABI, functionName: "withdraw", args: [parseUnits(withdrawAmount, 18)] })}
          >
            Withdraw
          </button>
        </div>

        {txHash && <div className="text-xs truncate mt-3" style={{ color: "var(--cb-text-secondary)" }}>TX: {txHash} {waiting && "(pending...)"}</div>}
      </div>
    </div>
  );
}
