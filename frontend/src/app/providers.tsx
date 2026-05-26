"use client";
import { WagmiProvider, createConfig, http } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { litvm, sepolia } from "@/config/chains";

const config = createConfig({
  chains: [litvm as any, sepolia as any],
  transports: { [litvm.id]: http(), [sepolia.id]: http() },
  ssr: false,
});
const qc = new QueryClient({ defaultOptions: { queries: { retry: 1, refetchOnWindowFocus: false, staleTime: 10_000 } } });

export function Providers({ children }: { children: React.ReactNode }) {
  return <WagmiProvider config={config as any}><QueryClientProvider client={qc}>{children}</QueryClientProvider></WagmiProvider>;
}
