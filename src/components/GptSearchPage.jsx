import { useSelector } from "react-redux";
import GptMovieSuggestion from "./GptMovieSuggestion";
import GptSearchBar from "./GptSearchBar";
import WatchTrailer from "./WatchTrailer";
import BG from "../assets/Netflix-BG.jpg";

const GptSearchPage = () => {
  const showTrailer = useSelector((store) => store.config?.showTrailer);

  return (
    <div>
      <div className="fixed inset-0 -z-10">
        <img
          className="h-full w-full object-cover"
          src={BG}
          alt="Background"
          onError={(e) => (e.target.style.display = "none")}
        />
        <div className="absolute inset-0 bg-black opacity-60"></div>
      </div>

      <div className="">
        <GptSearchBar />
        <GptMovieSuggestion />
      </div>

      {showTrailer && <WatchTrailer />}
    </div>
  );
};

export default GptSearchPage;
