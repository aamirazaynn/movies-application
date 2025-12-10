"use client";

import { useEffect, useState } from "react";
import Header from "@/components/server/Header";
import MovieGrid from "@/components/server/MovieGrid";
import LoadingSpinner from "@/components/server/LoadingSpinner";
import styles from "./page.module.scss";
import { useFavoritesStore } from "@/states/favoritesStore";

export default function FavoritesPage() {
  const { favorites } = useFavoritesStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <>
        <Header />
        <main className={styles.main}>
          <LoadingSpinner />
        </main>
      </>
    );
  }

  return (
    <>
      <Header />
      <main className={styles.main}>
        <h1 className={styles.title}>My Favorite Movies</h1>
        {favorites.length === 0 ? (
          <div className={styles.emptyState}>
            <p>You haven't added any favorites yet.</p>
            <p>Start exploring movies and add them to your favorites!</p>
          </div>
        ) : (
          <MovieGrid movies={favorites} />
        )}
      </main>
    </>
  );
}
