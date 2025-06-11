import { Navbar } from "@/components/navbar";
import { Providers } from "@/components/providers";
import { auth } from "@/lib/auth";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "Learn to Scode",
  description: "Learn programming through puzzles and problems",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <Navbar session={session} />
          <main className="min-h-[calc(100vh-14rem)]">{children}</main>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
