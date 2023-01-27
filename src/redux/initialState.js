/**
 * authInitialState
 */
export const authInitialState = {
    user: null,
    isAuthReady: false,
    isLoading: true,    //set to true to prevent render before auth data is fetched.
    error: null,
};

/**
 * postsInitialState
 */
export const postsInitialState = {
    posts: [],
    bookmarks: [],
    isLoading: false,
    error: null,
};

