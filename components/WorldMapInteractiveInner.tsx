"use client";

import * as React from "react";
import {
  MapContainer as _MapContainer,
  TileLayer as _TileLayer,
  Marker as _Marker,
  Tooltip as _Tooltip,
  useMap,
} from "react-leaflet";
import L, {
  type LatLngTuple,
  type LatLngBoundsExpression,
  type DivIcon,
} from "leaflet";
import "leaflet/dist/leaflet.css";
import { cx } from "@/lib/utils";

/* Type wrappers (safe to keep; remove later if your editor is clean) */
const MapContainer = _MapContainer as unknown as React.ComponentType<any>;
const TileLayer = _TileLayer as unknown as React.ComponentType<any>;
const Marker = _Marker as unknown as React.ComponentType<any>;
const Tooltip = _Tooltip as unknown as React.ComponentType<any>;

type RegionKey =
  | "world"
  | "na"
  | "weu"
  | "cee"
  | "africa"
  | "middleeast"
  | "asia";

const REGIONAL_BOUNDS: Record<
  Exclude<RegionKey, "world">,
  LatLngBoundsExpression
> = {
  na: [
    [7, -168],
    [83, -52],
  ],
  weu: [
    [35, -10],
    [71, 31],
  ],
  cee: [
    [39, 19],
    [60, 45],
  ],
  africa: [
    [-35, -18],
    [38, 51],
  ],
  middleeast: [
    [12, 30],
    [41, 63],
  ],
  asia: [
    [5, 60],
    [60, 150],
  ],
};

const INITIAL_CENTER: LatLngTuple = [20, 0];
const INITIAL_ZOOM = 2;

/* Green pin icon (svg) */
const greenPin: DivIcon = L.divIcon({
  className: "es-pin",
  html: `
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
      <path d="M12 2C7.86 2 4.5 5.36 4.5 9.5c0 5.33 6.5 12.5 7.02 13.06a.7.7 0 0 0 .96 0C13.99 22 19.5 14.83 19.5 9.5 19.5 5.36 16.14 2 12 2z" fill="#16a34a"/>
      <circle cx="12" cy="9.5" r="3.2" fill="#fff"/>
    </svg>
  `,
  iconSize: [22, 22],
  iconAnchor: [11, 22],
  popupAnchor: [0, -22],
});

/* Example pins with names (tooltips show the name) */
const PINS: Array<{ lat: number; lng: number; title: string }> = [
  { lat: 49.3, lng: -123.1, title: "Vancouver" },
  { lat: 51.0, lng: -114.1, title: "Calgary" },
  { lat: 41.9, lng: -87.6, title: "Chicago" },
  { lat: 40.7, lng: -74.0, title: "New York" },
  { lat: 19.4, lng: -99.1, title: "Mexico City" },
  { lat: 9.0, lng: -79.5, title: "Panama City" },
  { lat: 4.7, lng: -74.1, title: "Bogotá" },
  { lat: -23.5, lng: -46.6, title: "São Paulo" },
  { lat: 51.5, lng: -0.12, title: "London" },
  { lat: 48.9, lng: 2.35, title: "Paris" },
  { lat: 52.5, lng: 13.4, title: "Berlin" },
  { lat: 41.9, lng: 12.5, title: "Rome" },
  { lat: 33.6, lng: -7.6, title: "Casablanca" },
  { lat: 36.7, lng: 3.2, title: "Algiers" },
  { lat: 32.9, lng: 13.2, title: "Tripoli" },
  { lat: 30.0, lng: 31.2, title: "Cairo" },
  { lat: 24.7, lng: 46.7, title: "Riyadh" },
  { lat: 28.6, lng: 77.2, title: "Delhi" },
  { lat: 39.9, lng: 116.4, title: "Beijing" },
  { lat: 1.35, lng: 103.8, title: "Singapore" },
];

