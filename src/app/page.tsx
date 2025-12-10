import Header from "@/components/server/Header";
import MovieGrid from "@/components/server/MovieGrid";
import { searchAllMovies } from "@/lib/api";
import type { MovieSearchResponse } from "@/types/movie";
import styles from "./page.module.scss";
import ErrorMessage from "@/components/server/ErrorMessage";

export default async function Home() {
  let popularMovies: MovieSearchResponse = { Response: "False" };
  let apiError: string | null = null;

  try {
    popularMovies = await searchAllMovies("movie");
  } catch (error) {
    apiError =
      error instanceof Error ? error.message : "Failed to fetch movies";
  }

  if (apiError)
    return (
      <>
        <Header />
        <main className={styles.main}>
          <ErrorMessage message={apiError} />
        </main>
      </>
    );

  const movies = popularMovies.Search || [];

  return (
    <>
      <Header />
      <main className={styles.main}>
        {movies.length > 0 && (
          <section>
            <h2 className={styles.sectionTitle}>Popular Movies</h2>
            <MovieGrid movies={movies} />
          </section>
        )}

        {movies.length === 0 && (
          <section className={styles.emptyState}>
            <p>Movies Not Found.</p>
          </section>
        )}
      </main>
    </>
  );
}
