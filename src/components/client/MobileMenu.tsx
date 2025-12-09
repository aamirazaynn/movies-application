"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./MobileMenu.module.scss";
import ThemeToggle from "./ThemeToggle";

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => {
    if (isOpen) {
      closeMenu();
    } else {
      setIsOpen(true);
    }
  };

  const closeMenu = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
    }, 300);
  };

  const isActive = (path: string) => pathname === path;

  return (
    <>
      <button
        className={styles.burgerButton}
        onClick={toggleMenu}
        type="button"
      >
        <span className={styles.burgerLine} />
        <span className={styles.burgerLine} />
        <span className={styles.burgerLine} />
      </button>
      {(isOpen || isClosing) && (
        <>
          <div
            className={`${styles.overlay} ${isClosing ? styles.closing : ""}`}
            onClick={closeMenu}
          />
          <nav
            className={`${styles.mobileMenu} ${
              isClosing ? styles.closing : ""
            }`}
          >
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
            <ThemeToggle />
          </nav>
        </>
      )}
    </>
  );
}
