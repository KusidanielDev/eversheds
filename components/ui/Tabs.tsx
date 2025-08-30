
"use client";
import * as React from "react";
import { cx, uid } from "@/lib/utils";
export type Tab = { id?: string; label: string; panel: React.ReactNode };
export function Tabs({ tabs, initial=0 }: { tabs: Tab[]; initial?: number }){
  const [idx, setIdx] = React.useState(initial);
  const ids = React.useMemo(()=>tabs.map(t=>t.id||uid("tab")), [tabs]);
  return (
    <div>
      <div role="tablist" className="flex gap-2 border-b">
        {tabs.map((t,i)=>(
          <button key={i} role="tab" id={`tab-${ids[i]}`}
            className={cx("px-3 py-2", i===idx && "border-b-2 border-[var(--brand-orange)] text-[var(--brand-orange)]")}
            aria-selected={i===idx} aria-controls={`panel-${ids[i]}`} onClick={()=>setIdx(i)}>{t.label}</button>
        ))}
      </div>
      {tabs.map((t,i)=>(
        <div key={i} role="tabpanel" id={`panel-${ids[i]}`} aria-labelledby={`tab-${ids[i]}`} hidden={i!==idx} className="py-4">{t.panel}</div>
      ))}
    </div>
  );
}
export default Tabs;
