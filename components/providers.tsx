"use client";

import { SessionProvider } from "next-auth/react";
import * as React from "react"
import { ThemeProvider as ThemeProvider } from "next-themes"


export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {children}
      </ThemeProvider>
    </SessionProvider>
  );
}
