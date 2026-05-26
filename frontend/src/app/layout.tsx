"use client";
import { WagmiProvider, createConfig, http } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { defineChain } from "viem";
import Navbar from "@/components/Navbar";
import { LITVM_CHAIN_ID, LITVM_RPC, SEPOLIA_CHAIN_ID, SEPOLIA_RPC } from "@/lib/constants";

const litvm = defineChain({ id: LITVM_CHAIN_ID, name: "LitVM", nativeCurrency: { name: "zkLTC", symbol: "zkLTC", decimals: 18 }, rpcUrls: { default: { http: [LITVM_RPC] } } });
const sepolia = defineChain({ id: SEPOLIA_CHAIN_ID, name: "Sepolia", nativeCurrency: { name: "ETH", symbol: "ETH", decimals: 18 }, rpcUrls: { default: { http: [SEPOLIA_RPC] } } });

const config = createConfig({ chains: [litvm as any, sepolia as any], transports: { [litvm.id]: http(LITVM_RPC), [sepolia.id]: http(SEPOLIA_RPC) }, ssr: false });
const qc = new QueryClient({ defaultOptions: { queries: { retry: 1, refetchOnWindowFocus: false, staleTime: 10_000 } } });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#020617] text-white antialiased" style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
        <WagmiProvider config={config as any}><QueryClientProvider client={qc}><Navbar /><main className="max-w-6xl mx-auto px-4 sm:px-6 pb-24">{children}</main></QueryClientProvider></WagmiProvider>
      </body>
    </html>
  );
}
