"use client";

import { useAccount, useReadContract, useBalance } from "wagmi";
import { formatUnits } from "viem";
import Link from "next/link";
import { TOKEN_LIST, ERC20_ABI } from "@/lib/constants";

const ICON_COLORS = [
  { bg: "rgba(59,130,246,0.15)", fg: "#3B82F6" },
  { bg: "rgba(34,197,94,0.15)", fg: "#22C55E" },
  { bg: "rgba(139,92,246,0.15)", fg: "#8B5CF6" },
  { bg: "rgba(245,158,11,0.15)", fg: "#F59E0B" },
];

const STATS = [
  { label: "Total Pools", value: "4", sub: "USDC · USDT · WETH · WBTC" },
  { label: "24h Volume", value: "$18.5K", sub: "Across all pairs" },
  { label: "TVL", value: "$62.4K", sub: "LitVM + Sepolia" },
  { label: "Reward APR", value: "14.2%", sub: "LP staking" },
];

const FEATURES = [
  { label: "Swap", href: "/swap/", icon: "⇄", desc: "Trade tokens with deep liquidity & low slippage", color: "#3B82F6", bg: "rgba(59,130,246,0.1)" },
  { label: "Liquidity", href: "/liquidity/", icon: "⊞", desc: "Provide liquidity & earn 0.3% trading fees", color: "#22C55E", bg: "rgba(34,197,94,0.1)" },
  { label: "Bridge", href: "/bridge/", icon: "→", desc: "Move assets between LitVM and Sepolia", color: "#8B5CF6", bg: "rgba(139,92,246,0.1)" },
  { label: "Staking", href: "/staking/", icon: "✦", desc: "Stake LP tokens & earn USDC rewards", color: "#F59E0B", bg: "rgba(245,158,11,0.1)" },
];

export default function Dashboard() {
  const { address, chainId } = useAccount();
  const { data: native } = useBalance({ address: address as `0x${string}`, query: { enabled: !!address } });

  return (
    <div className="mt-10 animate-fade-in">
      {/* Hero */}
      <div className="text-center mb-12">
        <div
          className="w-20 h-20 rounded-2xl mx-auto mb-6 flex items-center justify-center animate-pulse-glow"
          style={{ background: "linear-gradient(135deg, var(--accent-green), var(--accent-green-soft))" }}
        >
          <span className="text-3xl" style={{ fontFamily: "var(--font-brand)", fontWeight: 700 }}>L</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4" style={{ fontFamily: "var(--font-brand)" }}>
          LitVM <span className="gradient-green">DeFi</span>
        </h1>
        <p className="text-base max-w-lg mx-auto leading-relaxed" style={{ color: "var(--text-secondary)" }}>
          Trade, provide liquidity, bridge cross-chain, and earn rewards — all on one platform
        </p>
      </div>

      {/* Protocol stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
        {STATS.map((s, i) => (
          <div key={s.label} className="stat-card" style={{ animationDelay: `${i * 80}ms` }}>
            <div className="text-xs font-semibold mb-2 uppercase tracking-wider" style={{ color: "var(--text-tertiary)" }}>
              {s.label}
            </div>
            <div className="text-2xl font-bold mb-1" style={{ fontFamily: "var(--font-brand)" }}>{s.value}</div>
            <div className="text-xs" style={{ color: "var(--text-secondary)" }}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Wallet connected: portfolio */}
      {address && (
        <div className="glass-card p-8 mb-10">
          <div className="flex items-center justify-between mb-6">
            <span className="text-sm font-semibold uppercase tracking-wider" style={{ color: "var(--text-secondary)" }}>
              Wallet Balance
            </span>
            <span className="badge badge-blue">{chainId === 4441 ? "LitVM" : "Sepolia"}</span>
          </div>
          <div className="text-4xl sm:text-5xl font-bold mb-6" style={{ fontFamily: "var(--font-brand)" }}>
            {native ? Number(formatUnits(native.value, native.decimals)).toFixed(4) : "0.0000"}
            <span className="text-xl ml-2" style={{ color: "var(--text-secondary)", fontFamily: "var(--font-body)" }}>
              {native?.symbol ?? "zkLTC"}
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {TOKEN_LIST.map((t, i) => (
              <TokenBalance key={t.symbol} token={t} address={address} c={ICON_COLORS[i]} />
            ))}
          </div>
        </div>
      )}

      {/* Feature grid - Bento style */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {FEATURES.map((f, i) => (
          <Link
            key={f.label}
            href={f.href}
            className="glass-card p-6 group no-underline"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl mb-5 transition-transform group-hover:scale-110"
              style={{ background: f.bg, color: f.color }}
            >
              {f.icon}
            </div>
            <div className="text-base font-bold mb-2" style={{ fontFamily: "var(--font-brand)", letterSpacing: "0.02em" }}>
              {f.label}
            </div>
            <div className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              {f.desc}
            </div>
          </Link>
        ))}
      </div>

      {/* Token showcase */}
      <div className="mt-16">
        <h3 className="text-lg font-bold mb-5" style={{ fontFamily: "var(--font-brand)", letterSpacing: "0.03em" }}>
          Available Tokens
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {TOKEN_LIST.map((t, i) => (
            <div key={t.symbol} className="stat-card">
              <div className="token-icon mb-3" style={{ background: ICON_COLORS[i].bg, color: ICON_COLORS[i].fg }}>
                {t.symbol.slice(0, 2)}
              </div>
              <div className="font-bold text-sm" style={{ fontFamily: "var(--font-brand)" }}>{t.symbol}</div>
              <div className="text-xs mt-1" style={{ color: "var(--text-tertiary)" }}>{t.decimals} decimals</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TokenBalance({ token, address, c }: { token: (typeof TOKEN_LIST)[0]; address: string; c: { bg: string; fg: string } }) {
  const { data } = useReadContract({
    address: token.address as `0x${string}`, abi: ERC20_ABI, functionName: "balanceOf", args: [address],
  });
  const bal = data ? formatUnits(data as bigint, token.decimals) : "0";
  return (
    <div className="stat-card">
      <div className="token-icon mb-2.5" style={{ background: c.bg, color: c.fg }}>{token.symbol.slice(0, 2)}</div>
      <div className="text-lg font-bold">{Number(bal).toFixed(4)}</div>
      <div className="text-xs font-semibold mt-0.5" style={{ color: "var(--text-secondary)" }}>{token.symbol}</div>
    </div>
  );
}
