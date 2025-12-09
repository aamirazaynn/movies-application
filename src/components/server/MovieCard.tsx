import Image from "next/image";
import Link from "next/link";
import FavoriteButton from "@/components/client/FavoriteButton";
import { getPosterUrl, formatYear, formatRating } from "@/lib/utils";
import type { Movie } from "@/types/movie";
import styles from "./MovieCard.module.scss";

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const posterUrl = getPosterUrl(movie.Poster);
  const year = formatYear(movie.Year);

  return (
    <article className={styles.movieCard}>
      <Link href={`/movie/${movie.imdbID}`} className={styles.cardLink}>
        <div className={styles.posterContainer}>
          <Image
            src={posterUrl}
            alt={`${movie.Title} poster`}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            className={styles.poster}
            loading="lazy"
          />
          <div className={styles.overlay}>
            <FavoriteButton movie={movie} />
          </div>
        </div>
        <div className={styles.info}>
          <h3 className={styles.title}>{movie.Title}</h3>
          <span className={styles.year}>{year}</span>
        </div>
      </Link>
    </article>
  );
}
