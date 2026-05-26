"use client";

import { useState } from "react";
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { parseUnits, formatUnits } from "viem";
import { STAKING_ABI, ADDRESSES } from "@/lib/constants";

export default function Staking() {
  const { address } = useAccount();
  const [stakeAmt, setStakeAmt] = useState("");
  const [withdrawAmt, setWithdrawAmt] = useState("");

  const { data: earned } = useReadContract({
    address: ADDRESSES.litvm.staking as `0x${string}`, abi: STAKING_ABI, functionName: "earned",
    args: address ? [address] : undefined,
  });
  const { data: staked } = useReadContract({
    address: ADDRESSES.litvm.staking as `0x${string}`, abi: STAKING_ABI, functionName: "stakes",
    args: address ? [address] : undefined,
  });

  const { writeContract, data: txHash, isPending } = useWriteContract();
  const { isLoading: waiting } = useWaitForTransactionReceipt({ hash: txHash });

  if (!address)
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3 animate-fade-in">
        <h2 className="text-2xl font-bold" style={{ fontFamily: "var(--font-brand)" }}>Connect Wallet</h2>
      </div>
    );

  const e = earned ? formatUnits(earned as bigint, 6) : "0";
  const s = staked ? formatUnits(staked as bigint, 18) : "0";

  return (
    <div className="mt-10 max-w-[460px] mx-auto animate-fade-in">
      <h1 className="text-2xl font-bold mb-6" style={{ fontFamily: "var(--font-brand)" }}>Staking</h1>
      <div className="glass-card p-6">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="stat-card">
            <div className="text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: "var(--text-tertiary)" }}>Staked LP</div>
            <div className="text-2xl font-bold" style={{ fontFamily: "var(--font-brand)" }}>{Number(s).toFixed(4)}</div>
          </div>
          <div className="stat-card">
            <div className="text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: "var(--text-tertiary)" }}>Rewards</div>
            <div className="text-2xl font-bold gradient-green" style={{ fontFamily: "var(--font-brand)" }}>{Number(e).toFixed(4)} USDC</div>
          </div>
        </div>

        {/* Claim */}
        <button className="btn btn-ghost w-full mb-6" disabled={!earned || (earned as bigint) === 0n || isPending}
          onClick={() => writeContract({ address: ADDRESSES.litvm.staking as `0x${string}`, abi: STAKING_ABI, functionName: "claimReward" })}>
          {isPending ? "Claiming..." : "Claim Rewards"}
        </button>

        {/* Stake */}
        <div className="flex gap-3 mb-4">
          <input className="input flex-1" style={{ height: 50, fontSize: 15 }} placeholder="LP amount" value={stakeAmt} onChange={(e) => setStakeAmt(e.target.value)} />
          <button className="btn btn-primary btn-sm" style={{ minWidth: 100 }} disabled={!stakeAmt || isPending}
            onClick={() => writeContract({ address: ADDRESSES.litvm.staking as `0x${string}`, abi: STAKING_ABI, functionName: "stake", args: [parseUnits(stakeAmt, 18)] })}>
            Stake
          </button>
        </div>
        <div className="flex gap-3">
          <input className="input flex-1" style={{ height: 50, fontSize: 15 }} placeholder="LP amount" value={withdrawAmt} onChange={(e) => setWithdrawAmt(e.target.value)} />
          <button className="btn btn-secondary btn-sm" style={{ minWidth: 100 }} disabled={!withdrawAmt || isPending}
            onClick={() => writeContract({ address: ADDRESSES.litvm.staking as `0x${string}`, abi: STAKING_ABI, functionName: "withdraw", args: [parseUnits(withdrawAmt, 18)] })}>
            Withdraw
          </button>
        </div>

        {txHash && (
          <div className="mt-4 text-xs font-mono truncate" style={{ color: "var(--text-tertiary)" }}>
            {txHash} {waiting && <span style={{ color: "var(--accent-amber)" }}>(pending)</span>}
          </div>
        )}
      </div>
    </div>
  );
}
