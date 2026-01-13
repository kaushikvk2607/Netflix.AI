import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addGptMovieResult } from "../store/gptSlice";
const { VITE_TRAKT_CLIENT_ID } = import.meta.env;


export default function useSearchMovies(queries = []) {
    const dispatch = useDispatch();

    const searchMovies = async () => {
        if (!Array.isArray(queries) || queries.length === 0) return;

        try {
            let allResults = [];

            const fetchRequests = queries
                .map(q => q?.trim())
                .filter(Boolean)
                .map(q =>
                    fetch(
                        `https://api.trakt.tv/search/movie?query=${encodeURIComponent(q)}`,
                        {
                            headers: {
                                "Content-Type": "application/json",
                                "trakt-api-version": "2",
                                "trakt-api-key": VITE_TRAKT_CLIENT_ID,
                            },
                        }
                    )
                );

            const responses = await Promise.all(fetchRequests);

            const jsonResults = await Promise.all(
                responses.map(res => (res.ok ? res.json() : []))
            );

            jsonResults.forEach(data => {
                const movies =
                    data
                        ?.filter(item => item.type === "movie")
                        ?.map(item => item.movie) || [];

                allResults.push({ ...movies });
            });

            dispatch(addGptMovieResult(allResults));
        } catch (err) {
            console.error("Trakt Error:", err);
        }
    };

    useEffect(() => {
        searchMovies();
    }, [queries]);
}
