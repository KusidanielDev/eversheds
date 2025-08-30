
"use client";
import * as React from "react";
import { uid, cx } from "@/lib/utils";
type Item = { id?: string; title: string; content: React.ReactNode };
export function Accordion({ items, allowMultiple=false }: { items: Item[]; allowMultiple?: boolean }){
  const [open, setOpen] = React.useState<string[]>([]);
  const toggle = (id:string) => setOpen(v => {
    const has = v.includes(id);
    if (allowMultiple) return has ? v.filter(x=>x!==id) : [...v, id];
    return has ? [] : [id];
  });
  return (
    <div className="divide-y">
      {items.map((it, idx) => {
        const id = it.id || uid("acc");
        const expanded = open.includes(id);
        return (
          <div key={idx} className="py-2">
            <button
              className={cx("w-full text-left py-2 font-semibold", expanded && "text-[var(--brand-orange)]")}
              aria-expanded={expanded}
              aria-controls={id}
              onClick={()=>toggle(id)}
            >
              {it.title}
            </button>
            <div id={id} hidden={!expanded} className="pt-2 text-slate-700">{it.content}</div>
          </div>
        );
      })}
    </div>
  );
}
export default Accordion;
