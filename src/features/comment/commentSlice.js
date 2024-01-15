import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

const initialState = {
    comments: [],
    status: 'loading',
}

export const createComments = createAsyncThunk(
    'postsCreateComment', async({id, comment})=>{
        try{
            const {data} = await  axios.post('/comment', {
            id, comment
        });
        return data;
    }catch(err){
        console.log(err)
        return err;
    }
    }
)

export const fetchComments = createAsyncThunk(
    'getComments', async(id)=>{
        try{
            const {data} = await axios.get(`/comments/${id}`)
            console.log(id)
            return data
          }catch(err){
            console.log(err)
          }
    }
)

export const commentsSlice = createSlice({
    name:'comments',
    initialState,
    reducer: {

    },
    extraReducers: {
        [createComments.pending]:(state)=>{
            state.status = 'loading';
        },
        [createComments.fulfilled]:(state, action)=>{
            state.status='loaded'
            state.comments=action.payload
        },
        [createComments.rejected]:(state, action)=>{
            state.status = 'error';
        },
        [fetchComments.pending]:(state)=>{
            state.status = 'loading';
        },
        [fetchComments.fulfilled]:(state, action)=>{
            state.status='loaded'
            state.comments=action.payload
        },
        [fetchComments.rejected]:(state, action)=>{
            state.status = 'error';
        },
    },

})

export default commentsSlice.reducer;

