import type { Metadata } from "next";
import { Geist, Geist_Mono, Space_Grotesk, Syne } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://theasylum.agency"),
  title: "The Asylum | Digital Disruption Unit",
  description: "We audit, rebuild, and scale your growth engine with clinical precision. No fluff. Controlled aggression delivered.",
  keywords: ["digital consulting", "growth hacking", "marketing automation", "SEO growth", "conversion rate optimization"],
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "The Asylum | Digital Disruption Unit",
    description: "We audit, rebuild, and scale your growth engine with clinical precision.",
    url: "https://theasylum.agency",
    siteName: "The Asylum",
    images: [
      {
        url: "/asylum-og-1200x630.png",
        width: 1200,
        height: 630,
        alt: "The Asylum",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Asylum | Digital Disruption Unit",
    description: "We audit, rebuild, and scale your growth engine with clinical precision.",
    images: ["/asylum-og-1200x630.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} ${syne.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#060608] text-zinc-100 font-sans selection:bg-[#ef4444] selection:text-white">
        {children}
      </body>
    </html>
  );
}

