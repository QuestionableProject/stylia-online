import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice"
import productReducer from "./slices/productSlice"
import curtReducer from "./slices/curtSlice"

export const store = configureStore({
    reducer: {
        user: userReducer,
        product: productReducer,
        curt: curtReducer,
    }
});