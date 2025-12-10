"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Movie } from "@/types/movie";

interface FavoritesState {
  favorites: Movie[];
  addFavorite: (movie: Movie) => void;
  removeFavorite: (imdbID: string) => void;
  isFavorite: (imdbID: string) => boolean;
  toggleFavorite: (movie: Movie) => void;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],
      addFavorite: (movie) =>
        set((state) => ({
          favorites: [...state.favorites, movie],
        })),
      removeFavorite: (imdbID) =>
        set((state) => ({
          favorites: state.favorites.filter((m) => m.imdbID !== imdbID),
        })),
      isFavorite: (imdbID) => {
        const state = get();
        return state.favorites.some((m) => m.imdbID === imdbID);
      },
      toggleFavorite: (movie) => {
        const state = get();
        if (state.isFavorite(movie.imdbID)) {
          state.removeFavorite(movie.imdbID);
        } else {
          state.addFavorite(movie);
        }
      },
    }),
    {
      name: "movie-favorites-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
