import { useDispatch, useSelector } from "react-redux";
import { setTrailer } from "../store/configSlice";

const MovieCard = ({ title, poster, rating, videoUrl }) => {
  const dispatch = useDispatch();
  const posterUrl = poster
    ? poster.startsWith("http")
      ? poster
      : `https://${poster}`
    : "https://placehold.co/300x450/000/FFF?text=No+Poster";

  let safeRating;

  if (!rating || Number(rating) === 0) {
    safeRating = "N/A";
  } else {
    safeRating = Number(rating).toFixed(1);
  }

  const handleClick = () => {
    dispatch(setTrailer(videoUrl));
  };

  if (!poster) return null;

  return (
    <div
      onClick={handleClick}
      className="w-32 sm:w-36 md:w-48 pr-4 inline-block transition duration-300 transform hover:scale-110 hover:z-30 cursor-pointer"
    >
      <img
        className="w-full aspect-2/3 rounded-lg object-cover shadow-md"
        src={posterUrl}
        alt={title}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "https://placehold.co/300x450/000/FFF?text=No+Poster";
        }}
      />

      <div className="text-white mt-2 text-xs md:text-sm">
        <h3 className="font-semibold line-clamp-1">{title}</h3>
        <p className="text-gray-400">⭐ Rating: {safeRating}</p>
      </div>
    </div>
  );
};

export default MovieCard;
