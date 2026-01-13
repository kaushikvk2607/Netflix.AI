import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from "./moviesSlice";
import userReducer from "./userSlice";
import gptReducer from "./gptSlice"
import configSlice from "./configSlice"
const appStore = configureStore({
    reducer: {
        user: userReducer,
        movies: moviesReducer,
        gpt: gptReducer,
        config: configSlice,
    }
});

export default appStore;