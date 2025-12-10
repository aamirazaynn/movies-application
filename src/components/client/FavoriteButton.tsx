"use client";

import { useState, useEffect } from "react";
import type { Movie } from "@/types/movie";
import styles from "./FavoriteButton.module.scss";
import { Heart } from "lucide-react";
import { useFavoritesStore } from "@/states/favoritesStore";

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

  useEffect(() => {
    setMounted(true);
  }, []);

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
      <Heart fill={favorite ? "currentColor" : "transparent"} />
    </button>
  );
}
