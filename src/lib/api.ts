import type { MovieSearchResponse, MovieDetails } from "@/types/movie";

const API_BASE_URL = "https://www.omdbapi.com/";

function getApiKey(): string {
  const key = process.env.NEXT_PUBLIC_OMDB_API_KEY || "";
  return key;
}

interface FetchOptions extends RequestInit {
  params?: Record<string, string>;
}

export function isApiKeyConfigured(): boolean {
  const apiKey = getApiKey();
  const configured = !!apiKey && apiKey.trim() !== "";
  return configured;
}

async function customFetch<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  if (!isApiKeyConfigured()) {
    throw new Error(
      "OMDb API key is not configured. Please set NEXT_PUBLIC_OMDB_API_KEY in your environment variables."
    );
  }

  const { params, ...fetchOptions } = options;

  const url = new URL(API_BASE_URL + endpoint);

  const apiKey = getApiKey();
  url.searchParams.set("apikey", apiKey);

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
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
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
    throw error;
  }
}

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

export async function searchAllMovies(
  searchTerm: string
): Promise<MovieSearchResponse> {
  const firstPage = await searchMovies(searchTerm, 1);

  if (firstPage.Error || !firstPage.Search) {
    return firstPage;
  }

  const totalResults = parseInt(firstPage.totalResults || "0", 10);
  const resultsPerPage = 10;
  const calculatedPages = Math.ceil(totalResults / resultsPerPage);
  const maxPages = 10;
  const totalPages = Math.min(calculatedPages, maxPages);

  if (totalPages <= 1) {
    return firstPage;
  }

  const pagePromises: Promise<MovieSearchResponse>[] = [];
  for (let page = 2; page <= totalPages; page++) {
    pagePromises.push(searchMovies(searchTerm, page));
  }

  try {
    const remainingPages = await Promise.all(pagePromises);

    const allMovies = [...firstPage.Search];
    for (const pageResult of remainingPages) {
      if (pageResult.Search && !pageResult.Error) {
        allMovies.push(...pageResult.Search);
      }
    }

    return {
      Search: allMovies,
      totalResults: firstPage.totalResults,
      Response: "True",
    };
  } catch (error) {
    return firstPage;
  }
}

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
