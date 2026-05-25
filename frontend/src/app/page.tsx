"use client";

import { useAccount, useReadContract, useBalance } from "wagmi";
import { formatUnits } from "viem";
import { TOKEN_LIST, ERC20_ABI } from "@/lib/constants";

export default function Dashboard() {
  const { address, chainId } = useAccount();

  if (!address) return <p className="text-gray-400 mt-8 text-center">Connect wallet to view dashboard</p>;

  return (
    <div className="mt-8">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <BalancesCard address={address} chainId={chainId} title="Current Network" />
      </div>
    </div>
  );
}

function BalancesCard({ address, chainId, title }: { address: string; chainId?: number; title: string }) {
  const { data: native } = useBalance({ address: address as `0x${string}` });
  return (
    <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
      <h2 className="text-lg font-semibold mb-4">{title} (Chain ID: {chainId})</h2>
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Native</span>
          <span>{native ? formatUnits(native.value, native.decimals) : "0"} {native?.symbol}</span>
        </div>
        {TOKEN_LIST.map((token) => (
          <TokenBalance key={token.symbol} token={token} address={address} />
        ))}
      </div>
    </div>
  );
}

function TokenBalance({ token, address }: { token: typeof TOKEN_LIST[0]; address: string }) {
  const { data } = useReadContract({
    address: token.address as `0x${string}`,
    abi: ERC20_ABI,
    functionName: "balanceOf",
    args: [address],
  });
  return (
    <div className="flex justify-between text-sm">
      <span className="text-gray-400">{token.symbol}</span>
      <span>{data ? formatUnits(data as bigint, token.decimals) : "0"}</span>
    </div>
  );
}
