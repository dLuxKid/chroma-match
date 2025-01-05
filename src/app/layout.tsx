import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import OfflineBanner from "@/components/offline-banner";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Head from "next/head";
import { Toaster } from "sonner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ChromaMatch - AI-Powered Clothing Color Matcher",
  description:
    "Discover the perfect outfit combinations with ChromaMatch. Use AI to upload your clothes and find your best matches effortlessly. Elevate your style today!",
  keywords: [
    "ChromaMatch",
    "AI clothing matcher",
    "fashion AI",
    "color matching app",
    "clothing styles",
    "outfit matching",
    "wardrobe assistant",
    "AI for fashion",
    "match clothes with AI",
  ],
  openGraph: {
    title: "ChromaMatch - Match Your Clothes with AI",
    description:
      "Revolutionize your wardrobe with ChromaMatch. Let AI analyze and suggest perfect outfit matches. Get started today!",
    type: "website",
    url: "https://chromamatch.vercel.app",
    images: "https://chromamatch.vercel.app/logo.png",
    locale: "en_US",
    siteName: "ChromaMatch",
  },
  twitter: {
    card: "summary_large_image",
    title: "ChromaMatch - AI-Powered Clothing Color Matcher",
    description:
      "Use ChromaMatch to discover and match clothing effortlessly with the power of AI. Style made simple!",
    images: "https://chromamatch.vercel.app/logo.png",
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased relative`}
      >
        <Toaster position="bottom-right" richColors />
        <OfflineBanner />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
