// hooks/useEventListener.ts
import * as React from "react";

export function useEventListener<K extends keyof WindowEventMap>(
  type: K,
  handler: (e: WindowEventMap[K]) => void,
  deps: any[] = []
) {
  React.useEffect(() => {
    const h = handler as any;
    window.addEventListener(type, h);
    return () => window.removeEventListener(type, h);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
