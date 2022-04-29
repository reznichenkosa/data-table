import { configureStore } from "@reduxjs/toolkit";
import posts from "../components/PostsList/postsSlice";

const store = configureStore({
    reducer: {posts},
    middleware: getDefaultMiddleware => getDefaultMiddleware(),
    devTools: true,
})

export default store;