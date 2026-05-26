"use client";
import { useWriteContract, useWaitForTransactionReceipt, useReadContract } from "wagmi";
import { parseUnits } from "viem";
import { BRIDGE_LITVM_ABI, BRIDGE_SEPOLIA_ABI } from "@/abi/contracts.abi";
import { ERC20_ABI } from "@/abi/erc20.abi";
import { ADDR } from "@/config/addresses";

export function useBridge(dir: "L2S" | "S2L", token: string, amount: string, decimals: number, addr?: string) {
  const { writeContract, data: txHash, isPending } = useWriteContract();
  const { isLoading: waiting } = useWaitForTransactionReceipt({ hash: txHash });
  const { data: bal } = useReadContract({ address: token as `0x${string}`, abi: ERC20_ABI, functionName: "balanceOf", args: addr ? [addr] : undefined, query: { enabled: !!addr } });

  const parsed = amount ? parseUnits(amount, decimals) : 0n;
  const insufficient = parsed > 0n && bal !== undefined && parsed > (bal as bigint);

  const bridge = () => {
    if (dir === "L2S") writeContract({ address: ADDR.litvm.bridgeLitVM as `0x${string}`, abi: BRIDGE_LITVM_ABI, functionName: "lock", args: [token, parsed, addr] });
    else writeContract({ address: ADDR.sepolia.bridgeSepolia as `0x${string}`, abi: BRIDGE_SEPOLIA_ABI, functionName: "burn", args: [token, parsed, addr] });
  };

  return { balance: bal as bigint, insufficient, bridge, txHash, isPending: isPending || waiting };
}
