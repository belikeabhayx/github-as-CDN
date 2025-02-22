import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { Navbar } from "@/components/Navbar/Main";
import { ToastContainer } from "react-toastify";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// SEO Metadata configuration
export const metadata: Metadata = {
  title: {
    default: "Free GitHub CDN - For Images",
    template: "Free GitHub CDN",
  },
  description:
    "A free GitHub CDN project for storing and serving images and assets directly from your repository",
  keywords: [
    "GitHub CDN",
    "free CDN",
    "image hosting",
    "asset management",
    "open source",
  ],

  // Open Graph
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Your Project Name",
    title: "Free GitHub CDN",
    description:
      "A free GitHub CDN project for storing and serving images and assets directly from your repository",
    images: [
      {
        url: "/public/hero-OG.png",
        width: 1200,
        height: 630,
        alt: "Your Project Name Open Graph Image",
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "Free GitHub CDN",
    description:
      "A free GitHub CDN project for storing and serving images and assets directly from your repository",
    images: ["/public/hero-OG.png"],
    creator: "@belikeabhayx",
  },

  // Additional metadata
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Icons
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
    other: [
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        url: "/favicon-32x32.png",
      },
    ],
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <SessionProvider>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <Toaster />
          <ToastContainer />
          <Navbar />
          {children}
        </body>
      </SessionProvider>
    </html>
  );
}
