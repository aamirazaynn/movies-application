import MovieCard from "./MovieCard";
import type { Movie } from "@/types/movie";
import styles from "./MovieGrid.module.scss";

interface MovieGridProps {
  movies: Movie[];
  loading?: boolean;
}

export default function MovieGrid({ movies, loading = false }: MovieGridProps) {
  if (loading) {
    return (
      <div className={styles.grid}>
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className={styles.skeletonCard}>
            <div className={styles.skeletonPoster} />
            <div className={styles.skeletonText} />
            <div className={styles.skeletonText} />
          </div>
        ))}
      </div>
    );
  }

  if (movies.length === 0) {
    return (
      <div className={styles.emptyState}>
        <p>No movies found. Try searching for a different title.</p>
      </div>
    );
  }

  return (
    <div className={styles.grid}>
      {movies.map((movie) => (
        <MovieCard key={movie.imdbID} movie={movie} />
      ))}
    </div>
  );
}
