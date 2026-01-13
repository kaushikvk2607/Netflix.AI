import { createSlice } from "@reduxjs/toolkit";


const moviesSlice = createSlice({
    name: "movies",
    initialState: {
        nowPlayingMovies: [],
        allMovies: [],
    },
    reducers: {
        addNowPlayingMovies: (state, action) => {
            state.nowPlayingMovies = action.payload;
        },
        addAllMovies: (state, action) => {
            state.allMovies = action.payload;
        },
    },
});

export const { addNowPlayingMovies, addAllMovies } = moviesSlice.actions;
export default moviesSlice.reducer;
