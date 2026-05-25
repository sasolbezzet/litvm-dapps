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

  if (!address) return <p className="text-gray-400 mt-8 text-center">Connect wallet</p>;

  return (
    <div className="mt-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6">Staking</h1>
      <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 space-y-4">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="bg-gray-800 rounded p-3">
            <div className="text-xs text-gray-400">Staked LP</div>
            <div className="text-lg font-semibold">{staked ? formatUnits(staked as bigint, 18) : "0"}</div>
          </div>
          <div className="bg-gray-800 rounded p-3">
            <div className="text-xs text-gray-400">Rewards</div>
            <div className="text-lg font-semibold">{earned ? formatUnits(earned as bigint, 6) : "0"} USDC</div>
          </div>
        </div>

        <div>
          <label className="text-sm text-gray-400">Stake LP</label>
          <input className="w-full bg-gray-800 rounded p-2 mt-1" placeholder="LP amount" value={stakeAmount} onChange={(e) => setStakeAmount(e.target.value)} />
          <button className="w-full mt-2 bg-blue-600 hover:bg-blue-700 rounded-lg py-2 font-semibold disabled:opacity-50"
            disabled={!stakeAmount || isPending} onClick={() => {
              writeContract({ address: ADDRESSES.litvm.staking as `0x${string}`, abi: STAKING_ABI, functionName: "stake", args: [parseUnits(stakeAmount, 18)] });
            }}>
            Stake
          </button>
        </div>
        <div>
          <label className="text-sm text-gray-400">Withdraw LP</label>
          <input className="w-full bg-gray-800 rounded p-2 mt-1" placeholder="LP amount" value={withdrawAmount} onChange={(e) => setWithdrawAmount(e.target.value)} />
          <button className="w-full mt-2 bg-blue-600 hover:bg-blue-700 rounded-lg py-2 font-semibold disabled:opacity-50"
            disabled={!withdrawAmount || isPending} onClick={() => {
              writeContract({ address: ADDRESSES.litvm.staking as `0x${string}`, abi: STAKING_ABI, functionName: "withdraw", args: [parseUnits(withdrawAmount, 18)] });
            }}>
            Withdraw
          </button>
        </div>
        <div className="text-xs text-gray-500 break-all">
          {txHash && <span>TX: {txHash} {waiting && "(pending...)"}</span>}
        </div>
        <button className="w-full border border-blue-500 text-blue-400 rounded-lg py-3 font-semibold hover:bg-blue-500/10 disabled:opacity-50"
          disabled={!earned || (earned as bigint) === 0n || isPending} onClick={() => {
            writeContract({ address: ADDRESSES.litvm.staking as `0x${string}`, abi: STAKING_ABI, functionName: "claimReward" });
          }}>
          {isPending || waiting ? "Claiming..." : "Claim Rewards"}
        </button>
      </div>
    </div>
  );
}
