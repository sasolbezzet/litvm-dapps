"use client";
import { useAccount } from "wagmi";
import { StatsCard } from "@/components/StatsCard";
import { useTokenBalances } from "@/hooks/useTokens";
import { ADDR, TOKENS } from "@/config/addresses";
import { fmtUnits, fmtUSD, shorten } from "@/lib/utils";
import Link from "next/link";

export default function Dashboard() {
  const { address, isConnected, chainId } = useAccount();
  const { native, tokens, isLoading } = useTokenBalances();

  const totalUSD = tokens.reduce((sum, t) => sum + Number(t.balance) / 10 ** t.decimals * (t.price || 0), 0) + Number(native.balance || 0n) / 1e18 * 0.01;

  return (
    <div className="mt-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white">{isConnected ? "Portfolio" : "LitVM DeFi"}</h1>
        <p className="text-zinc-400 mt-1 text-sm">{isConnected ? `${chainId === 4441 ? "LitVM" : "Sepolia"} · ${shorten(address!)}` : "DEX, Bridge, and Staking on LitVM testnet"}</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatsCard label="Total Balance" value={isConnected ? `$${totalUSD.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : "—"} sub="Estimated USD value" />
        <StatsCard label="Liquidity Pools" value="4" sub="USDC, USDT, WETH, WBTC" />
        <StatsCard label="LP Staking APR" value="~12%" sub="Earn USDC rewards" />
        <StatsCard label="Network" value={chainId ? (chainId === 4441 ? "LitVM" : "Sepolia") : "—"} sub="Chain ID: 4441" />
      </div>

      {isConnected && address && (
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6">
          <h2 className="text-lg font-semibold mb-4 text-white">Token Balances</h2>
          <div className="space-y-1">
            <div className="grid grid-cols-[1fr_1fr_1fr] gap-4 text-xs font-medium text-zinc-500 uppercase tracking-wider pb-2 border-b border-zinc-800">
              <span>Asset</span><span className="text-right">Balance</span><span className="text-right">Value (USD)</span>
            </div>
            <Row symbol="zkLTC" balance={native.balance} decimals={18} price={0.01} />
            {tokens.map(t => <Row key={t.symbol} symbol={t.symbol} balance={t.balance} decimals={t.decimals} price={t.price || 0} />)}
          </div>
        </div>
      )}

      <div>
        <h2 className="text-lg font-semibold mb-4 text-white">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { l: "Swap", h: "/swap/", d: "Trade tokens instantly", c: "from-blue-500 to-cyan-500" },
            { l: "Liquidity", h: "/liquidity/", d: "Add liquidity & earn fees", c: "from-green-400 to-emerald-600" },
            { l: "Bridge", h: "/bridge/", d: "LitVM ↔ Sepolia", c: "from-purple-500 to-violet-600" },
            { l: "Staking", h: "/staking/", d: "Stake LP & earn USDC", c: "from-amber-400 to-orange-600" },
          ].map(f => (
            <Link key={f.l} href={f.h} className="block p-5 rounded-2xl border border-zinc-800 bg-zinc-900/60 hover:border-zinc-700 hover:bg-zinc-900/80 transition-all no-underline group">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${f.c} mb-4 flex items-center justify-center text-lg`}>{f.l[0]}</div>
              <div className="font-semibold text-white mb-1">{f.l}</div>
              <div className="text-sm text-zinc-500">{f.d}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function Row({ symbol, balance, decimals, price }: { symbol: string; balance: bigint; decimals: number; price: number }) {
  return (
    <div className="grid grid-cols-[1fr_1fr_1fr] gap-4 py-2.5 text-sm">
      <span className="font-medium text-white">{symbol}</span>
      <span className="text-right text-white">{fmtUnits(balance, decimals)}</span>
      <span className="text-right text-zinc-400">{fmtUSD(balance, decimals, price)}</span>
    </div>
  );
}
