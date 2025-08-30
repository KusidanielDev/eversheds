// components/ui/Icons.tsx
import * as React from "react";

export const Caret = ({
  open = false,
  className = "",
}: {
  open?: boolean;
  className?: string;
}) => (
  <span
    aria-hidden
    className={
      (open ? "-rotate-90" : "rotate-90") +
      " inline-block text-[11px] leading-none transition-transform " +
      className
    }
  >
    &gt;
  </span>
);

export const Globe = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="currentColor"
    aria-hidden
  >
    <path d="M12 2a10 10 0 100 20 10 10 0 000-20Zm6.9 7h-3.1a12.5 12.5 0 00-2.1-4.6 8.03 8.03 0 015.2 4.6ZM12 4.1c.9 1.2 1.7 2.8 2.2 4.9H9.8c.5-2.1 1.3-3.7 2.2-4.9ZM4.9 9a8.03 8.03 0 015.2-4.6A12.5 12.5 0 008 9H4.9ZM4.1 12c0-.3 0-.7.1-1h3.5a18.7 18.7 0 000 2H4.2a8.7 8.7 0 01-.1-1Zm.8 3h3.1a12.5 12.5 0 002.1 4.6A8.03 8.03 0 014.9 15Zm7.1 4.9c-.9-1.2-1.7-2.8-2.2-4.9h4.4c-.5 2.1-1.3 3.7-2.2 4.9Zm2.9-.3a12.5 12.5 0 002.1-4.6h3.1a8.03 8.03 0 01-5.2 4.6ZM16.3 13a18.7 18.7 0 000-2h3.5c.1.3.2.7.2 1s-.1.7-.2 1h-3.5Z" />
  </svg>
);

export const Pin = ({ className = "w-3.5 h-3.5" }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="currentColor"
    aria-hidden
  >
    <path d="M12 2a7 7 0 00-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 00-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z" />
  </svg>
);

export const SearchIcon = ({
  className = "w-4 h-4",
}: {
  className?: string;
}) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="currentColor"
    aria-hidden
  >
    <path d="M10 2a8 8 0 105.3 14.1l4.3 4.3 1.4-1.4-4.3-4.3A8 8 0 0010 2zm0 2a6 6 0 110 12A6 6 0 0110 4z" />
  </svg>
);
