"use client";
import { useState } from "react";
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { parseUnits, formatUnits } from "viem";
import { TOKEN_LIST, ERC20_ABI, ROUTER_ABI, FACTORY_ABI, PAIR_ABI, ADDRESSES } from "@/lib/constants";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TokenSelector } from "@/components/TokenSelector";

const PAIRS = [[0, 1], [0, 3], [1, 3]] as const; // USDC/USDT, USDC/WETH, USDT/WETH

export default function Liquidity() {
  const { address, isConnected } = useAccount();
  const [pairIdx, setPairIdx] = useState(0);
  const [aA, sAA] = useState(""); const [aB, sAB] = useState("");
  const [mode, setMode] = useState<"add" | "remove">("add");

  const tA = TOKEN_LIST[PAIRS[pairIdx][0]]; const tB = TOKEN_LIST[PAIRS[pairIdx][1]];
  const { data: pAddr } = useReadContract({ address: ADDRESSES.litvm.factory as `0x${string}`, abi: FACTORY_ABI, functionName: "getPair", args: [tA.address, tB.address] });
  const { data: reserves } = useReadContract({ address: pAddr as `0x${string}`, abi: PAIR_ABI, functionName: "getReserves", query: { enabled: !!pAddr && pAddr !== "0x0000000000000000000000000000000000000000" } });

  const { data: lpBal } = useReadContract({ address: pAddr as `0x${string}`, abi: ERC20_ABI, functionName: "balanceOf", args: address ? [address] : undefined, query: { enabled: !!address && !!pAddr && pAddr !== "0x0000000000000000000000000000000000000000" } });
  const { data: lpTotal } = useReadContract({ address: pAddr as `0x${string}`, abi: ["function totalSupply() view returns (uint256)"], functionName: "totalSupply", query: { enabled: !!pAddr && pAddr !== "0x0000000000000000000000000000000000000000" } });

  const { writeContract, data: txHash, isPending } = useWriteContract();
  const { isLoading: waiting } = useWaitForTransactionReceipt({ hash: txHash });
  if (!isConnected) return <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3"><h2 className="text-xl font-bold">Connect Wallet</h2></div>;

  const share = lpBal && lpTotal && (lpTotal as bigint) > 0n ? Number((lpBal as bigint) * 10000n / (lpTotal as bigint)) / 100 : 0;

  return (
    <div className="mt-10 max-w-[520px] mx-auto">
      <h1 className="text-2xl font-bold mb-6">Liquidity</h1>
      <Card className="p-6">
        {/* Mode tabs */}
        <div className="flex bg-zinc-800/50 rounded-xl p-1 mb-6">
          {["add", "remove"].map(m => (
            <button key={m} onClick={() => setMode(m as typeof mode)} className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${mode === m ? "bg-green-500 text-black" : "text-zinc-400"}`}>{m === "add" ? "Add" : "Remove"}</button>
          ))}
        </div>

        {/* Pair selector */}
        <div className="mb-4">
          <div className="text-xs text-zinc-500 mb-2">Select Pair</div>
          <select className="w-full bg-zinc-800/50 border border-zinc-700 rounded-xl px-4 py-3 text-white font-medium outline-none" value={pairIdx} onChange={e => setPairIdx(Number(e.target.value))}>
            {PAIRS.map((p, i) => <option key={i} value={i}>{TOKEN_LIST[p[0]].symbol}/{TOKEN_LIST[p[1]].symbol}</option>)}
          </select>
        </div>

        {reserves && (
          <div className="text-xs text-zinc-500 mb-4">
            Pool: {Number(formatUnits((reserves as [bigint, bigint])[0], tA.decimals)).toFixed(2)} {tA.symbol} / {Number(formatUnits((reserves as [bigint, bigint])[1], tB.decimals)).toFixed(2)} {tB.symbol}
          </div>
        )}

        {mode === "add" ? (
          <>
            <div className="mb-2"><Input placeholder="0.0" value={aA} onChange={e => sAA(e.target.value)} /></div>
            <div className="flex justify-center py-1"><div className="w-7 h-7 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center text-xs">+</div></div>
            <div className="mb-4"><Input placeholder="0.0" value={aB} onChange={e => sAB(e.target.value)} /></div>
            {aA && aB && <div className="text-xs text-zinc-500 mb-3">Share of pool: ~{reserves ? (Number(aA) / (Number(formatUnits((reserves as [bigint, bigint])[0], tA.decimals)) + Number(aA)) * 100).toFixed(2) : "—"}%</div>}
            {txHash && <div className="text-xs font-mono text-zinc-500 truncate mb-3">{txHash} {waiting && <span className="text-amber-400">(pending)</span>}</div>}
            <Button className="w-full" disabled={!aA || !aB || isPending} onClick={() => writeContract({
              address: ADDRESSES.litvm.router as `0x${string}`, abi: ROUTER_ABI, functionName: "addLiquidity",
              args: [tA.address, tB.address, parseUnits(aA, tA.decimals), parseUnits(aB, tB.decimals), 0n, 0n, address, BigInt(Math.floor(Date.now() / 1000) + 1200)],
            })}>{isPending ? "Adding..." : "Add Liquidity"}</Button>
          </>
        ) : (
          <div className="text-center py-8">
            {lpBal && (lpBal as bigint) > 0n ? (
              <div>
                <p className="text-sm text-zinc-400 mb-3">Your LP: {formatUnits(lpBal as bigint, 18)} ({share}% of pool)</p>
                <Button variant="outline" className="w-full" onClick={() => {
                  writeContract({ address: ADDRESSES.litvm.router as `0x${string}`, abi: ROUTER_ABI, functionName: "removeLiquidity", args: [tA.address, tB.address, (lpBal as bigint) / 2n, 0n, 0n, address, BigInt(Math.floor(Date.now() / 1000) + 1200)] });
                }}>Remove 50%</Button>
              </div>
            ) : <p className="text-zinc-500 text-sm">No liquidity position</p>}
          </div>
        )}
      </Card>
    </div>
  );
}
