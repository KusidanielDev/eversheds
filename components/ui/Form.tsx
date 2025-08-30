
"use client";
import * as React from "react";
type Field = { name: string; label: string; type?: string; required?: boolean };
export function SimpleForm({ fields, onSubmit }: { fields: Field[]; onSubmit:(data:Record<string,string>)=>void }){
  const ref = React.useRef<HTMLFormElement|null>(null);
  return (
    <form ref={ref} onSubmit={e=>{e.preventDefault(); const fd=new FormData(e.currentTarget); const data:Record<string,string>={}; fd.forEach((v,k)=>data[k]=String(v)); onSubmit(data);}} className="space-y-3">
      {fields.map(f=> (
        <label key={f.name} className="block">
          <span className="block text-sm mb-1">{f.label}</span>
          <input name={f.name} type={f.type||"text"} required={f.required} className="w-full border rounded px-3 py-2" />
        </label>
      ))}
      <button className="btn-primary px-4 py-2 rounded bg-[var(--brand-orange)] text-white">Submit</button>
    </form>
  );
}
