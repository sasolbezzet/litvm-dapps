"use client";
import { useState } from "react";
import { useAccount } from "wagmi";
import { formatUnits } from "viem";
import { useStaking } from "@/hooks/useStaking";
import { fmtUnits } from "@/lib/utils";

export default function StakingPage() {
  const { address, isConnected } = useAccount();
  const [sv, ss] = useState(""); const [wv, sw] = useState("");
  const { earned, staked, totalStaked, rewardRate, stake, unstake, claim, txHash, isPending } = useStaking(address);

  if (!isConnected) return <C />;

  return (
    <div className="mt-10 max-w-[520px] mx-auto">
      <h1 className="text-2xl font-bold text-white mb-6">Staking</h1>
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6">
        <div className="grid grid-cols-3 gap-3 mb-6">
          <S label="APY" v="~12%" g />
          <S label="Your Stake" v={fmtUnits(staked, 18)} />
          <S label="Earned" v={`${fmtUnits(earned, 6)} USDC`} g />
        </div>

        <button onClick={claim} disabled={!earned || earned === 0n || isPending} className="w-full h-11 rounded-xl border border-green-500/30 text-green-400 font-semibold text-sm hover:bg-green-500/10 disabled:opacity-40 mb-6">
          {isPending ? "Claiming..." : "Claim Rewards"}
        </button>

        <div className="text-xs text-zinc-500 mb-2">Stake LP Tokens</div>
        <div className="flex gap-3 mb-4">
          <input className="flex-1 h-12 bg-zinc-800/30 rounded-xl px-4 text-white font-semibold outline-none" placeholder="Amount" value={sv} onChange={e => ss(e.target.value)} />
          <button onClick={() => stake(sv)} disabled={!sv || isPending} className="px-6 h-12 rounded-xl bg-green-500 text-black font-semibold text-sm hover:bg-green-600 disabled:opacity-40">Stake</button>
        </div>

        <div className="text-xs text-zinc-500 mb-2">Withdraw LP Tokens</div>
        <div className="flex gap-3">
          <input className="flex-1 h-12 bg-zinc-800/30 rounded-xl px-4 text-white font-semibold outline-none" placeholder="Amount" value={wv} onChange={e => sw(e.target.value)} />
          <button onClick={() => unstake(wv)} disabled={!wv || isPending} className="px-6 h-12 rounded-xl bg-zinc-800 border border-zinc-700 text-white font-semibold text-sm hover:bg-zinc-700 disabled:opacity-40">Withdraw</button>
        </div>

        {txHash && <div className="mt-4 text-xs font-mono text-zinc-500 truncate">{txHash} {isPending && <span className="text-amber-400">pending...</span>}</div>}
      </div>
    </div>
  );
}
function S({ label, v, g }: { label: string; v: string; g?: boolean }) {
  return <div className="bg-zinc-800/50 rounded-xl p-4 text-center"><div className="text-xs text-zinc-500 mb-1">{label}</div><div className={`text-xl font-bold ${g ? "text-green-400" : "text-white"}`}>{v}</div></div>;
}
function C() { return <div className="flex items-center justify-center min-h-[60vh]"><h2 className="text-xl font-bold text-white">Connect Wallet</h2></div>; }
