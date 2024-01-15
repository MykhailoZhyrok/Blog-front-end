import {configureStore} from '@reduxjs/toolkit'
import authSlice from '../features/auth/authSlice'
import commentsSlice from '../features/comment/commentSlice'
import {  postsReducer } from '../features/post/postSlice'

export const store = configureStore({
    reducer:{
        auth: authSlice,
        posts: postsReducer,
        comments: commentsSlice,
    },
}) 