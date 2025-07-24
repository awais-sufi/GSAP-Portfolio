// app/layout.tsx
import "./globals.css";
import { Inter, Roboto_Mono } from "next/font/google";
import type { Metadata } from "next";
import Script from "next/script"; // Import the Script component

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-roboto-mono",
});

export const metadata: Metadata = {
  title: "My GSAP Portfolio",
  description: "Animated portfolio with Next.js App Router and GSAP",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${robotoMono.variable}`}>
      <head>
        {/*
          The Script component should typically be placed in the <head> for
          scripts that need to load early, or at the end of <body> if they
          can be deferred. For lottie-player, placing it in head is generally fine.
        */}
        <Script
          src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"
          strategy="beforeInteractive" // 'beforeInteractive' loads the script before Next.js hydration. Good for web components.
          // You can also use 'afterInteractive' or 'lazyOnload' depending on your needs.
        />
      </head>
      <body>
        <main className="relative z-10 min-h-screen">{children}</main>
      </body>
    </html>
  );
}
