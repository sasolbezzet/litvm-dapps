"use client";

import { useState } from "react";
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { parseUnits } from "viem";
import { TOKEN_LIST, ROUTER_ABI, ADDRESSES } from "@/lib/constants";

export default function Liquidity() {
  const { address } = useAccount();
  const [tA, setTA] = useState(0);
  const [tB, setTB] = useState(1);
  const [amtA, setAmtA] = useState("");
  const [amtB, setAmtB] = useState("");
  const [mode, setMode] = useState<"add" | "remove">("add");

  const { writeContract, data: txHash, isPending } = useWriteContract();
  const { isLoading: waiting } = useWaitForTransactionReceipt({ hash: txHash });

  if (!address)
    return <CenterMsg msg="Connect Wallet" sub="Connect to provide liquidity" />;

  const tokA = TOKEN_LIST[tA];
  const tokB = TOKEN_LIST[tB];

  return (
    <div className="mt-10 max-w-[460px] mx-auto animate-fade-in">
      <h1 className="text-2xl font-bold mb-6" style={{ fontFamily: "var(--font-brand)" }}>Liquidity</h1>
      <div className="glass-card p-6">
        <div className="segment mb-6">
          {["add", "remove"].map((m) => (
            <button key={m} className={`segment-btn${mode === m ? " active" : ""}`} onClick={() => setMode(m as "add" | "remove")}>
              {m === "add" ? "Add" : "Remove"}
            </button>
          ))}
        </div>

        {mode === "add" ? (
          <>
            <Field label="Token A" amount={amtA} setAmount={setAmtA} idx={tA} setIdx={setTA} />
            <div className="flex justify-center -my-2 relative z-10">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm" style={{ background: "var(--bg-surface)", border: "1px solid var(--border-default)" }}>+</div>
            </div>
            <Field label="Token B" amount={amtB} setAmount={setAmtB} idx={tB} setIdx={setTB} />
            {txHash && <TxBadge hash={txHash} waiting={waiting} />}
            <button className="btn btn-primary btn-lg w-full mt-3" disabled={!amtA || !amtB || isPending || waiting}
              onClick={() => writeContract({
                address: ADDRESSES.litvm.router as `0x${string}`, abi: ROUTER_ABI, functionName: "addLiquidity",
                args: [tokA.address, tokB.address, parseUnits(amtA, tokA.decimals), parseUnits(amtB, tokB.decimals), 0n, 0n, address, BigInt(Math.floor(Date.now() / 1000) + 1200)],
              })}>
              {isPending || waiting ? "Adding..." : "Add Liquidity"}
            </button>
          </>
        ) : (
          <div className="text-center py-16" style={{ color: "var(--text-secondary)" }}>
            <div className="text-4xl mb-4">🛠</div>
            <p className="text-sm">Remove liquidity via direct contract call</p>
          </div>
        )}
      </div>
    </div>
  );
}

function Field({ label, amount, setAmount, idx, setIdx }: { label: string; amount: string; setAmount: (v: string) => void; idx: number; setIdx: (v: number) => void }) {
  return (
    <div className="mb-2">
      <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-tertiary)" }}>{label}</span>
      <div className="flex gap-3 mt-1.5">
        <input className="input" placeholder="0" value={amount} onChange={(e) => setAmount(e.target.value)} />
        <select className="select" style={{ width: 140 }} value={idx} onChange={(e) => setIdx(Number(e.target.value))}>
          {TOKEN_LIST.map((t, i) => <option key={t.symbol} value={i}>{t.symbol}</option>)}
        </select>
      </div>
    </div>
  );
}

function CenterMsg({ msg, sub }: { msg: string; sub: string }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3 animate-fade-in">
      <h2 className="text-2xl font-bold" style={{ fontFamily: "var(--font-brand)" }}>{msg}</h2>
      <p style={{ color: "var(--text-secondary)" }}>{sub}</p>
    </div>
  );
}

function TxBadge({ hash, waiting }: { hash?: `0x${string}`; waiting: boolean }) {
  return (
    <div className="mt-3 text-xs font-mono truncate" style={{ color: "var(--text-tertiary)" }}>
      {hash} {waiting && <span style={{ color: "var(--accent-amber)" }}>(pending)</span>}
    </div>
  );
}
