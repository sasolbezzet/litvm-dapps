import type { Metadata } from "next";
import { Providers } from "./providers";
import Navbar from "@/components/Navbar";
import "./globals.css";

export const metadata: Metadata = { title: "LitVM DeFi", description: "Decentralized exchange on LitVM testnet" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#020617] text-white antialiased" style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
        <Providers>
          <Navbar />
          <main className="max-w-6xl mx-auto px-4 sm:px-6 pb-24">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
