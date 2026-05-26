"use client";

import { useAccount, useReadContract, useBalance } from "wagmi";
import { formatUnits } from "viem";
import { TOKEN_LIST, ERC20_ABI, ADDRESSES } from "@/lib/constants";

const COLORS = [
  { bg: "#1a2b5e", text: "#4d8aff" },
  { bg: "#1a3d2a", text: "#00d54b" },
  { bg: "#3d1a5e", text: "#b84dff" },
  { bg: "#5e3a1a", text: "#ff9d4d" },
];

const FEATURES = [
  { label: "Swap", href: "/swap/", icon: "⇄", desc: "Trade tokens instantly with deep liquidity pools", color: "#0052ff" },
  { label: "Liquidity", href: "/liquidity/", icon: "⊞", desc: "Provide liquidity and earn 0.3% swap fees", color: "#00d54b" },
  { label: "Bridge", href: "/bridge/", icon: "→", desc: "Move assets between LitVM and Sepolia", color: "#b84dff" },
  { label: "Staking", href: "/staking/", icon: "✦", desc: "Stake LP tokens and earn USDC rewards", color: "#ff9d4d" },
];

export default function Dashboard() {
  const { address, chainId } = useAccount();
  const { data: native } = useBalance({ address: address as `0x${string}`, query: { enabled: !!address } });

  return (
    <div className="mt-10">
      {/* Hero - always visible */}
      {!address ? (
        <div className="mb-12 text-center">
          <div className="w-16 h-16 rounded-2xl mx-auto mb-5 flex items-center justify-center" style={{ background: "var(--cb-blue)" }}>
            <span className="text-2xl font-bold">L</span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight mb-3">
            LitVM <span className="gradient-text">DeFi</span>
          </h1>
          <p className="text-base max-w-md mx-auto" style={{ color: "var(--cb-text-secondary)" }}>
            Trade, provide liquidity, bridge assets, and earn rewards — all on LitVM
          </p>
        </div>
      ) : (
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-sm mt-1" style={{ color: "var(--cb-text-secondary)" }}>
            Chain {chainId} &middot; {address?.slice(0, 6)}...{address?.slice(-4)}
          </p>
        </div>
      )}

      {/* Protocol stats - always visible */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
        {[
          { label: "Total Pairs", value: "4", sub: "USDC, USDT, WETH, WBTC" },
          { label: "24h Volume", value: "$12.4K", sub: "Across all pools" },
          { label: "TVL", value: "$48.2K", sub: "LitVM + Sepolia" },
          { label: "Reward APR", value: "12.8%", sub: "USDC staking" },
        ].map((stat) => (
          <div key={stat.label} className="stat-card hover-card">
            <div className="text-xs font-medium mb-1.5" style={{ color: "var(--cb-text-secondary)" }}>{stat.label}</div>
            <div className="text-xl font-bold">{stat.value}</div>
            <div className="text-[11px] mt-1" style={{ color: "var(--cb-text-secondary)" }}>{stat.sub}</div>
          </div>
        ))}
      </div>

      {/* Wallet connected? Show portfolio */}
      {address && (
        <div className="card-defi mb-8">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium" style={{ color: "var(--cb-text-secondary)" }}>Wallet Balance</span>
            <span className="token-pill text-xs">{chainId === 4441 ? "LitVM" : "Sepolia"}</span>
          </div>
          <div className="text-4xl font-bold tracking-tight mb-6">
            {native ? Number(formatUnits(native.value, native.decimals)).toFixed(4) : "0.0000"}{" "}
            <span className="text-lg" style={{ color: "var(--cb-text-secondary)" }}>{native?.symbol || "zkLTC"}</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {TOKEN_LIST.map((token, i) => (
              <TokenBalance key={token.symbol} token={token} address={address} color={COLORS[i]} />
            ))}
          </div>
        </div>
      )}

      {/* Feature cards - always visible */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {FEATURES.map((f) => (
          <a key={f.label} href={f.href} className="card-defi hover-card group" style={{ textDecoration: "none", padding: 24 }}>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg mb-4 transition-transform group-hover:scale-110" style={{ background: f.color + "18", color: f.color }}>
              {f.icon}
            </div>
            <div className="text-base font-semibold mb-1.5">{f.label}</div>
            <div className="text-sm leading-relaxed" style={{ color: "var(--cb-text-secondary)" }}>{f.desc}</div>
          </a>
        ))}
      </div>

      {/* Token info - always visible */}
      {!address && (
        <div className="mt-10">
          <h3 className="text-lg font-semibold mb-4">Available Tokens</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {TOKEN_LIST.map((token, i) => (
              <div key={token.symbol} className="stat-card">
                <div className="token-icon mb-3" style={{ background: COLORS[i].bg, color: COLORS[i].text, fontSize: 11 }}>
                  {token.symbol.slice(0, 2)}
                </div>
                <div className="font-semibold text-sm">{token.symbol}</div>
                <div className="text-xs mt-0.5" style={{ color: "var(--cb-text-secondary)" }}>
                  {token.decimals} decimals
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
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
      <div className="token-icon mb-2.5" style={{ background: color.bg, color: color.text, fontSize: 10 }}>
        {token.symbol.slice(0, 2)}
      </div>
      <div className="text-lg font-semibold">{Number(bal).toFixed(4)}</div>
      <div className="text-xs font-medium mt-0.5" style={{ color: "var(--cb-text-secondary)" }}>{token.symbol}</div>
    </div>
  );
}
