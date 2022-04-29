import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getPosts } from "../../service/fetching";

const url = (new URL(window.location)).searchParams;

const initialState = {
    posts: [],
    postsLoadingStatus: 'idle',
    currentPage: url.get('page') || 1,
    searchParam: '',
}

export const fetchPosts = createAsyncThunk(
    'posts/fetchPosts',
    getPosts,
);

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        setCurrentPage: (state, action) => {state.currentPage = action.payload},
        setSearchParam: (state, action) => {state.searchParam = action.payload}, 
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPosts.pending, state => {state.postsLoadingStatus = 'loading'})
               .addCase(fetchPosts.fulfilled, (state, action) => {
                            state.postsLoadingStatus = 'idle';
                            state.posts = action.payload;})
               .addCase(fetchPosts.rejected, state => {state.postsLoadingStatus = 'error'})
               .addDefaultCase(() => {})
    } 
});

const { actions, reducer } = postsSlice;

export default reducer;
export const {
    setCurrentPage,
    setSearchParam,
} = actions;