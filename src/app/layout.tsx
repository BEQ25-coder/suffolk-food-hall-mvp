import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Suffolk Food Hall",
  description: "Discover events, shop highlights, loyalty rewards and dining at Suffolk Food Hall.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
