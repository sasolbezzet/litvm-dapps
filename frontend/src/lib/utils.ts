import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
export function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)); }
export function shorten(addr: string, l = 4) { return addr.slice(0, l + 2) + "..." + addr.slice(-l); }
export function fmtUnits(v: bigint | undefined, d: number, fix = 4) { if (!v) return "0.0000"; return (Number(v) / 10 ** d).toFixed(fix); }
export function fmtUSD(v: bigint | undefined, d: number, price: number) { if (!v) return "$0.00"; return "$" + (Number(v) / 10 ** d * price).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }); }
export const DEADLINE = () => BigInt(Math.floor(Date.now() / 1000) + 1200);
