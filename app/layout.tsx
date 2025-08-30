// app/layout.tsx
import type { Metadata } from "next";
import "../styles/globals.css";
import "leaflet/dist/leaflet.css";

export const metadata: Metadata = {
  title: "Eversheds Sutherland (Clone)",
  description: "Meaningful-code build",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Make sure the page scales correctly on mobile */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Source Sans Pro for the sideways brand text */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      {/* Keep baseline styles consistent site-wide */}
      <body className="antialiased bg-white text-black overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
