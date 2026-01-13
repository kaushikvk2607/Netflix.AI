import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/Netflix-Logo.png";
import USER_AVTAR from "../assets/Profile-Icon.jpg";
import { listenToAuthChanges, signOutUser } from "../services/authService";
import { selectLang } from "../store/configSlice";
import { removeGptMovieResult, toggleGptSearchView } from "../store/gptSlice";
import { SUPPORTed_LANGUAGES } from "../utils/languageConstants";
export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const showGptSearch = useSelector((store) => store.gpt?.showGptSearch);

  useEffect(() => {
    const unsubscribe = listenToAuthChanges(dispatch, navigate);

    return () => {
      unsubscribe();
    };
  }, []);

  const handleSignOut = async () => {
    try {
      await signOutUser();
    } catch (error) {
      navigate("/error");
    }
  };

  const user = useSelector((store) => store.user);
  const Profile = user?.photoURL || USER_AVTAR;

  const handleLanguageSelect = (value) => {
    dispatch(selectLang(value));
  };

  const handleSearchClick = () => {
    dispatch(toggleGptSearchView());
    dispatch(removeGptMovieResult());
  };

  return (
    <>
      <div className="absolute top-0 left-0 w-full z-20 bg-linear-to-b from-black to-transparent flex justify-between items-center">
        <div className="px-2 sm:px-8 py-2">
          <img className="w-24 sm:w-36 md:w-44" src={Logo} alt="Netflix Logo" />
        </div>
        {user && (
          <div className="px-2 sm:px-8 py-2 flex items-center space-x-2 sm:space-x-4">
            {showGptSearch && (
              <select
                name="lang"
                onChange={(e) => handleLanguageSelect(e.target.value)}
                className="bg-gray-800 text-white 
             px-2 py-2 
             text-xs
             rounded-md cursor-pointer 
             outline-none border border-gray-700
             hover:border-gray-500 
             focus:border-red-500 focus:ring-2 focus:ring-red-500
             transition-all duration-200"
              >
                {SUPPORTed_LANGUAGES.map((lang) => (
                  <option key={lang.identifier} value={lang.identifier}>
                    {lang.name}
                  </option>
                ))}
              </select>
            )}

            <button
              onClick={handleSearchClick}
              className="px-3 sm:px-4 py-1.5 sm:py-2 
                   bg-purple-600 hover:bg-purple-700 
                   text-white font-semibold text-xs sm:text-sm 
                   rounded-md shadow-md hover:shadow-lg 
                   transition-all duration-200"
            >
              {showGptSearch ? "Home" : "GPT Search"}
            </button>
            <img
              src={Profile}
              alt="User Profile Icon"
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-sm object-cover cursor-pointer"
            />
            <button
              onClick={handleSignOut}
              className="text-white text-xs font-bold sm:text-sm md:text-base opacity-90 hover:opacity-100 transition duration-150 cursor-pointer p-1"
            >
              (Sign Out)
            </button>
          </div>
        )}
      </div>
    </>
  );
}
