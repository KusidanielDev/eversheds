
"use client";
import * as React from "react";
export default function Tooltip({ text, children }: { text: string; children: React.ReactNode }){
  const [open, setOpen] = React.useState(false);
  return (
    <span className="relative" onMouseEnter={()=>setOpen(true)} onMouseLeave={()=>setOpen(false)}>
      {children}
      {open && <span role="tooltip" className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded">{text}</span>}
    </span>
  );
}
