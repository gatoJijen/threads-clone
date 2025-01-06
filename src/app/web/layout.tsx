import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/app/styles/globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Inicio • Threads",
  description: "Generated by create next app",
};

export default function WebLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section>
      
        <SpeedInsights/>
        {children}
    </section>
  );
}
