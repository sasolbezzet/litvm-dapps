"use client";
import { useReadContract, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { parseUnits } from "viem";
import { ROUTER_ABI } from "@/abi/router.abi";
import { ERC20_ABI } from "@/abi/erc20.abi";
import { ADDR } from "@/config/addresses";
import { DEADLINE } from "@/lib/utils";

export function useSwap(fromAddr: string, toAddr: string, amount: string, fromDecimals: number, toDecimals: number, slippage: number) {
  const parsed = amount ? parseUnits(amount, fromDecimals) : 0n;
  const path = [fromAddr, toAddr] as const;

  const { data: out } = useReadContract({
    address: ADDR.litvm.router as `0x${string}`, abi: ROUTER_ABI, functionName: "getAmountsOut",
    args: parsed > 0n ? [parsed, path as any] : undefined, query: { enabled: parsed > 0n },
  });
  const { data: allowance } = useReadContract({
    address: fromAddr as `0x${string}`, abi: ERC20_ABI, functionName: "allowance", query: { enabled: !!fromAddr },
  });
  const { writeContract, data: txHash, isPending } = useWriteContract();
  const { isLoading: waiting } = useWaitForTransactionReceipt({ hash: txHash });

  const outAmount = out ? (out as bigint[])[1] : 0n;
  const minOut = outAmount * BigInt(Math.floor((1 - slippage / 100) * 1000)) / 1000n;
  const needApprove = allowance !== undefined && parsed > 0n && (allowance as bigint) < parsed;

  const approve = () => writeContract({ address: fromAddr as `0x${string}`, abi: ERC20_ABI, functionName: "approve", args: [ADDR.litvm.router, parsed] });
  const swap = (to: string) => writeContract({ address: ADDR.litvm.router as `0x${string}`, abi: ROUTER_ABI, functionName: "swapExactTokensForTokens", args: [parsed, minOut, path as any, to, DEADLINE()] });

  return { outAmount, needApprove, approval: allowance as bigint, txHash, isPending: isPending || waiting, approve, swap };
}
