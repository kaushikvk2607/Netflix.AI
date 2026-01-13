import useFetchMovies from "../hooks/useFetchMovies";
import GptSearchPage from "./GptSearchPage";
import Header from "./Header";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import WatchTrailer from "./WatchTrailer";
import { useSelector } from "react-redux";
import useOnlineStatus from "react-use-online-status-hook";

export default function Browse() {

  useFetchMovies("trending");
  const showTrailer = useSelector((store) => store.config?.showTrailer);

  const showGptSearch = useSelector((store) => store.gpt?.showGptSearch);

  const online = useOnlineStatus();

  return (
    <div className="min-h-screen bg-black/10">
      <Header />

      {!online ? (
        <div className="flex flex-col  items-center justify-start ">
          <p className="text-red-600 text-xl font-semibold bg-black px-6 py-3 mt-56 rounded-xl shadow-md border border-red-400/40">
             You are Offline — Please check your internet connection
          </p>
        </div>
      ) : (
        <>
          {showTrailer && <WatchTrailer />}

          {showGptSearch ? (
            <GptSearchPage />
          ) : (
            <>
              <MainContainer />
              <SecondaryContainer />
            </>
          )}
        </>
      )}
    </div>
  );
}
