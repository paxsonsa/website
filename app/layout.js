import "./globals.css";
import { Newsreader, Overpass_Mono } from "next/font/google";

import SiteShell from "@/components/site/SiteShell";

const newsreader = Newsreader({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-newsreader",
});

const overpassMono = Overpass_Mono({
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
  variable: "--font-overpass-mono",
});

export const metadata = {
  metadataBase: new URL("https://andrewpaxson.com"),
  title: "Andrew Paxson",
  description:
    "Product designer and engineer who builds tools for creative teams. Staff Engineer at Industrial Light & Magic.",
  openGraph: {
    type: "website",
    siteName: "Andrew Paxson",
  },
};

/*
 * Runs before first paint so the theme class is right from the start:
 * no flash, and nothing hidden until React hydrates.
 */
const themeScript = `(function(){try{var s=localStorage.getItem("site-theme");var d=s?s==="dark":window.matchMedia("(prefers-color-scheme: dark)").matches;if(d)document.documentElement.classList.add("dark-mode");}catch(e){}})();`;

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${newsreader.variable} ${overpassMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-screen">
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
