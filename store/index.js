import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/user/user.slice";

/*Main configuration of the store (from redux toolkit) that makes us able to keep information throw the pages */
export const store = configureStore({
    reducer: {
        user: userReducer
    },
});