"use client";
import { useState } from "react";
import { useAccount } from "wagmi";
import { formatUnits } from "viem";
import { TOKENS, SEPOLIA_TOKENS } from "@/config/addresses";
import { useBridge } from "@/hooks/useBridge";
import { fmtUnits } from "@/lib/utils";

export default function BridgePage() {
  const { address, isConnected } = useAccount();
  const [dir, setDir] = useState<"L2S" | "S2L">("L2S");
  const [token, setToken] = useState(TOKENS[0]);
  const [amount, setAmount] = useState("");

  const tokens = dir === "L2S" ? [...TOKENS].filter(t => !t.native) : [...SEPOLIA_TOKENS] as any;
  const { balance, insufficient, bridge, txHash, isPending } = useBridge(dir, token.address, amount, token.decimals, address);

  if (!isConnected) return <C />;
  const isLitVM = dir === "L2S";

  return (
    <div className="mt-10 max-w-[480px] mx-auto">
      <h1 className="text-2xl font-bold text-white mb-6">Bridge</h1>
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6">
        <div className="flex bg-zinc-800/50 rounded-xl p-1 mb-6">
          <button onClick={() => setDir("L2S")} className={`flex-1 py-2.5 rounded-lg text-xs font-semibold ${isLitVM ? "bg-green-500 text-black" : "text-zinc-400"}`}>LitVM → Sepolia</button>
          <button onClick={() => setDir("S2L")} className={`flex-1 py-2.5 rounded-lg text-xs font-semibold ${!isLitVM ? "bg-green-500 text-black" : "text-zinc-400"}`}>Sepolia → LitVM</button>
        </div>
        <div className="flex items-center justify-center gap-3 mb-5">
          <span className="px-4 py-1.5 rounded-full text-xs font-medium bg-zinc-800 border border-zinc-700 text-white">{isLitVM ? "LitVM" : "Sepolia"}</span>
          <span className="text-green-400">→</span>
          <span className="px-4 py-1.5 rounded-full text-xs font-medium bg-zinc-800 border border-zinc-700 text-white">{isLitVM ? "Sepolia" : "LitVM"}</span>
        </div>

        <div className="mb-3"><div className="text-xs text-zinc-500 mb-2">Token</div>
          <select className="w-full bg-zinc-800/50 border border-zinc-700 rounded-xl px-4 py-3 text-white font-medium outline-none" value={token.symbol} onChange={e => setToken(tokens.find((t:any) => t.symbol === e.target.value) || tokens[0])}>
            {tokens.map((t: any) => <option key={t.symbol}>{t.symbol}</option>)}
          </select>
          <div className="text-xs text-zinc-500 mt-1">Balance: {balance !== undefined ? formatUnits(balance as bigint, token.decimals) : "0"} {token.symbol}</div>
        </div>
        <div className="mb-3"><input className="w-full h-14 bg-zinc-800/30 rounded-xl px-4 text-xl font-semibold text-white outline-none placeholder:text-zinc-600" placeholder="0.0" value={amount} onChange={e => setAmount(e.target.value)} /></div>

        {amount && <div className="text-xs space-y-1 mb-4"><Row l="Fee" v="0.1%" /><Row l="Est. Time" v="~2-5 min" /><Row l="You receive" v={`${(Number(amount) * 0.999).toFixed(6)} ${token.symbol}`} /></div>}

        {insufficient && <div className="text-xs text-red-400 mb-3">Insufficient balance</div>}
        {txHash && <div className="text-xs font-mono text-zinc-500 truncate mb-3">{txHash} {isPending && <span className="text-amber-400">pending...</span>}</div>}

        <button onClick={bridge} disabled={!amount || isPending || insufficient} className="w-full h-12 rounded-xl bg-green-500 text-black font-semibold hover:bg-green-600 disabled:opacity-40">{isPending ? "Bridging..." : `Bridge to ${isLitVM ? "Sepolia" : "LitVM"}`}</button>
      </div>
    </div>
  );
}
function Row({ l, v }: { l: string; v: string }) { return <div className="flex justify-between"><span className="text-zinc-500">{l}</span><span className="text-white">{v}</span></div>; }
function C() { return <div className="flex items-center justify-center min-h-[60vh]"><h2 className="text-xl font-bold text-white">Connect Wallet</h2></div>; }
