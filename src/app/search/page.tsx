import { Suspense } from "react";
import Header from "@/components/server/Header";
import MovieGrid from "@/components/server/MovieGrid";
import LoadingSpinner from "@/components/server/LoadingSpinner";
import ErrorMessage from "@/components/server/ErrorMessage";
import { searchAllMovies, isApiKeyConfigured } from "@/lib/api";
import styles from "./page.module.scss";

interface SearchPageProps {
  searchParams: Promise<{ q?: string; page?: string }>;
}

async function SearchResults({ searchQuery }: { searchQuery: string }) {
  if (!isApiKeyConfigured()) {
    return (
      <ErrorMessage message="API key not configured. Please set NEXT_PUBLIC_OMDB_API_KEY in your environment variables." />
    );
  }

  try {
    const results = await searchAllMovies(searchQuery);

    if (results.Error) {
      return <ErrorMessage message={results.Error} />;
    }

    const movies = results.Search || [];

    return (
      <>
        <h1 className={styles.searchTitle}>
          Search Results for &quot;{searchQuery}&quot;
        </h1>
        {results.totalResults && (
          <p className={styles.resultCount}>
            Found {results.totalResults} result
            {results.totalResults !== "1" ? "s" : ""}
          </p>
        )}
        <MovieGrid movies={movies} />
      </>
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to fetch movies";
    return <ErrorMessage message={errorMessage} />;
  }
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const searchQuery = params.q || "";

  return (
    <>
      <Header />
      <main className={styles.main}>
        <Suspense fallback={<LoadingSpinner />}>
          <SearchResults searchQuery={searchQuery} />
        </Suspense>
      </main>
    </>
  );
}
