import { configureStore } from '@reduxjs/toolkit'; 
import authSlice from './reducers/authSlice';

const store = configureStore({
    reducer: {  
        auth: authSlice.reducer
        // productList: productsSlice.reducer,
        // cart: cartSlice.reducer,
        // user: userSlice.reducer,
        // order: orderSlice.reducer,
    }
});

export default store;