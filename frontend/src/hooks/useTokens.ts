"use client";
import { useAccount, useReadContracts, useBalance } from "wagmi";
import { ERC20_ABI } from "@/abi/erc20.abi";
import { TOKENS } from "@/config/addresses";

export function useTokenBalances() {
  const { address, isConnected } = useAccount();
  const { data: native } = useBalance({ address, query: { enabled: isConnected } });
  const tokenContracts = TOKENS.filter(t => !t.native).map(t => ({ address: t.address as `0x${string}`, abi: ERC20_ABI, functionName: "balanceOf" as const, args: [address!] }));
  const { data: balances, isLoading } = useReadContracts({ contracts: isConnected && address ? tokenContracts : [], query: { enabled: isConnected && !!address } });
  return {
    native: { symbol: "zkLTC", balance: native?.value ?? 0n, decimals: 18, price: 0.01 },
    tokens: TOKENS.filter(t => !t.native).map((t, i) => ({ ...t, balance: (balances?.[i]?.result as bigint) ?? 0n })),
    isLoading,
  };
}
