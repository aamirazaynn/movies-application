"use client";

import { useEffect } from "react";
import { useThemeStore } from "@/states/themeStore";
import styles from "./ThemeToggle.module.scss";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useThemeStore();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <button onClick={toggleTheme} className={styles.themeToggle} type="button">
      {theme === "light" ? <Moon /> : <Sun />}
    </button>
  );
}
