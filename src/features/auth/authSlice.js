import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

const initialState = {
    data: null,
    status: 'loading',
}

export const getMe = createAsyncThunk(
    'auth/fetchMe', async()=>{
        try{
            const {data} = await axios.get('/auth/me')
            return data
        }catch(err){
            console.log(err)
            
        }

})

export const login = createAsyncThunk(
    'auth/loginUser', async({email, password})=>{
        try{
            const {data} = await axios.post('/auth/login', {
                email, password, 
            })
            if(data.token){
                window.localStorage.setItem('token', data.token)
            }
            return data
        }catch(err){
            const message = err.response.data;
            return err;
        }

}) 

export const register = createAsyncThunk(
    'auth/registerUser', async({email, password, fullName, avatarUrl})=>{
        try{
            const {data} = await axios.post('/auth/register', {
                email, password, fullName, avatarUrl,
            })
            if(data.token){
                window.localStorage.setItem('token', data.token)
            }
            return data
        }catch(err){
            console.log(err)
            return err;
        }

}) 

export const authSlice = createSlice({
    name: 'auth',
    initialState, 
    reducers: {
        logout: (state)=>{
            state.status ='loading';
            state.data = null;
            console.log(state.data);
            
        }

    },
    extraReducers:{
        [register.pending]: (state)=> {
            state.status='loading'
        },
        [register.fulfilled]: (state, action)=> {
            state.status='loaded'
            state.data=action.payload
        }, 
        [register.rejected]: (state, action)=> {
            state.status='error'
            state.data=null
        },
        [login.pending]: (state)=> {
            state.status='loading'
        },
        [login.fulfilled]: (state, action)=> {
            state.status='loaded'
            state.data=action.payload
            
        },
        [login.rejected]: (state, action)=> {
            state.status='error'
            state.data=null
        },
        [getMe.pending]: (state)=> {
            state.status='loading'
        },
        [getMe.fulfilled]: (state, action)=> {
            state.status='loaded'
            state.data=action.payload
            
        },
        [getMe.rejected]: (state, action)=> {
            state.status='error'
            state.data=null
        },
    }
})

export const selectIsAuth = state=>Boolean(state.auth.data)
export const { logout } = authSlice.actions;
export default authSlice.reducer

