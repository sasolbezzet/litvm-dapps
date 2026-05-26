"use client";

import "@rainbow-me/rainbowkit/styles.css";
import { RainbowKitProvider, getDefaultConfig, darkTheme } from "@rainbow-me/rainbowkit";
import { WagmiProvider, http } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { defineChain } from "viem";
import Navbar from "@/components/Navbar";
import { LITVM_CHAIN_ID, LITVM_RPC, SEPOLIA_CHAIN_ID, SEPOLIA_RPC } from "@/lib/constants";

const litvm = defineChain({
  id: LITVM_CHAIN_ID, name: "LitVM",
  nativeCurrency: { name: "zkLTC", symbol: "zkLTC", decimals: 18 },
  rpcUrls: { default: { http: [LITVM_RPC] } },
});

const sepolia = defineChain({
  id: SEPOLIA_CHAIN_ID, name: "Sepolia",
  nativeCurrency: { name: "ETH", symbol: "ETH", decimals: 18 },
  rpcUrls: { default: { http: [SEPOLIA_RPC] } },
});

const config = getDefaultConfig({
  appName: "LitVM DeFi", projectId: "litvm-defi",
  chains: [litvm, sepolia],
  transports: { [litvm.id]: http(), [sepolia.id]: http() },
});

const queryClient = new QueryClient();

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ background: "var(--bg-deep)", color: "var(--text-primary)" }}>
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            <RainbowKitProvider theme={darkTheme({ accentColor: "#22C55E", borderRadius: "large" })}>
              <Navbar />
              <main className="max-w-6xl mx-auto px-4 sm:px-6 pb-24">{children}</main>
            </RainbowKitProvider>
          </QueryClientProvider>
        </WagmiProvider>
      </body>
    </html>
  );
}
