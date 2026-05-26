"use client";
import { useReadContract, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { parseUnits } from "viem";
import { FACTORY_ABI, PAIR_ABI } from "@/abi/contracts.abi";
import { ROUTER_ABI } from "@/abi/router.abi";
import { ERC20_ABI } from "@/abi/erc20.abi";
import { ADDR } from "@/config/addresses";
import { DEADLINE } from "@/lib/utils";

export function useLiquidity(tokenA: string, tokenB: string, addr?: string) {
  const { data: pairAddr } = useReadContract({ address: ADDR.litvm.factory as `0x${string}`, abi: FACTORY_ABI, functionName: "getPair", args: [tokenA, tokenB] });
  const { data: reserves } = useReadContract({ address: pairAddr as `0x${string}`, abi: PAIR_ABI, functionName: "getReserves", query: { enabled: !!pairAddr && pairAddr !== "0x0000000000000000000000000000000000000000" } });
  const { data: lpBal } = useReadContract({ address: pairAddr as `0x${string}`, abi: ERC20_ABI, functionName: "balanceOf", args: addr ? [addr] : undefined, query: { enabled: !!addr && !!pairAddr } });
  const { data: lpTotal } = useReadContract({ address: pairAddr as `0x${string}`, abi: ["function totalSupply() view returns (uint256)"], functionName: "totalSupply", query: { enabled: !!pairAddr } });
  const { writeContract, data: txHash, isPending } = useWriteContract();
  const { isLoading: waiting } = useWaitForTransactionReceipt({ hash: txHash });

  const add = (aA: string, aB: string, dA: number, dB: number, to: string) => {
    writeContract({ address: ADDR.litvm.router as `0x${string}`, abi: ROUTER_ABI, functionName: "addLiquidity", args: [tokenA, tokenB, parseUnits(aA, dA), parseUnits(aB, dB), 0n, 0n, to, DEADLINE()] });
  };

  return { pairAddr: pairAddr as string, reserves: reserves as [bigint, bigint] | undefined, lpBal: lpBal as bigint, lpTotal: lpTotal as bigint, add, txHash, isPending: isPending || waiting };
}
