import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const GptMovieSuggestion = () => {
  const { gptMovies, gptResults } = useSelector((store) => store.gpt);

  if (!gptMovies?.length || !gptResults?.length) return null;

  const combined = gptMovies.map((item, index) => {
    const rawMovies = Object.values(item);

    const wrappedMovies = rawMovies.map((movieData) => ({
      movie: movieData,
    }));

    return {
      title: gptResults[index],
      movies: wrappedMovies,
    };
  });

  if (!gptMovies?.length || !gptResults?.length) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-red-600"></div>
      </div>
    );
  }

  return (
    <div className="p-4 m-4  bg-black/60 rounded-xl text-white">
      <div>
        {combined.map((entry, index) => (
          <MovieList key={index} title={entry.title} movies={entry.movies} />
        ))}
      </div>
    </div>
  );
};

export default GptMovieSuggestion;
