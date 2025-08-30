"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { cx } from "@/lib/utils";
import { MapContainer, TileLayer } from "react-leaflet";

// Lazy-load Leaflet map only on desktop/tablet to keep mobile clean.
function LeafletMap() {
  return (
    <MapContainer
      center={[20, 0]}
      zoom={2}
      style={{ height: "60vh", width: "100%" }}
      scrollWheelZoom={false}
      attributionControl={false}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
    </MapContainer>
  );
}

export default function WorldLocations() {
  return (
    <section className="relative bg-gray-200">
      {/* Desktop/Tablet: real map */}
      <div className="hidden md:block relative">
        <LeafletMap />
        {/* Bottom-left card over map (your previous design) */}
        <div
          className="
            absolute left-6 bottom-6
            bg-white/95 backdrop-blur
            border border-gray-300 shadow-md
            p-6
            w-[56vw] lg:w-[44vw] xl:w-[40vw] max-w-[720px]
          "
        >
          <div className="text-xl sm:text-2xl font-bold mb-4">Locations</div>

          <div className="grid grid-cols-1 gap-3 divide-y divide-gray-300">
            <RegionRow label="AFRICA" />
            <RegionRow label="ASIA" />
            <RegionRow label="CENTRAL &amp; EASTERN EUROPE" />
            <RegionRow label="MIDDLE EAST" />
          </div>

          <div className="mt-3 grid grid-cols-1 gap-3 divide-y divide-gray-300">
            <RegionRow label="NORTH AMERICA" />
            <RegionRow label="WESTERN EUROPE" />
          </div>
        </div>
      </div>

      {/* Mobile: no map, only the card; sits flush to section above */}
      <div className="md:hidden">
        <div className="container-page pt-4 pb-6">
          <div className="bg-white border border-gray-300 shadow-sm p-5">
            <div className="text-xl font-bold mb-4">Locations</div>

            <div className="grid grid-cols-1 gap-3 divide-y divide-gray-300">
              <RegionRow label="AFRICA" />
              <RegionRow label="ASIA" />
              <RegionRow label="CENTRAL &amp; EASTERN EUROPE" />
              <RegionRow label="MIDDLE EAST" />
              <RegionRow label="NORTH AMERICA" />
              <RegionRow label="WESTERN EUROPE" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function RegionRow({ label }: { label: string }) {
  return (
    <button
      className={cx(
        "w-full py-3",
        "flex items-center justify-between",
        "group text-left"
      )}
    >
      <span className="font-semibold tracking-wide">{label}</span>
      <span className="text-gray-800 w-6 h-6 grid place-items-center leading-none transition-transform group-active:scale-95">
        +
      </span>
    </button>
  );
}
