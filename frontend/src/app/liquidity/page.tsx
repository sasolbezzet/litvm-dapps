"use client";
import {useState}from"react";import {useAccount,useWriteContract,useWaitForTransactionReceipt}from"wagmi";import {parseUnits}from"viem";import {TOKEN_LIST,ROUTER_ABI,ADDRESSES}from"@/lib/constants";

export default function Liquidity(){
  const{address,isConnected}=useAccount();const[ta,sa]=useState(0);const[tb,sb]=useState(1);const[aa,saa]=useState("");const[ab,sab]=useState("");const[m,sm]=useState<"add"|"remove">("add");
  const{wc,data:tx,ip}=useWriteContract();const{il:w}=useWaitForTransactionReceipt({hash:tx});
  if(!isConnected)return<C t="Liquidity"/>;

  return <div className="mt-10 max-w-[460px] mx-auto af"><h1 className="text-2xl font-bold mb-6 text-white">Liquidity</h1>
    <div className="p-6 rounded-2xl" style={{background:"#0f172a",border:"1px solid rgba(255,255,255,0.06)"}}>
      <div className="flex rounded-full p-1 mb-6" style={{background:"#020617"}}>
        {(["add","remove"]as const).map(x=><button key={x} className="flex-1 py-2.5 rounded-full text-xs font-semibold transition-all capitalize" style={{background:m===x?"#22c55e":"transparent",color:m===x?"white":"#94a3b8"}} onClick={()=>sm(x)}>{x}</button>)}
      </div>
      {m==="add"?<>
        <div className="mb-2"><div className="text-xs font-semibold tracking-wider uppercase mb-1.5" style={{color:"#64748b"}}>Token A</div><div className="flex gap-3"><input className="flex-1 bg-[#020617] border border-[rgba(255,255,255,0.08)] rounded-xl px-4 py-3 text-white font-semibold outline-none" placeholder="0" value={aa} onChange={e=>saa(e.target.value)}/><select className="bg-[#020617] border border-[rgba(255,255,255,0.08)] rounded-xl px-4 py-3 text-white font-semibold outline-none cursor-pointer min-w-[120px]" value={ta} onChange={e=>sa(Number(e.target.value))}>{TOKEN_LIST.map((t,i)=><option key={t.symbol} value={i}>{t.symbol}</option>)}</select></div></div>
        <div className="flex justify-center -my-2 z-10 relative"><div className="w-7 h-7 rounded-lg flex items-center justify-center text-xs" style={{background:"#1e293b",border:"1px solid rgba(255,255,255,0.08)"}}>+</div></div>
        <div className="mb-2"><div className="text-xs font-semibold tracking-wider uppercase mb-1.5" style={{color:"#64748b"}}>Token B</div><div className="flex gap-3"><input className="flex-1 bg-[#020617] border border-[rgba(255,255,255,0.08)] rounded-xl px-4 py-3 text-white font-semibold outline-none" placeholder="0" value={ab} onChange={e=>sab(e.target.value)}/><select className="bg-[#020617] border border-[rgba(255,255,255,0.08)] rounded-xl px-4 py-3 text-white font-semibold outline-none cursor-pointer min-w-[120px]" value={tb} onChange={e=>sb(Number(e.target.value))}>{TOKEN_LIST.map((t,i)=><option key={t.symbol} value={i}>{t.symbol}</option>)}</select></div></div>
        {tx&&<div className="mt-3 text-xs font-mono truncate" style={{color:"#64748b"}}>{tx}{w&&<span style={{color:"#f59e0b"}}> pending...</span>}</div>}
        <button className="w-full mt-4 py-3.5 rounded-full text-white font-semibold text-sm" style={{background:"#22c55e"}} disabled={!aa||!ab||ip||w}
          onClick={()=>{const tA=TOKEN_LIST[ta];const tB=TOKEN_LIST[tb];wc({address:ADDRESSES.litvm.router as `0x${string}`,abi:ROUTER_ABI,functionName:"addLiquidity",args:[tA.address,tB.address,parseUnits(aa,tA.decimals),parseUnits(ab,tB.decimals),0n,0n,address,BigInt(Math.floor(Date.now()/1000)+1200)]})}}>
          {ip||w?"Adding...":"Add Liquidity"}</button>
      </>:<div className="text-center py-16" style={{color:"#64748b"}}>Remove liquidity via direct contract interaction</div>}
    </div>
  </div>;
}
function C({t}:{t:string}){return <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3 af"><h2 className="text-xl font-bold text-white">Connect Wallet</h2><p className="text-sm" style={{color:"#94a3b8"}}>Connect to provide {t.toLowerCase()}</p></div>;}
