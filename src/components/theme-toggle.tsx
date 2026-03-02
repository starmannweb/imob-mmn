"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export function ThemeToggle() {
    const { setTheme, theme } = useTheme()

    return (
        <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors relative flex items-center justify-center"
            suppressHydrationWarning
        >
            <div className="relative flex items-center justify-center w-5 h-5">
                <Sun className="h-5 w-5 absolute transition-all scale-100 rotate-0 dark:-rotate-90 dark:scale-0 text-amber-500" />
                <Moon className="h-5 w-5 absolute transition-all scale-0 rotate-90 dark:rotate-0 dark:scale-100 text-slate-300" />
            </div>
            <span className="sr-only">Toggle theme</span>
        </button>
    )
}
