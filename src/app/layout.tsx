import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/layout/Navbar";

const notoSans = Noto_Sans({ subsets: ['latin'], variable: '--font-sans' });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "React Three Fiber Studio | Next.js",
  description: "Interactive 3D scenes and React Three Fiber documentation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", geistSans.variable, geistMono.variable, "font-sans", notoSans.variable)}
    >
      <body className=" bg-foreground text-background overflow-hidden">
        <div className="min-h-full flex flex-col bg-background text-foreground">
        <Navbar />
        <div className="flex-1 flex flex-col">{children}</div>

        </div>
      </body>
    </html>
  );
}
