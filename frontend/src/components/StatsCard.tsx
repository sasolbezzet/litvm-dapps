import { cn } from "@/lib/utils";

export function StatsCard({ label, value, sub, className }: { label: string; value: string; sub: string; className?: string }) {
  return (
    <div className={cn("rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4", className)}>
      <div className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-2">{label}</div>
      <div className="text-2xl font-bold text-white mb-1">{value}</div>
      <div className="text-xs text-zinc-600">{sub}</div>
    </div>
  );
}

export function TokenSelector({ tokens, selected, onSelect }: {
  tokens: { symbol: string; address: string; decimals: number; price?: number }[];
  selected: { symbol: string };
  onSelect: (t: any) => void;
}) {
  return (
    <select className="bg-zinc-800/50 border border-zinc-700 rounded-xl px-3 py-2.5 text-white font-semibold text-sm outline-none cursor-pointer hover:border-zinc-600"
      value={selected.symbol} onChange={e => onSelect(tokens.find(t => t.symbol === e.target.value) || tokens[0])}>
      {tokens.map(t => <option key={t.symbol} value={t.symbol}>{t.symbol}</option>)}
    </select>
  );
}
