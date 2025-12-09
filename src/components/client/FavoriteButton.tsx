"use client";

import { useState, useEffect } from "react";
import { useFavoritesStore } from "@/state/store";
import type { Movie } from "@/types/movie";
import styles from "./FavoriteButton.module.scss";

interface FavoriteButtonProps {
  movie: Movie;
  variant?: "icon" | "text";
}

export default function FavoriteButton({
  movie,
  variant = "icon",
}: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useFavoritesStore();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch by only reading from store after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  // During SSR and before mount, always show as not favorite to match server render
  const favorite = mounted ? isFavorite(movie.imdbID) : false;

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(movie);
  };

  if (variant === "text") {
    return (
      <button
        onClick={handleClick}
        className={`${styles.favoriteButton} ${styles.textVariant}`}
        type="button"
      >
        {favorite ? "Remove from Favorites" : "Add to Favorites"}
      </button>
    );
  }

  return (
    <button
      onClick={handleClick}
      className={`${styles.favoriteButton} ${favorite ? styles.active : ""}`}
      type="button"
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill={favorite ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7Z" />
      </svg>
    </button>
  );
}