/* Fit / zoom helper */
function FitRegion({ region }: { region: RegionKey }) {
  const map = useMap();
  React.useEffect(() => {
    if (region === "world") {
      map.setView(INITIAL_CENTER, INITIAL_ZOOM, { animate: true });
    } else {
      map.fitBounds(REGIONAL_BOUNDS[region], {
        animate: true,
        paddingTopLeft: [20, 20],
        paddingBottomRight: [20, 20],
      });
    }
  }, [region, map]);
  return null;
}

/* Auto invalidate size on mount & resize (Leaflet quirk) */
function AutoResize() {
  const map = useMap();
  React.useEffect(() => {
    const t = setTimeout(() => map.invalidateSize(), 60);
    const onR = () => map.invalidateSize();
    window.addEventListener("resize", onR);
    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", onR);
    };
  }, [map]);
  return null;
}

export default function WorldMapInteractiveInner() {
  const [region, setRegion] = React.useState<RegionKey>("world");

  return (
    <section className="relative">
      {/* top separator HR with spacing */}
      <hr className="border-black border-2 mt-16 mb-8" />

      {/* Map needs a hard height */}
      <div className="relative w-full h-[78vh]">
        <MapContainer
          center={INITIAL_CENTER}
          zoom={INITIAL_ZOOM}
          className="w-full h-full"
          zoomControl={false}
          worldCopyJump={true}
          style={{ height: "100%", width: "100%" }}
        >
          {/* Grey map with built-in labels (names visible) */}
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            attribution='&copy; OpenStreetMap contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            subdomains={["a", "b", "c", "d"]}
          />
          {/* Fallback (uncomment if needed)
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; OpenStreetMap contributors'
          /> */}

          {PINS.map((p, i) => (
            <Marker
              key={i}
              position={[p.lat, p.lng] as LatLngTuple}
              icon={greenPin}
              title={p.title}
            >
              <Tooltip direction="top" offset={[0, -10]} opacity={0.95}>
                {p.title}
              </Tooltip>
            </Marker>
          ))}

          <FitRegion region={region} />
          <AutoResize />
        </MapContainer>

        {/* Bottom-left overlay CARD — three columns */}
        <div
          className="
            absolute left-6 bottom-6 z-[400]
            bg-white/95 border border-gray-300 shadow-md
            p-6
            w-[88vw] sm:w-[80vw] md:w-[68vw] lg:w-[52vw] xl:w-[46vw]
            max-w-[920px]
          "
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {/* Col 1: Title only */}
            <div>
              <div className="text-2xl font-bold">Locations</div>
            </div>

            {/* Col 2: first set */}
            <div className="divide-y divide-gray-300">
              <RegionRow label="AFRICA" onClick={() => setRegion("africa")} />
              <RegionRow label="ASIA" onClick={() => setRegion("asia")} />
              <RegionRow
                label="CENTRAL &amp; EASTERN EUROPE"
                onClick={() => setRegion("cee")}
              />
              <RegionRow
                label="MIDDLE EAST"
                onClick={() => setRegion("middleeast")}
              />
            </div>

            {/* Col 3: second set */}
            <div className="divide-y divide-gray-300">
              <RegionRow
                label="NORTH AMERICA"
                onClick={() => setRegion("na")}
              />
              <RegionRow
                label="WESTERN EUROPE"
                onClick={() => setRegion("weu")}
              />
            </div>
          </div>

          <div className="mt-5 flex items-center gap-3 text-sm">
            <button
              className="px-3 py-1 border border-gray-400 hover:bg-gray-100"
              onClick={() => setRegion("world")}
            >
              Reset view
            </button>
            <span className="text-gray-500">Click a region (+) to zoom</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function RegionRow({
  label,
  onClick,
}: {
  label: string;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cx(
        "w-full text-left py-3",
        "flex items-center justify-between group"
      )}
    >
      <span className="font-semibold tracking-wide">{label}</span>
      <span
        aria-hidden
        className="w-6 h-6 grid place-items-center text-black leading-none transition-transform group-active:scale-95"
      >
        +
      </span>
    </button>
  );
}
