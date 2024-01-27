import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta property="fc:frame" content="vNext" />
        <meta property="fc:frame:image" content="https://frame-demo.vercel.app/mint.png" />
        <meta property="fc:frame:button:1" content="Testing" />
        <meta property="fc:frame:post_url" content="https://frame-demo.vercel.app/api/mint" />

        <meta property="og:title" content="TEST" />
        <meta property="og:image" content="https://frame-demo.vercel.app/mint.png" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
