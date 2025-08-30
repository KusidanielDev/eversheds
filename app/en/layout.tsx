import type { ReactNode } from "react";
import { SiteHeader, SiteFooter } from "@/components";
export default function EnLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <SiteHeader />
      {children}
      <SiteFooter />
    </div>
  );
}
