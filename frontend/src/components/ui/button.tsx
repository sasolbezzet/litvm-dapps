import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { forwardRef, ButtonHTMLAttributes } from "react";

const btn = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#020617] disabled:opacity-40 disabled:pointer-events-none", {
  variants: {
    variant: { default: "bg-[#22c55e] text-white hover:brightness-110", destructive: "bg-red-600 text-white", outline: "border border-zinc-700 bg-transparent hover:bg-zinc-800 text-zinc-300", ghost: "hover:bg-zinc-800 text-zinc-300", secondary: "bg-zinc-800 text-zinc-200 hover:bg-zinc-700" },
    size: { default: "h-11 px-5 py-2", sm: "h-9 px-3 text-xs", lg: "h-12 px-8 text-base", icon: "h-10 w-10" },
  },
  defaultVariants: { variant: "default", size: "default" },
});

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof btn> {}
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, ...props }, ref) => (
  <button className={cn(btn({ variant, size, className }))} ref={ref} {...props} />
));
Button.displayName = "Button";
