import { createSlice } from "@reduxjs/toolkit";
import { snackbarInitialState } from "../initialState";


const snackbarSlice = createSlice({
    name: "snackbar",
    initialState: snackbarInitialState,
    reducers: {
        reset: () => snackbarInitialState,
    }, 
    // extraReducers: (builder) => {
    //     builder

    // }
});

export const snackbarActions = snackbarSlice.actions;
export default snackbarSlice;
