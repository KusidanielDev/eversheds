// lib/overlay/OverlayManager.ts
export type OverlayKey =
  | "capabilities"
  | "resources"
  | "about"
  | "careers"
  | "region"
  | "language"
  | null;

type Listener = (k: OverlayKey) => void;

export class OverlayManager {
  private current: OverlayKey = null;
  private listeners = new Set<Listener>();

  // Cleanup returns void (not boolean), so React useEffect is happy
  subscribe(l: Listener) {
    this.listeners.add(l);
    return () => {
      this.listeners.delete(l);
    };
  }

  get value() {
    return this.current;
  }

  open(key: OverlayKey) {
    if (this.current === key) return;
    this.current = key;
    this.emit();
  }

  close() {
    if (this.current === null) return;
    this.current = null;
    this.emit();
  }

  toggle(key: OverlayKey) {
    this.current = this.current === key ? null : key;
    this.emit();
  }

  private emit() {
    for (const l of this.listeners) l(this.current);
  }
}

export const overlay = new OverlayManager();
