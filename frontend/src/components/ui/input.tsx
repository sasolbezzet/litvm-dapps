import { cn } from "@/lib/utils";
import { InputHTMLAttributes, forwardRef } from "react";

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(({ className, ...props }, ref) => (
  <input ref={ref} className={cn("flex h-12 w-full rounded-xl border border-zinc-700 bg-zinc-800/50 px-4 text-base text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#22c55e]/50 focus:border-[#22c55e] transition-colors", className)} {...props} />
));
Input.displayName = "Input";

export const Badge = ({ children, variant = "default" }: { children: React.ReactNode; variant?: "default" | "secondary" | "success" }) => {
  const v = { default: "bg-zinc-800 text-zinc-300", secondary: "bg-blue-500/10 text-blue-400", success: "bg-green-500/10 text-green-400" };
  return <span className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold", v[variant])}>{children}</span>;
};
