/** Utility helpers used across components — meaningful code only. */
export function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

export function clamp(n: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, n));
}

/** Debounce with proper timer typing + optional cancel/flush (non-breaking). */
export function debounce<T extends (...a: any[]) => void>(fn: T, wait = 150) {
  let t: ReturnType<typeof setTimeout> | null = null;

  const d = (...a: Parameters<T>) => {
    if (t) clearTimeout(t);
    t = setTimeout(() => {
      t = null;
      fn(...a);
    }, wait);
  };

  d.cancel = () => {
    if (t) clearTimeout(t);
    t = null;
  };

  d.flush = (...a: Parameters<T>) => {
    if (t) {
      clearTimeout(t);
      t = null;
    }
    fn(...a);
  };

  return d as T & { cancel: () => void; flush: (...a: Parameters<T>) => void };
}

/** Throttle (leading + trailing) with >= check and last-args scheduling. */
export function throttle<T extends (...a: any[]) => void>(fn: T, wait = 150) {
  let last = 0;
  let pending: ReturnType<typeof setTimeout> | null = null;
  let lastArgs: Parameters<T> | null = null;

  const invoke = (args: Parameters<T>) => {
    last = Date.now();
    fn(...args);
  };

  return (...a: Parameters<T>) => {
    const now = Date.now();
    const elapsed = now - last;
    lastArgs = a;

    if (elapsed >= wait) {
      if (pending) {
        clearTimeout(pending);
        pending = null;
      }
      invoke(a);
    } else {
      if (pending) clearTimeout(pending);
      pending = setTimeout(() => {
        if (lastArgs) invoke(lastArgs);
        pending = null;
      }, wait - elapsed);
    }
  };
}

let _uid = 0;
export function uid(prefix = "id"): string {
  _uid++;
  return `${prefix}-${_uid}`;
}

export function isBrowser(): boolean {
  return typeof window !== "undefined" && typeof document !== "undefined";
}

/** Window event helper; returns a void cleanup suitable for useEffect. */
export function on<T extends keyof WindowEventMap>(
  type: T,
  h: (e: WindowEventMap[T]) => void,
  options?: boolean | AddEventListenerOptions
) {
  if (!isBrowser()) return () => {};
  window.addEventListener(type, h as any, options);
  return () => window.removeEventListener(type, h as any, options);
}

export function prefersReducedMotion(): boolean {
  return (
    isBrowser() &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}
