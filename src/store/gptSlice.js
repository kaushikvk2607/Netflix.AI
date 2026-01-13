import { createSlice } from "@reduxjs/toolkit";


const gptSlice = createSlice({
    name: "gpt",
    initialState: {
        showGptSearch: false,
        gptMovies: [],
        gptResults: []
    },
    reducers: {
        toggleGptSearchView: (state, action) => {
            state.showGptSearch = !state.showGptSearch;
        },
        addGptMovieResult: (state, action) => {
            state.gptMovies = action.payload;
        },
        addGptResult: (state, action) => {
            state.gptResults = action.payload
        },
        removeGptMovieResult: (state, action) => {
            state.gptMovies = [];
            state.gptResults = []
        }
    }
});


export default gptSlice.reducer;

export const { toggleGptSearchView, addGptMovieResult, addGptResult, removeGptMovieResult } = gptSlice.actions;