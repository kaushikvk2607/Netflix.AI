import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNowPlayingMovies } from "../store/moviesSlice";
const { VITE_TRAKT_CLIENT_ID } = import.meta.env;


export default function useFetchMovies(query) {
    const dispatch = useDispatch();
    const nowPlayingMovies = useSelector((store) => store.movies?.nowPlayingMovies)

    const fetchMovies = async () => {
        try {
            const res = await fetch(
                `https://api.trakt.tv/movies/${query}?page=1&limit=50`,
                {
                    method: "GET",
                    headers: {
                        "trakt-api-version": "2",
                        "trakt-api-key": VITE_TRAKT_CLIENT_ID,
                    },
                }
            );

            if (!res.ok) {
                throw new Error("Failed to fetch movies");
            }

            const data = await res.json();

            const moviesArray = Array.isArray(data) ? data : [];

            dispatch(addNowPlayingMovies(moviesArray));
        } catch (error) {
            console.error("Trakt Error:", error);
        }
    }

    useEffect(() => {

        nowPlayingMovies.length === 0 && fetchMovies();
    }, [query, dispatch]);
}
