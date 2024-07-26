import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice';
import { apiSlice } from './slices/apiSlice';
import adminAuthSlice from './slices/admin/adminAuthSlice'



const Store = configureStore({
    reducer : {
        auth : authReducer,
        adminauth: adminAuthSlice,
        [apiSlice.reducerPath] : apiSlice.reducer
    },
    middleware : (getDefaultMiddleware)=> getDefaultMiddleware().concat(apiSlice.middleware),
    devTools : true
});

export default Store