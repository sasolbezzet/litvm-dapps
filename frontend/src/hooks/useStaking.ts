"use client";
import { useReadContract, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { parseUnits } from "viem";
import { STAKING_ABI } from "@/abi/contracts.abi";
import { ADDR } from "@/config/addresses";

export function useStaking(addr?: string) {
  const { data: earned } = useReadContract({ address: ADDR.litvm.staking as `0x${string}`, abi: STAKING_ABI, functionName: "earned", args: addr ? [addr] : undefined, query: { enabled: !!addr } });
  const { data: staked } = useReadContract({ address: ADDR.litvm.staking as `0x${string}`, abi: STAKING_ABI, functionName: "stakes", args: addr ? [addr] : undefined, query: { enabled: !!addr } });
  const { data: totalStaked } = useReadContract({ address: ADDR.litvm.staking as `0x${string}`, abi: STAKING_ABI, functionName: "totalStaked" });
  const { data: rewardRate } = useReadContract({ address: ADDR.litvm.staking as `0x${string}`, abi: STAKING_ABI, functionName: "rewardRate" });
  const { writeContract, data: txHash, isPending } = useWriteContract();
  const { isLoading: waiting } = useWaitForTransactionReceipt({ hash: txHash });

  const stake = (amount: string) => writeContract({ address: ADDR.litvm.staking as `0x${string}`, abi: STAKING_ABI, functionName: "stake", args: [parseUnits(amount, 18)] });
  const unstake = (amount: string) => writeContract({ address: ADDR.litvm.staking as `0x${string}`, abi: STAKING_ABI, functionName: "unstake", args: [parseUnits(amount, 18)] });
  const claim = () => writeContract({ address: ADDR.litvm.staking as `0x${string}`, abi: STAKING_ABI, functionName: "claimReward" });

  return { earned: earned as bigint, staked: staked as bigint, totalStaked: totalStaked as bigint, rewardRate: rewardRate as bigint, stake, unstake, claim, txHash, isPending: isPending || waiting };
}
