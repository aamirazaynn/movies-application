import { Suspense } from "react";
import Link from "next/link";
import SearchBar from "@/components/client/SearchBar";
import ThemeToggle from "@/components/client/ThemeToggle";
import MobileMenu from "@/components/client/MobileMenu";
import styles from "./Header.module.scss";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <h1>Movie App</h1>
        </Link>

        <div className={styles.actions}>
          <Suspense
            fallback={<div style={{ width: "100%", minWidth: "200px" }} />}
          >
            <SearchBar />
          </Suspense>
          <MobileMenu />
        </div>

        <nav className={styles.desktopNav}>
          <Link href="/" className={styles.navLink}>
            Home
          </Link>
          <Link href="/favorites" className={styles.navLink}>
            Favorites
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
