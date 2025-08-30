
"use client";
import * as React from "react";
import { useFocusTrap } from "@/hooks/useFocusTrap";
export default function Dialog({ open, onClose, children }: { open: boolean; onClose: ()=>void; children: React.ReactNode }){
  const trap = useFocusTrap<HTMLDivElement>(onClose);
  if(!open) return null;
  return (
    <div className="fixed inset-0 z-[100]" role="dialog" aria-modal="true" onClick={onClose}>
      <div ref={trap} className="panel max-w-2xl mx-auto mt-24 p-6 rounded" onClick={e=>e.stopPropagation()}>
        <button className="absolute top-2 right-3" onClick={onClose} aria-label="Close">×</button>
        {children}
      </div>
    </div>
  );
}
