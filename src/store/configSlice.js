import { createSlice } from "@reduxjs/toolkit";


const configSlice = createSlice({
    name: "config",
    initialState: {
        lang: "en",
        videoUrl: null,
        showTrailer: false,
    },
    reducers: {
        selectLang: (state, action) => {
            state.lang = action.payload;
        },
        setTrailer: (state, action) => {
            state.videoUrl = action.payload;
            state.showTrailer = true;
        },
        removeTrailer: (state, action) => {
            state.videoUrl = null;
            state.showTrailer = false;
        }
    }
})



export default configSlice.reducer;

export const { selectLang, setTrailer, removeTrailer } = configSlice.actions