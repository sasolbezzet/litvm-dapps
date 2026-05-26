"use client";
import { useAccount, useReadContract, useReadContracts, useBalance } from "wagmi";
import { formatUnits } from "viem";
import Link from "next/link";
import { TOKEN_LIST, ERC20_ABI, FACTORY_ABI, PAIR_ABI, STAKING_ABI, ADDRESSES } from "@/lib/constants";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fmtUnits, shorten } from "@/lib/utils";

export default function Dashboard() {
  const { address, isConnected, chainId } = useAccount();
  const { data: native } = useBalance({ address: address as `0x${string}`, query: { enabled: isConnected } });

  // Real stats from contracts
  const { data: pairsLen } = useReadContract({ address: ADDRESSES.litvm.factory as `0x${string}`, abi: FACTORY_ABI, functionName: "allPairsLength" });
  const totalPairs = pairsLen ? Number(pairsLen) : 0;

  // First pair for TVL demo (USDC/WETH)
  const { data: pairAddr } = useReadContract({ address: ADDRESSES.litvm.factory as `0x${string}`, abi: FACTORY_ABI, functionName: "getPair", args: [ADDRESSES.litvm.usdc, ADDRESSES.litvm.weth] });
  const { data: reserves } = useReadContract({ address: pairAddr as `0x${string}`, abi: PAIR_ABI, functionName: "getReserves", query: { enabled: !!pairAddr && pairAddr !== "0x0000000000000000000000000000000000000000" } });

  const tokenBalances = useReadContracts({
    contracts: isConnected ? TOKEN_LIST.map(t => ({ address: t.address as `0x${string}`, abi: ERC20_ABI, functionName: "balanceOf", args: [address!] })) : [],
  });

  return (
    <div className="mt-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{isConnected ? "Portfolio" : "LitVM DeFi"}</h1>
        <p className="text-zinc-400 mt-1 text-sm">
          {isConnected ? `${chainId === 4441 ? "LitVM" : "Sepolia"} · ${shorten(address!)}` : "Decentralized exchange and bridge on LitVM testnet"}
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard label="Total Pools" value={totalPairs.toString()} sub="Active pairs on LitVM" />
        <StatCard label="TVL" value={reserves ? `$${(Number(formatUnits((reserves as [bigint,bigint])[0], 6)) * 2).toLocaleString(undefined, { maximumFractionDigits: 0 })}` : "—"} sub="USDC/WETH pool" />
        <StatCard label="Reward APR" value="~12%" sub="LP Staking USDC" />
        <StatCard label="Chain" value={chainId ? (chainId === 4441 ? "LitVM" : "Sepolia") : "—"} sub={`ID: ${chainId || "—"}`} />
      </div>

      {/* Connected: Balances */}
      {isConnected && address && (
        <Card>
          <CardHeader><CardTitle>Token Balances</CardTitle></CardHeader>
          <CardContent>
            <div className="mb-4 pb-4 border-b border-zinc-800 flex items-center justify-between">
              <span className="text-zinc-400">{native?.symbol || "zkLTC"}</span>
              <span className="font-semibold text-lg">{native ? Number(formatUnits(native.value, native.decimals)).toFixed(4) : "0"}</span>
            </div>
            <div className="space-y-3">
              {TOKEN_LIST.map((t, i) => {
                const bal = tokenBalances.data?.[i]?.result;
                return (
                  <div key={t.symbol} className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-[10px] font-bold">{t.symbol.slice(0, 2)}</div>
                      <span className="text-sm font-medium">{t.symbol}</span>
                    </div>
                    <span className="font-semibold">{bal ? Number(formatUnits(bal as bigint, t.decimals)).toFixed(4) : "0"}</span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Feature Links */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { l: "Swap", h: "/swap/", d: "Trade tokens with low fees", c: "from-blue-500 to-cyan-500" },
            { l: "Liquidity", h: "/liquidity/", d: "Add liquidity & earn fees", c: "from-green-400 to-emerald-600" },
            { l: "Bridge", h: "/bridge/", d: "Transfer cross-chain", c: "from-purple-500 to-violet-600" },
            { l: "Staking", h: "/staking/", d: "Stake LP & earn USDC", c: "from-amber-400 to-orange-600" },
          ].map(f => (
            <Link key={f.l} href={f.h} className="group block p-5 rounded-2xl border border-zinc-800 bg-zinc-900/60 hover:border-zinc-700 hover:bg-zinc-900/80 transition-all no-underline">
              <div className={cn("w-10 h-10 rounded-xl bg-gradient-to-br mb-4 flex items-center justify-center text-lg", f.c)}>{f.l[0]}</div>
              <div className="font-semibold mb-1">{f.l}</div>
              <div className="text-sm text-zinc-500">{f.d}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <Card className="p-4">
      <div className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-2">{label}</div>
      <div className="text-2xl font-bold mb-1">{value}</div>
      <div className="text-xs text-zinc-600">{sub}</div>
    </Card>
  );
}

function cn(...c: string[]) { return c.join(" "); }
