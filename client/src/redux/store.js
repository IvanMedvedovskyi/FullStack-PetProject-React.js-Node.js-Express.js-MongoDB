import { configureStore } from '@reduxjs/toolkit'
import authSlice from './features/auth/authSlice'
import postSlice from './features/posts/postsSlice'

export const store = configureStore({
    reducer: {
        auth: authSlice,
        post: postSlice,
    }
})

window.store = store