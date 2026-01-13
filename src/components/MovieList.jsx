import MovieCard from "./MovieCard";

const MovieList = ({ title, movies = [] }) => {
  const scrollbarStyles = {
    msOverflowStyle: "none",
    scrollbarWidth: "none",
  };

  return (
    <div className="mt-6 md:mt-10">
      {/* 1. Define the Fade-in Animation locally */}
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-up {
          animation: fadeUp 0.5s ease-out forwards;
          opacity: 0; /* Hidden initially */
        }
          .animate-fade-up-header {
            animation: fadeUp 0.7s ease-out forwards;
            opacity: 0;
            animation-delay: 0.2s; /* header animates slightly later */
  }
      `}</style>

      <h1 className="text-xl md:text-3xl text-white mb-4 pt-2 font-bold animate-fade-up-header">
        {title}
      </h1>

      <div
        className="flex overflow-x-scroll no-scrollbar scroll-smooth"
        style={scrollbarStyles}
      >
        <div className="flex space-x-6">
          {movies.map((item, index) => {
            const movie = item?.movie || item || {};

            const rating =
              typeof movie.rating === "number"
                ? movie.rating.toFixed(1)
                : "N/A";

            return (
              <div
                key={movie?.ids?.trakt || movie?.id || Math.random()}
                className="animate-fade-up shrink-0"
                style={{
                  animationDelay: `${index * 0.1}s`, // 2. Stagger effect: 0.1s delay per card
                }}
              >
                <MovieCard
                  title={movie?.title || "No Title"}
                  released={movie?.released || "N/A"}
                  poster={
                    movie?.images?.poster?.[0] || movie?.poster_path || ""
                  }
                  rating={rating}
                  videoUrl={movie?.trailer}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
