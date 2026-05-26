"use client";
import { useState } from "react";
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { parseUnits, formatUnits } from "viem";
import { TOKEN_LIST, ERC20_ABI, ROUTER_ABI, ADDRESSES } from "@/lib/constants";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TokenSelector } from "@/components/TokenSelector";

export default function Swap() {
  const { address, isConnected } = useAccount();
  const [from, setFrom] = useState(TOKEN_LIST[0]);
  const [to, setTo] = useState(TOKEN_LIST[1]);
  const [amount, setAmount] = useState("");
  const [slippage, setSlippage] = useState(0.5);

  const parsed = amount ? parseUnits(amount, from.decimals) : 0n;
  const { data: outRaw } = useReadContract({ address: ADDRESSES.litvm.router as `0x${string}`, abi: ROUTER_ABI, functionName: "getAmountsOut" as never, args: parsed > 0n ? [parsed, [from.address, to.address]] : undefined, query: { enabled: parsed > 0n && ADDRESSES.litvm.router !== "0x0000000000000000000000000000000000000000" } });
  const { writeContract, data: txHash, isPending } = useWriteContract();
  const { isLoading: waiting } = useWaitForTransactionReceipt({ hash: txHash });
  const { data: allowance } = useReadContract({ address: from.address as `0x${string}`, abi: ERC20_ABI, functionName: "allowance", args: address ? [address, ADDRESSES.litvm.router] : undefined, query: { enabled: !!address } });
  const needApprove = allowance !== undefined && parsed > 0n && (allowance as bigint) < parsed;
  const { writeContract: approve, isPending: approving } = useWriteContract();

  const outAmount = outRaw ? (outRaw as bigint[])[1] : 0n;

  if (!isConnected) return <ConnectScreen />;

  return (
    <div className="mt-10 max-w-[480px] mx-auto">
      <h1 className="text-2xl font-bold mb-6">Swap</h1>
      <Card className="p-6 space-y-1">
        {/* From */}
        <div>
          <div className="text-xs text-zinc-500 mb-2">You pay</div>
          <div className="flex gap-3 items-end">
            <div className="flex-1">
              <Input className="text-2xl font-semibold h-16 border-0 bg-zinc-800/30" placeholder="0.0" value={amount} onChange={e => setAmount(e.target.value)} />
            </div>
            <TokenSelector tokens={TOKEN_LIST} selected={from} onSelect={setFrom} />
          </div>
        </div>

        <div className="flex justify-center py-1">
          <button onClick={() => { const f = from; setFrom(to); setTo(f); }} className="w-9 h-9 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center hover:bg-zinc-700 transition-colors text-lg">↓</button>
        </div>

        {/* To */}
        <div>
          <div className="text-xs text-zinc-500 mb-2">You receive</div>
          <div className="flex gap-3 items-end">
            <div className="flex-1 h-16 bg-zinc-800/30 rounded-xl px-4 flex items-center text-2xl font-semibold text-zinc-400">
              {outAmount > 0n ? Number(formatUnits(outAmount, to.decimals)).toFixed(6) : "0.0"}
            </div>
            <TokenSelector tokens={TOKEN_LIST} selected={to} onSelect={setTo} />
          </div>
        </div>

        {/* Price impact + minimum received */}
        {outAmount > 0n && (
          <div className="pt-3 space-y-1.5 text-xs">
            <div className="flex justify-between"><span className="text-zinc-500">Price</span><span>1 {from.symbol} = {outAmount > 0n ? (Number(formatUnits(outAmount, to.decimals)) / Number(amount || "1")).toFixed(6) : "—"} {to.symbol}</span></div>
            <div className="flex justify-between"><span className="text-zinc-500">Slippage</span>
              <div className="flex gap-1">
                {[0.1, 0.5, 1].map(s => (
                  <button key={s} onClick={() => setSlippage(s)} className={`px-2 py-0.5 rounded text-xs font-medium ${slippage === s ? "bg-green-500/20 text-green-400" : "text-zinc-500 hover:text-zinc-300"}`}>{s}%</button>
                ))}
              </div>
            </div>
            <div className="flex justify-between"><span className="text-zinc-500">Min received</span><span>{outAmount > 0n ? Number(formatUnits(outAmount * 995n / 1000n, to.decimals)).toFixed(6) : "0"} {to.symbol}</span></div>
          </div>
        )}

        {txHash && <div className="pt-2 text-xs font-mono text-zinc-500 truncate">{txHash} {waiting && <span className="text-amber-400">(pending)</span>}</div>}

        {needApprove ? (
          <Button className="w-full h-12 mt-3" disabled={approving} onClick={() => approve({ address: from.address as `0x${string}`, abi: ERC20_ABI, functionName: "approve", args: [ADDRESSES.litvm.router, parsed] })}>
            {approving ? "Approving..." : `Approve ${from.symbol}`}
          </Button>
        ) : (
          <Button className="w-full h-12 mt-3" disabled={!amount || isPending || waiting} onClick={() => {
            writeContract({ address: ADDRESSES.litvm.router as `0x${string}`, abi: ROUTER_ABI, functionName: "swapExactTokensForTokens", args: [parsed, outAmount * BigInt(Math.floor((1 - slippage / 100) * 1000)) / 1000n, [from.address, to.address], address, BigInt(Math.floor(Date.now() / 1000) + 1200)] });
          }}>{isPending || waiting ? "Swapping..." : "Swap"}</Button>
        )}
      </Card>
    </div>
  );
}

function ConnectScreen() {
  return <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3"><h2 className="text-xl font-bold">Connect Wallet</h2><p className="text-zinc-500 text-sm">Connect to start swapping tokens</p></div>;
}
