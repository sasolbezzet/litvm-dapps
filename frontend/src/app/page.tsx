"use client";
import { useAccount, useReadContract, useBalance } from "wagmi";
import { formatUnits } from "viem";
import Link from "next/link";
import { TOKEN_LIST, ERC20_ABI, FACTORY_ABI, ADDRESSES } from "@/lib/constants";

const feats=[{l:"Swap",h:"/swap/",d:"Trade tokens across 4 pools",c:"#3b82f6"},{l:"Liquidity",h:"/liquidity/",d:"Deposit pairs earn 0.3% fees",c:"#22c55e"},{l:"Bridge",h:"/bridge/",d:"Transfer LitVM↔Sepolia",c:"#8b5cf6"},{l:"Staking",h:"/staking/",d:"Stake LP earn USDC",c:"#f59e0b"}];

export default function Dashboard(){
  const {address,isConnected,chainId}=useAccount();
  const {data:native}=useBalance({address:address as `0x${string}`,query:{enabled:isConnected}});
  const {data:pc}=useReadContract({address:ADDRESSES.litvm.factory as `0x${string}`,abi:FACTORY_ABI,functionName:"allPairsLength",query:{enabled:!!ADDRESSES.litvm.factory}});
  const pairs=pc?Number(pc):0;

  return <div className="mt-10 af">
    {isConnected&&address?<>
      <div className="mb-10"><h1 className="text-3xl font-bold text-white mb-1">Portfolio</h1><p className="text-sm" style={{color:"#94a3b8"}}>{chainId===4441?"LitVM":"Sepolia"} · {address.slice(0,6)}...{address.slice(-4)}</p></div>
      <div className="mb-10 p-8 rounded-2xl" style={{background:"#0f172a",border:"1px solid rgba(255,255,255,0.06)"}}>
        <div className="text-xs font-semibold tracking-widest uppercase mb-4" style={{color:"#64748b"}}>Balance</div>
        <div className="text-5xl font-bold text-white mb-2">{native?Number(formatUnits(native.value,native.decimals)).toFixed(4):"0.0000"}</div>
        <div className="text-sm" style={{color:"#94a3b8"}}>{native?.symbol??"zkLTC"}</div>
        <div className="grid grid-cols-4 gap-6 mt-8">
          {TOKEN_LIST.map(t=><TokenBal key={t.symbol} token={t} address={address}/>)}
        </div>
      </div>
    </>:<div className="mb-12"><h1 className="text-4xl font-bold text-white mb-3">LitVM DeFi</h1><p className="text-base max-w-xl" style={{color:"#94a3b8"}}>Decentralised exchange and bridge on LitVM testnet.</p></div>}
    {pairs>0&&<div className="text-xs font-semibold tracking-widest uppercase mb-3" style={{color:"#64748b"}}>{pairs} Pool{pairs!==1?"s":""} Active</div>}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {feats.map(f=><Link key={f.l} href={f.h} className="group flex items-start gap-4 p-5 rounded-xl no-underline" style={{background:"#0f172a",border:"1px solid rgba(255,255,255,0.06)"}}>
        <div className="mt-0.5 w-2.5 h-2.5 rounded-full flex-shrink-0" style={{background:f.c}}/><div><div className="text-sm font-semibold text-white mb-1">{f.l}</div><div className="text-xs" style={{color:"#94a3b8"}}>{f.d}</div></div>
      </Link>)}
    </div>
  </div>;
}

function TokenBal({token,address}:{token:typeof TOKEN_LIST[0];address:string}){
  const {data}=useReadContract({address:token.address as `0x${string}`,abi:ERC20_ABI,functionName:"balanceOf",args:[address],query:{enabled:!!address}});
  const bal=data?formatUnits(data as bigint,token.decimals):"0";
  return <div className="text-center"><div className="text-xl font-semibold text-white">{Number(bal).toFixed(2)}</div><div className="text-xs mt-1 font-medium" style={{color:"#64748b"}}>{token.symbol}</div></div>;
}
