"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./MobileMenu.module.scss";
import ThemeToggle from "./ThemeToggle";
import { Menu, X } from "lucide-react";
import { useMobileMenuStore } from "@/states/mobileMenuStore";

export default function MobileMenu() {
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const { isOpen, isClosing, toggleMenu, closeMenu } = useMobileMenuStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen && !isClosing) {
      // Prevent body scroll when menu is open
      document.body.style.overflow = "hidden";
    } else {
      // Restore body scroll when menu is closed
      document.body.style.overflow = "";
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, isClosing]);

  const isActive = (path: string) => pathname === path;

  const menuContent =
    (isOpen || isClosing) && mounted ? (
      <>
        <div
          className={`${styles.overlay} ${isClosing ? styles.closing : ""}`}
          onClick={closeMenu}
        />
        <nav
          className={`${styles.mobileMenu} ${isClosing ? styles.closing : ""}`}
        >
          <div>
            <ThemeToggle />
            <button
              className={styles.burgerButton}
              onClick={toggleMenu}
              type="button"
            >
              <X className={styles.close} />
            </button>
          </div>

          <Link
            href="/"
            className={isActive("/") ? styles.active : ""}
            onClick={closeMenu}
          >
            Home
          </Link>
          <Link
            href="/favorites"
            className={isActive("/favorites") ? styles.active : ""}
            onClick={closeMenu}
          >
            Favorites
          </Link>
        </nav>
      </>
    ) : null;

  return (
    <>
      <button
        className={styles.burgerButton}
        onClick={toggleMenu}
        type="button"
      >
        <Menu className={styles.open} />
      </button>
      {mounted && createPortal(menuContent, document.body)}
    </>
  );
}
