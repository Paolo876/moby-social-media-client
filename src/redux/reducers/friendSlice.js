import { createSlice } from "@reduxjs/toolkit";
import { friendsInitialState } from "../initialState";
import { } from "./friendReducers"

const friendSlice = createSlice({
    name: "friends",
    initialState: friendsInitialState,
    reducers: {
    }, 
    extraReducers: (builder) => {
        builder

    }
});

export const friendActions = friendSlice.actions;
export default friendSlice;