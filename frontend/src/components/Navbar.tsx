"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAccount, useConnect, useDisconnect, useBalance } from "wagmi";
import { injected } from "wagmi/connectors";
import { useState, useEffect, useRef } from "react";
import { formatUnits } from "viem";

const links=[
  {href:"/",label:"Dashboard"},{href:"/swap/",label:"Swap"},{href:"/liquidity/",label:"Liquidity"},
  {href:"/bridge/",label:"Bridge"},{href:"/staking/",label:"Staking"},
];

export default function Navbar(){
  const p=usePathname();
  return <nav className="sticky top-0 z-50 border-b" style={{background:"rgba(2,6,23,0.92)",backdropFilter:"blur(16px)",borderColor:"rgba(255,255,255,0.06)"}}>
    <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
      <div className="flex items-center gap-6">
        <Link href="/" className="flex items-center gap-2.5 no-underline">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold" style={{background:"#22c55e",color:"white"}}>L</div>
          <span className="text-base font-bold text-white">LitVM DeFi</span>
        </Link>
        <div className="hidden md:flex gap-0.5">
          {links.map(l=>{
            const active=p===l.href||(l.href==="/"&&p==="/");
            return <Link key={l.href} href={l.href} className="px-3 py-2 rounded-lg text-sm font-medium no-underline"
              style={{color:active?"white":"#94a3b8",background:active?"rgba(255,255,255,0.06)":"transparent"}}>{l.label}</Link>;
          })}
        </div>
      </div>
      <WalletBtn/>
    </div>
  </nav>;
}

function WalletBtn(){
  const {address,isConnected,chainId}=useAccount();
  const {connect}=useConnect();
  const {disconnect}=useDisconnect();
  const {data:balance}=useBalance({address});
  const [open,setOpen]=useState(false);
  const ref=useRef<HTMLDivElement>(null);
  useEffect(()=>{const h=(e:MouseEvent)=>{if(ref.current&&!ref.current.contains(e.target as Node))setOpen(false)};document.addEventListener("mousedown",h);return ()=>document.removeEventListener("mousedown",h);},[]);

  if(isConnected&&address){
    return <div className="relative" ref={ref}>
      <button onClick={()=>setOpen(!open)} className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium" style={{background:"#0f172a",border:"1px solid rgba(255,255,255,0.08)",color:"white"}}>
        <div className="w-2 h-2 rounded-full" style={{background:"#22c55e"}}/>
        {address.slice(0,6)}...{address.slice(-4)}
        {balance&&<span className="text-xs" style={{color:"#94a3b8"}}>{Number(formatUnits(balance.value,balance.decimals)).toFixed(3)} {balance.symbol}</span>}
      </button>
      {open&&<div className="absolute right-0 top-12 w-56 rounded-xl overflow-hidden z-50" style={{background:"#0f172a",border:"1px solid rgba(255,255,255,0.08)",boxShadow:"0 8px 32px rgba(0,0,0,0.6)"}}>
        <div className="p-3 border-b" style={{borderColor:"rgba(255,255,255,0.06)"}}>
          <div className="text-xs font-mono text-white">{address.slice(0,10)}...{address.slice(-8)}</div>
          <div className="text-xs mt-1" style={{color:"#64748b"}}>Chain: {chainId===4441?"LitVM":"Sepolia"}</div>
        </div>
        <button onClick={()=>{disconnect();setOpen(false)}} className="w-full text-left px-4 py-3 text-sm text-red-400 hover:bg-white/5 transition-colors">Disconnect</button>
      </div>}
    </div>;
  }

  return <div className="relative" ref={ref}>
    <button onClick={()=>setOpen(!open)} className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white" style={{background:"#22c55e"}}>Connect Wallet</button>
    {open&&<div className="absolute right-0 top-12 w-64 rounded-xl overflow-hidden z-50" style={{background:"#0f172a",border:"1px solid rgba(255,255,255,0.08)",boxShadow:"0 8px 32px rgba(0,0,0,0.6)"}}>
      <div className="p-2">
        <button onClick={()=>{connect({connector:injected()});setOpen(false)}} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-white hover:bg-white/5 transition-colors">
          <span className="text-lg">🦊</span> MetaMask
        </button>
      </div>
    </div>}
  </div>;
}
