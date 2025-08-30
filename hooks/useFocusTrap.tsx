// hooks/useFocusTrap.tsx
import * as React from "react";

export function useFocusTrap<T extends HTMLElement>(onEscape: () => void) {
  const ref = React.useRef<T | null>(null);

  React.useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const qs = root.querySelectorAll<HTMLElement>(
      'a,button,input,select,textarea,[tabindex]:not([tabindex="-1"])'
    );
    const focusables = Array.from(qs).filter(
      (el) => !el.hasAttribute("disabled") && !el.getAttribute("aria-hidden")
    );
    focusables[0]?.focus();

    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onEscape();
        return;
      }
      if (e.key !== "Tab" || focusables.length === 0) return;
      const first = focusables[0],
        last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        last.focus();
        e.preventDefault();
      } else if (!e.shiftKey && document.activeElement === last) {
        first.focus();
        e.preventDefault();
      }
    };

    document.addEventListener("keydown", key);
    return () => document.removeEventListener("keydown", key);
  }, [onEscape]);

  return ref;
}
