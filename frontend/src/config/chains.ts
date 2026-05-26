import { defineChain } from "viem";

export const litvm = defineChain({
  id: 4441,
  name: "LitVM Testnet",
  nativeCurrency: { name: "zkLTC", symbol: "zkLTC", decimals: 18 },
  rpcUrls: { default: { http: ["https://liteforge.rpc.caldera.xyz/http"] } },
});

export const sepolia = defineChain({
  id: 11155111,
  name: "Ethereum Sepolia",
  nativeCurrency: { name: "SepoliaETH", symbol: "ETH", decimals: 18 },
  rpcUrls: { default: { http: ["https://sepolia.drpc.org"] } },
});
