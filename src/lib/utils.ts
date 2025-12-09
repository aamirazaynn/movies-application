export function formatYear(year: string | undefined): string {
  if (!year) return "N/A";
  return year.split("-")[0] || year;
}

export function formatRuntime(runtime: string | undefined): string {
  if (!runtime) return "N/A";
  return runtime.replace(" min", "");
}

export function getPosterUrl(poster: string | undefined): string {
  if (!poster || poster === "N/A") {
    // Return a data URI for a simple placeholder
    return "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjYwMCIgZmlsbD0iI2U1ZTVlNSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IiM5OTk5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5ObyBQb3N0ZXI8L3RleHQ+PC9zdmc+";
  }
  return poster;
}

export function formatRating(rating: string | undefined): string {
  if (!rating || rating === "N/A") return "N/A";
  return rating;
}
