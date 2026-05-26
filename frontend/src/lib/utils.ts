import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
export function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)); }
export function shorten(addr: string) { return addr.slice(0, 6) + "..." + addr.slice(-4); }
export function fmtUnits(v: bigint | undefined, d: number, fix = 4) { if (!v) return "0"; return Number(Number(v) / 10 ** d).toFixed(fix); }
