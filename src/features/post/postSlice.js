import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

const initialState = {
    posts: {
        item: [],
        status: 'loading',
    },
    tags:{
        item: [],
        status: 'loading',
    },
    
}

export const createPosts = createAsyncThunk(
    'postsCreatePosts', async({title, text, tags, imageUrl})=>{
        try{const {data} = await  axios.post('/posts', {
            title, text, tags, imageUrl
        });
        return data;
    }catch(err){
        console.log(err)
        return err;
    }
    }
)


export const getPosts = createAsyncThunk(
    'postsFetchPosts', async()=>{
        const {data} = await  axios.get('/posts');
        return data;
    }
)

export const removePost = createAsyncThunk(
    'postsFetchPosts', async(_id)=>{
        const {data} = await  axios.delete(`/posts/${_id}`);
        return data;
    }
)

export const postSlice = createSlice({
    name:'posts',
    initialState,
    reducer: {

    },
    extraReducers: {
        [getPosts.pending]:(state)=>{
            state.posts.status = 'loading';
        },
        [getPosts.fulfilled]:(state, action)=>{
            state.posts.item = action.payload;
            state.posts.status = 'loaded';
        },
        [getPosts.rejected]:(state, action)=>{
            state.posts.item = ['error'];  
            state.posts.status = 'loading';
        },
        [createPosts.pending]:(state)=>{
            state.posts.status = 'loading';
        },
        [createPosts.fulfilled]:(state, action)=>{
            state.posts.item = action.payload;
            state.posts.status = 'loaded';
        },
        [createPosts.rejected]:(state, action)=>{
            state.posts.item = [];  
            state.posts.status = 'error';
        },
        [removePost.pending]:(state)=>{
            state.posts.status = 'loading';
        },
        [removePost.fulfilled]:(state, action)=>{
            state.posts.item = action.payload;
            state.posts.status = 'loaded';
        },
        [removePost.rejected]:(state, action)=>{
            state.posts.item = ['error'];  
            state.posts.status = 'loading';
        },
    },

})

export const postsReducer = postSlice.reducer




