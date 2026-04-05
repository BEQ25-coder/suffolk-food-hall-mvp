import type { ReactNode } from "react";
import { BottomNav } from "@/components/BottomNav";
import { Header } from "@/components/Header";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-md flex-col bg-transparent">
      <Header />
      <main className="flex-1 space-y-5 px-4 pb-24 pt-4">{children}</main>
      <BottomNav />
    </div>
  );
}
