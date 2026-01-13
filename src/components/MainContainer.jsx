import { useSelector } from "react-redux";
import VideoBackGround from "./VideoBackGround";
import VideoTitle from "./VideoTitle";

export default function MainContainer() {
  const movies = useSelector((store) => store.movies?.nowPlayingMovies);

  if (!movies || movies.length === 0) return null;

  const randomIndex = Math.floor(Math.random() * movies.length);
  const mainMovie = movies[randomIndex];

  const movieData = mainMovie?.movie || {};

  const title = movieData.title || "Untitled";
  const trailer = movieData.trailer || null;
  const overview = movieData.overview || "No description available.";
  const logo = movieData.images?.logo?.[0] || null;
  const poster = movieData.images?.poster?.[0] || null;
  const homepage = movieData?.homepage;

  return (
    <div className="relative w-full h-auto">
      <VideoTitle
        title={title}
        trailer={trailer}
        logo={logo}
        overview={overview}
        homepage={homepage}
      />

      <VideoBackGround trailer={trailer} poster={poster} />
    </div>
  );
}
