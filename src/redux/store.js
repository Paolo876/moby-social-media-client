import { configureStore } from '@reduxjs/toolkit'; 
import authSlice from './reducers/authSlice';
import postsSlice from './reducers/postsSlice';
import chatSlice from './reducers/chatSlice';

const store = configureStore({
    reducer: {  
        auth: authSlice.reducer,
        posts: postsSlice.reducer,
        chat: chatSlice.reducer,
        // productList: productsSlice.reducer,
        // cart: cartSlice.reducer,
        // user: userSlice.reducer,
        // order: orderSlice.reducer,
    }
});

export default store;