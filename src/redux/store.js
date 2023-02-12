import { configureStore } from '@reduxjs/toolkit'; 
import authSlice from './reducers/authSlice';
import postsSlice from './reducers/postsSlice';
import chatSlice from './reducers/chatSlice';
import friendSlice from './reducers/friendSlice';

const store = configureStore({
    reducer: {  
        auth: authSlice.reducer,
        posts: postsSlice.reducer,
        chat: chatSlice.reducer,
        friends: friendSlice.reducer,
    }
});

export default store;