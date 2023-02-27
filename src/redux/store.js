import { configureStore, combineReducers } from '@reduxjs/toolkit'; 
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
        // rootReducer 
    }
});

const combinedReducer = combineReducers(store);

// const rootReducer = (state, action) => {
//     if (action.type === 'counter/logout') { // check for action type 
//       state = undefined;
//     }
//     return combinedReducer(state, action);
//   };





export default store;