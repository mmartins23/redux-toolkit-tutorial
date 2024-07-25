import { configureStore } from '@reduxjs/toolkit'
import cakeReducer from '../features/cake/cakeSlice.ts'
import icecreamReducer from '../features/icecream/icecreamSlice.ts'
import userReducer from '../features/user/userSlice.ts'

const store = configureStore({
  reducer: {
    cake: cakeReducer,
    icecream: icecreamReducer,
    user: userReducer
  }
})

export default store
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch