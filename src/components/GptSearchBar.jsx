import { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import useSearchMovies from "../hooks/useSearchMovie";
import { geminiResults } from "../utils/gemini";
import { lang } from "../utils/languageConstants";
import { addGptResult } from "../store/gptSlice";

const GptSearchBar = () => {
  const dispatch = useDispatch();
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isDisabled, setIsDisabled] = useState(true); // <-- new state
  const ln = useSelector((store) => store.config?.lang);

  const movies = useSelector((store) => store.gpt?.gptMovies);
  const searchText = useRef(null);

  useSearchMovies(queries);

  const handleSubmit = async () => {
    setErrorMessage(null);
    setLoading(true);
    setIsDisabled(true);

    try {
      const results = await geminiResults(searchText.current.value);

      const list = results
        .split(",")
        .map((x) => x.trim())
        .filter((x) => x.length > 0);

      if (!list.length) {
        throw new Error("No valid movie names found from AI.");
      }
      dispatch(addGptResult(list));

      setQueries(list);
    } catch (error) {
      console.log(error);
      setErrorMessage(error.message || "Something went wrong!");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (queries.length > 0) {
      setLoading(false);
      setIsDisabled(false);
    }
  }, [movies]);

  const handleInputChange = () => {
    const value = searchText.current?.value || "";
    setIsDisabled(value.trim() === "" || loading);
    setErrorMessage("");
  };

  return (
    <div className="pt-[30%] sm:pt-[10%] flex justify-center relative">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="bg-black bg-opacity-60 p-4 rounded-xl 
                   w-[90%] sm:w-3/4 md:w-1/2 
                   grid grid-cols-12 gap-3"
      >
        <input
          type="text"
          ref={searchText}
          placeholder={lang[ln].gptSearchPlaceholder}
          onChange={handleInputChange}
          className="col-span-9 p-3 rounded-lg 
                     bg-white text-black 
                     focus:outline-none focus:ring-2 focus:ring-red-500"
        />

        <button
          onClick={handleSubmit}
          disabled={isDisabled}
          className={`col-span-3 px-2 py-3 
             bg-red-600 text-white font-semibold text-sm 
             rounded-lg shadow-md transition-all duration-200
             ${
               isDisabled
                 ? "opacity-70 cursor-not-allowed"
                 : "hover:bg-red-700 hover:shadow-lg"
             }`}
        >
          {loading ? "Generating results..." : lang[ln].search}
        </button>

        {errorMessage && (
          <div className="flex justify-center mt-3">
            <p className="bg-red-100 text-red-700 border border-red-300 px-4 py-2 rounded-lg shadow-sm text-sm font-semibold text-center w-fit">
              {errorMessage}
            </p>
          </div>
        )}
      </form>
    </div>
  );
};

export default GptSearchBar;
