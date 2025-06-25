"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToggleButton() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div
      className="fixed z-50 bottom-4 right-4 bg-background border border-border shadow-lg rounded-full p-1 flex items-center gap-1 transition-colors hover:bg-muted"
      style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}
    >
      <button
        aria-label="Set light theme"
        onClick={() => setTheme("light")}
        className={`p-1.5 rounded-full transition-all ${theme === "light" ? "bg-gray-200 text-black shadow" : "opacity-60 bg-transparent text-gray-500"}`}
      >
        <Sun className="h-4 w-4" />
      </button>
      <button
        aria-label="Set dark theme"
        onClick={() => setTheme("dark")}
        className={`p-1.5 rounded-full transition-all ${theme === "dark" ? "bg-gray-800 text-white shadow" : "opacity-60 bg-transparent text-gray-500"}`}
      >
        <Moon className="h-4 w-4" />
      </button>
    </div>
  );
} 