import type { ComponentType, ReactNode } from "react";
import { AlertCircle, Info, LoaderCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type StatusVariant = "loading" | "error" | "empty";

const variantStyles: Record<StatusVariant, string> = {
  loading: "border-[#ece4d7] bg-[#fffdf8] text-bark/70",
  error: "border-red-200 bg-red-50 text-red-800",
  empty: "border-[#ece4d7] bg-[#fffdf8] text-bark/70",
};

const variantIcons = {
  loading: LoaderCircle,
  error: AlertCircle,
  empty: Info,
} satisfies Record<StatusVariant, ComponentType<{ className?: string }>>;

export function StatusMessage({
  variant,
  children,
  className,
}: {
  variant: StatusVariant;
  children: ReactNode;
  className?: string;
}) {
  const Icon = variantIcons[variant];

  return (
    <div
      className={cn(
        "flex items-start gap-3 rounded-2xl border border-[#eee] p-4 text-sm leading-6 shadow-sm",
        variantStyles[variant],
        className
      )}
      role={variant === "error" ? "alert" : "status"}
      aria-live={variant === "error" ? "assertive" : "polite"}
    >
      <Icon className={cn("mt-0.5 h-4 w-4 shrink-0", variant === "loading" ? "animate-spin" : "")} />
      <div>{children}</div>
    </div>
  );
}
