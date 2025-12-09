import type { MovieSearchResponse, MovieDetails } from "@/types/movie";

const API_BASE_URL = "https://www.omdbapi.com/";

/**
 * Get API key dynamically (reads from env at runtime)
 */
function getApiKey(): string {
  const key = process.env.NEXT_PUBLIC_OMDB_API_KEY || "";
  return key;
}

interface FetchOptions extends RequestInit {
  params?: Record<string, string>;
}

/**
 * Check if API key is configured
 */
export function isApiKeyConfigured(): boolean {
  const apiKey = getApiKey();
  const configured = !!apiKey && apiKey.trim() !== "";
  return configured;
}

/**
 * Custom fetch wrapper that works on both server and client
 */
async function customFetch<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  // Check if API key is configured
  if (!isApiKeyConfigured()) {
    throw new Error(
      "OMDb API key is not configured. Please set NEXT_PUBLIC_OMDB_API_KEY in your environment variables."
    );
  }

  const { params, ...fetchOptions } = options;

  // Build URL with query parameters
  const url = new URL(API_BASE_URL + endpoint);

  // Add API key (read dynamically)
  const apiKey = getApiKey();
  url.searchParams.set("apikey", apiKey);

  // Add custom params
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.set(key, value);
    });
  }

  try {
    const response = await fetch(url.toString(), {
      ...fetchOptions,
      headers: {
        "Content-Type": "application/json",
        ...fetchOptions.headers,
      },
      // Add cache configuration for Next.js
      next: { revalidate: 3600 }, // Revalidate every hour
    });

    if (!response.ok) {
      // Handle specific error cases
      if (response.status === 401) {
        throw new Error(
          "Invalid API key. Please check your NEXT_PUBLIC_OMDB_API_KEY environment variable."
        );
      }
      throw new Error(
        `API request failed: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();

    if (data.Response === "False" && data.Error) {
      throw new Error(data.Error);
    }

    return data as T;
  } catch (error) {
    // Only log if it's not our custom error message
    throw error;
  }
}

/**
 * Search movies by title
 */
export async function searchMovies(
  searchTerm: string,
  page: number = 1
): Promise<MovieSearchResponse> {
  return customFetch<MovieSearchResponse>("", {
    params: {
      s: searchTerm,
      page: page.toString(),
      type: "movie",
    },
  });
}

/**
 * Get movie details by IMDb ID
 */
export async function getMovieDetails(
  imdbID: string
): Promise<MovieDetails | { Error: string; Response: string }> {
  return customFetch<MovieDetails | { Error: string; Response: string }>("", {
    params: {
      i: imdbID,
      plot: "full",
    },
  });
}
