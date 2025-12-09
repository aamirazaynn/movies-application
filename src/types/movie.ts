export interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
  Runtime?: string;
  Genre?: string;
  Director?: string;
  Actors?: string;
  Plot?: string;
  Ratings?: Rating[];
  imdbRating?: string;
  Response?: string;
  Error?: string;
}

export interface Rating {
  Source: string;
  Value: string;
}

export interface MovieSearchResponse {
  Search?: Movie[];
  totalResults?: string;
  Response: string;
  Error?: string;
}

export interface MovieDetails extends Movie {
  Runtime: string;
  Genre: string;
  Director: string;
  Actors: string;
  Plot: string;
  Ratings: Rating[];
  imdbRating: string;
  Response: string;
}
