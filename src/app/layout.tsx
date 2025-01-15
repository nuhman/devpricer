import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ProposalProvider } from "@/context/ProposalContext";
import Navigation from "@/app/ui/shared/header";
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
  title: "Software Project Quotation Generator | DevPricer",
  description:
    "Generate professional quotations and proposals for your potential clients. Perfect for freelance developers and agencies.",
  keywords:
    "website quotation generator, proposal generator, web development quotation, freelance proposal tool, software project quotation, project proposal, project quotation",
  verification: {
    google: "4f3WD2gefV8KnJbg0UxeFdfewAGk2_FPoGh3hiJTrzE",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png" }],
    other: [
      { rel: "android-chrome-192x192", url: "/android-chrome-192x192.png" },
      { rel: "android-chrome-512x512", url: "/android-chrome-512x512.png" },
    ],
  },
  openGraph: {
    title: "Software Project Quotation or Proposal Generator | DevPricer",
    description:
      "Perfect for freelance developers and agencies to generate professional quotations and proposals for your potential clients.",
    url: "https://devpricer.vercel.app",
    siteName: "DevPricer | Project Quotation Generator",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "DevPricer | Project Quotation Generator",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ProposalProvider>
          <Navigation />
          <main>{children}</main>
        </ProposalProvider>
      </body>
    </html>
  );
}
