import * as React from "react";
export function useDisclosure(initial=false){
  const [open, set] = React.useState(initial);
  const on = React.useCallback(()=>set(true),[]);
  const off = React.useCallback(()=>set(false),[]);
  const toggle = React.useCallback(()=>set(v=>!v),[]);
  return { open, on, off, toggle, set };
}
