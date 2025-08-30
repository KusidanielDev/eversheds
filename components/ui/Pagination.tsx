
"use client";
import * as React from "react";
export default function Pagination({ page, pages, onPage }: { page: number; pages: number; onPage: (n:number)=>void }){
  const nums = Array.from({length: pages}, (_,i)=>i+1).slice(0, 15);
  return (
    <nav className="flex items-center gap-1" aria-label="Pagination">
      <button disabled={page<=1} className="px-2 py-1 border rounded disabled:opacity-40" onClick={()=>onPage(page-1)}>Prev</button>
      {nums.map(n => <button key={n} className={"px-2 py-1 border rounded "+(n===page?"bg-[var(--brand-orange)] text-white":"")} onClick={()=>onPage(n)}>{n}</button>)}
      <button disabled={page>=pages} className="px-2 py-1 border rounded disabled:opacity-40" onClick={()=>onPage(page+1)}>Next</button>
    </nav>
  );
}
