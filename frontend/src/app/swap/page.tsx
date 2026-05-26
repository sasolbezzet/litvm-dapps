"use client";
import {useState}from"react";
import {useAccount,useReadContract,useWriteContract,useWaitForTransactionReceipt}from"wagmi";
import {parseUnits,formatUnits}from"viem";
import {TOKEN_LIST,ERC20_ABI,ROUTER_ABI,ADDRESSES}from"@/lib/constants";

export default function Swap(){
  const {address,isConnected}=useAccount();
  const[fi,sf]=useState(0);const[ti,st]=useState(1);const[a,sa]=useState("");
  const ft=TOKEN_LIST[fi];const tt=TOKEN_LIST[ti];const pa=a?parseUnits(a,ft.decimals):0n;
  const{data:out}=useReadContract({address:ADDRESSES.litvm.router as `0x${string}`,abi:ROUTER_ABI,functionName:"getAmountsOut"as never,args:pa>0n?[pa,[ft.address,tt.address]]:undefined,query:{enabled:pa>0n}});
  const{wc,data:tx,ip}=useWriteContract();const{il:w}=useWaitForTransactionReceipt({hash:tx});
  const{data:al}=useReadContract({address:ft.address as `0x${string}`,abi:ERC20_ABI,functionName:"allowance",args:address?[address,ADDRESSES.litvm.router]:undefined,query:{enabled:!!address}});
  const na=al!==undefined&&pa>0n&&(al as bigint)<pa;const{wc:ap,ip:apg}=useWriteContract();
  if(!isConnected)return<C title="Swap"/>;

  return <div className="mt-10 max-w-[460px] mx-auto af"><h1 className="text-2xl font-bold mb-6 text-white">Swap</h1>
    <div className="p-6 rounded-2xl" style={{background:"#0f172a",border:"1px solid rgba(255,255,255,0.06)"}}>
      <F l="You pay" v={a} s={sa} i={fi} si={sf}/>
      <div className="flex justify-center -my-2 z-10 relative"><button className="w-9 h-9 rounded-xl flex items-center justify-center text-lg" style={{background:"#1e293b",border:"1px solid rgba(255,255,255,0.08)"}} onClick={()=>{sf(ti);st(fi)}}>↓</button></div>
      <F l="You receive" v={out?Number(formatUnits((out as bigint[])[1],tt.decimals)).toFixed(6):"0"} s={()=>{}} i={ti} si={st}/>
      {tx&&<div className="mt-4 text-xs font-mono truncate" style={{color:"#64748b"}}>{tx}{w&&<span style={{color:"#f59e0b"}}> pending...</span>}</div>}
      {na?<button className="w-full mt-5 py-3.5 rounded-full text-white font-semibold text-sm" style={{background:"#22c55e"}} disabled={apg} onClick={()=>ap({address:ft.address as `0x${string}`,abi:ERC20_ABI,functionName:"approve",args:[ADDRESSES.litvm.router,pa]})}>{apg?"Approving...":`Approve ${ft.symbol}`}</button>
      :<button className="w-full mt-5 py-3.5 rounded-full text-white font-semibold text-sm" style={{background:"#22c55e"}} disabled={!a||ip||w} onClick={()=>{const o=out?(out as bigint[])[1]:0n;wc({address:ADDRESSES.litvm.router as `0x${string}`,abi:ROUTER_ABI,functionName:"swapExactTokensForTokens",args:[pa,o*995n/1000n,[ft.address,tt.address],address,BigInt(Math.floor(Date.now()/1000)+1200)]})}}>{ip||w?"Swapping...":"Swap"}</button>}
    </div>
  </div>;
}

function F({l,v,s,i,si}:{l:string;v:string;s:(v:string)=>void;i:number;si:(v:number)=>void}){
  return <div className="mb-1"><div className="text-xs font-semibold tracking-wider uppercase mb-2" style={{color:"#64748b"}}>{l}</div>
    <div className="flex gap-3">
      {l==="You receive"?<div className="flex-1 bg-[#020617] border border-[rgba(255,255,255,0.08)] rounded-xl px-4 py-3 text-white text-2xl font-semibold flex items-center">{v}</div>
      :<input className="flex-1 bg-[#020617] border border-[rgba(255,255,255,0.08)] rounded-xl px-4 py-3 text-white text-2xl font-semibold outline-none" placeholder="0" value={v} onChange={e=>s(e.target.value)}/>}
      <select className="bg-[#020617] border border-[rgba(255,255,255,0.08)] rounded-xl px-4 py-3 text-white font-semibold outline-none cursor-pointer min-w-[120px]" value={i} onChange={e=>si(Number(e.target.value))}>{TOKEN_LIST.map((t,k)=><option key={t.symbol} value={k}>{t.symbol}</option>)}</select>
    </div></div>;
}

function C({title}:{title:string}){return <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3 af"><h2 className="text-xl font-bold text-white">Connect Wallet</h2><p className="text-sm" style={{color:"#94a3b8"}}>Connect to use {title}</p></div>;}
