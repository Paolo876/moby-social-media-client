import { configureStore } from '@reduxjs/toolkit'; 
import authSlice from './reducers/authSlice';
import postsSlice from './reducers/postsSlice';
import chatSlice from './reducers/chatSlice';
import friendSlice from './reducers/friendSlice';
import notificationSlice from './reducers/notificationSlice';
const store = configureStore({
    reducer: {  
        auth: authSlice.reducer,
        posts: postsSlice.reducer,
        chat: chatSlice.reducer,
        friends: friendSlice.reducer,
        notification: notificationSlice.reducer,
        // rootReducer 
    }
});


export default store;