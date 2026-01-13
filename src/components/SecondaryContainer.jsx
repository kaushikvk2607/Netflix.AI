import { useSelector } from "react-redux";
import { useFetchAllMovies } from "../hooks/useFetchAllMovies";
import MovieList from "./MovieList";

export default function SecondaryContainer() {
  useFetchAllMovies();

  const movies = useSelector((store) => store.movies?.allMovies) || [];

  const trending = movies.filter((item) => item.category === "trending");
  const anticipated = movies.filter((item) => item.category === "anticipated");
  const nowPlaying = movies.filter((item) => item.category === "now_playing");

  const nowPlayingMovies = nowPlaying.map((item) => ({
    movie: item,
  }));

  return (
    <div className="bg-black pb-16 px-3 sm:px-6 md:px-10 lg:px-12">
      <div
        className="
        relative
  -mt-10          /* default: mobile */
  sm:-mt-10     /* ≥640px */
  md:-mt-20     /* ≥768px */
  lg:-mt-10      /* ≥1024px */
  xl:-mt-24     /* ≥1280px (optional, better smoothing) */
  2xl:-mt-56    /* ≥1536px */
  z-20

"
      >
        <MovieList title="Trending" movies={trending} />
      </div>

      {/* Anticipated */}
      <div className="mt-8 sm:mt-10 md:mt-12">
        <MovieList title="Anticipated" movies={anticipated} />
      </div>

      {/* Now Playing */}
      <div className="mt-8 sm:mt-10 md:mt-12">
        <MovieList title="Now Playing" movies={nowPlayingMovies} />
      </div>
    </div>
  );
}
