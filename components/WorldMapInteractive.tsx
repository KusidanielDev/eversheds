"use client";

import dynamic from "next/dynamic";

/** Render Leaflet only on the client to avoid SSR/window issues */
const MapInner = dynamic(() => import("./WorldMapInteractiveInner"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[78vh] grid place-items-center bg-gray-100 text-sm text-gray-500">
      Loading map…
    </div>
  ),
});

export default function WorldMapInteractive() {
  return <MapInner />;
}
