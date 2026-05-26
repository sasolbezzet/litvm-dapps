"use client";

import { useAccount, useReadContract, useBalance } from "wagmi";
import { formatUnits } from "viem";
import { TOKEN_LIST, ERC20_ABI } from "@/lib/constants";

const COLORS = [
  { bg: "#1a2b5e", text: "#4d8aff" },
  { bg: "#1a3d2a", text: "#00d54b" },
  { bg: "#3d1a5e", text: "#b84dff" },
  { bg: "#5e3a1a", text: "#ff9d4d" },
];

export default function Dashboard() {
  const { address, chainId } = useAccount();

  if (!address)
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] gap-6">
        <div className="w-20 h-20 rounded-3xl flex items-center justify-center" style={{ background: "var(--cb-card)", border: "1px solid var(--cb-border)" }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--cb-text-secondary)" strokeWidth="1.5">
            <rect x="3" y="11" width="18" height="11" rx="2" />
            <path d="M7 11V7a5 5 0 0110 0v4" />
          </svg>
        </div>
        <h2 className="text-2xl font-semibold">Connect your wallet</h2>
        <p className="text-sm" style={{ color: "var(--cb-text-secondary)" }}>Connect to view your portfolio and start trading</p>
      </div>
    );

  const { data: native } = useBalance({ address: address as `0x${string}` });

  return (
    <div className="mt-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-sm mt-1" style={{ color: "var(--cb-text-secondary)" }}>
          Chain ID: {chainId} &middot; {address?.slice(0, 6)}...{address?.slice(-4)}
        </p>
      </div>

      {/* Network card */}
      <div className="card-defi mb-6">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium" style={{ color: "var(--cb-text-secondary)" }}>Network Balance</span>
          <span className="token-pill text-xs">
            {chainId === 4441 ? "LitVM" : "Sepolia"}
          </span>
        </div>
        <div className="text-4xl font-bold tracking-tight mb-6">
          {native ? Number(formatUnits(native.value, native.decimals)).toFixed(4) : "0.0000"}{" "}
          <span className="text-lg" style={{ color: "var(--cb-text-secondary)" }}>{native?.symbol}</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {TOKEN_LIST.map((token, i) => (
            <TokenBalance key={token.symbol} token={token} address={address} color={COLORS[i]} />
          ))}
        </div>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Swap", href: "/swap/", icon: "⇄", desc: "Trade tokens" },
          { label: "Liquidity", href: "/liquidity/", icon: "⊞", desc: "Add liquidity" },
          { label: "Bridge", href: "/bridge/", icon: "→", desc: "Cross-chain" },
          { label: "Staking", href: "/staking/", icon: "✦", desc: "Earn rewards" },
        ].map((a) => (
          <a key={a.label} href={a.href} className="stat-card hover-card text-center" style={{ textDecoration: "none" }}>
            <div className="text-2xl mb-2">{a.icon}</div>
            <div className="text-sm font-semibold">{a.label}</div>
            <div className="text-xs mt-1" style={{ color: "var(--cb-text-secondary)" }}>{a.desc}</div>
          </a>
        ))}
      </div>
    </div>
  );
}

function TokenBalance({ token, address, color }: { token: (typeof TOKEN_LIST)[0]; address: string; color: { bg: string; text: string } }) {
  const { data } = useReadContract({
    address: token.address as `0x${string}`,
    abi: ERC20_ABI,
    functionName: "balanceOf",
    args: [address],
  });
  const bal = data ? formatUnits(data as bigint, token.decimals) : "0";
  return (
    <div className="stat-card hover-card">
      <div className="token-icon text-[10px] font-bold" style={{ background: color.bg, color: color.text, marginBottom: 10 }}>
        {token.symbol.slice(0, 2)}
      </div>
      <div className="text-lg font-semibold">{Number(bal).toFixed(4)}</div>
      <div className="text-xs font-medium mt-0.5" style={{ color: "var(--cb-text-secondary)" }}>{token.symbol}</div>
    </div>
  );
}
