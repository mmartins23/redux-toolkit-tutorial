### Redux Toolkit Tutorial - TypeScript Support

This tutorial focuses on integrating TypeScript with Redux Toolkit in a React application. It covers configuring the Redux store, creating slices with TypeScript, and using custom hooks for type safety throughout the application.

### Project Summary and Key Steps

1. **Configure Redux Store with TypeScript**:
    - Import necessary reducers.
    - Configure the store with these reducers.
    - Define and export `RootState` and `AppDispatch` types inferred from the store.

    ```typescript
    import { configureStore } from '@reduxjs/toolkit'
    import cakeReducer from '../features/cake/cakeSlice'
    import icecreamReducer from '../features/icecream/icecreamSlice'
    import userReducer from '../features/user/userSlice'

    const store = configureStore({
      reducer: {
        cake: cakeReducer,
        icecream: icecreamReducer,
        user: userReducer
      }
    })

    export default store
    export type RootState = ReturnType<typeof store.getState>
    export type AppDispatch = typeof store.dispatch
    ```

2. **Create Custom Hooks**:
    - Create `useAppDispatch` and `useAppSelector` hooks for type-safe usage of `useDispatch` and `useSelector`.

    ```typescript
    import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
    import type { RootState, AppDispatch } from './store'

    export const useAppDispatch = () => useDispatch<AppDispatch>()
    export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
    ```

3. **Define Redux Slices with TypeScript**:
    - Create slices for different features (e.g., cake, ice cream, user) with TypeScript, defining state types and action payloads.

    ```typescript
    // cakeSlice.ts
    import { createSlice, PayloadAction } from "@reduxjs/toolkit";

    type InitialState = {
        numOfCakes: number
    }

    const initialState: InitialState = {
        numOfCakes: 10
    }

    const cakeSlice = createSlice({
        name: 'cake',
        initialState,
        reducers: {
            ordered: (state) => {
                state.numOfCakes--;
            },
            restocked: (state, action: PayloadAction<number>) => {
                state.numOfCakes += action.payload;
            }
        },
    })

    export default cakeSlice.reducer;
    export const { ordered, restocked } = cakeSlice.actions;
    ```

4. **Use Custom Hooks in Components**:
    - Replace plain `useSelector` and `useDispatch` with `useAppSelector` and `useAppDispatch` in React components for type safety.

    ```typescript
    // CakeView.tsx
    import { useAppDispatch, useAppSelector } from '../../app/hooks';
    import { ordered, restocked } from './cakeSlice';

    const CakeView = () => {
        const numbOfCakes = useAppSelector(state => state.cake.numOfCakes);
        const dispatch = useAppDispatch();
        return (
            <div>
                <h2>Number of cakes - {numbOfCakes} </h2>
                <button onClick={() => dispatch(ordered())}>Order cake</button>
                <button onClick={() => dispatch(restocked(5))}>Restock cake</button>
            </div>
        )
    }

    export default CakeView;
    ```

5. **Handle Asynchronous Actions**:
    - Create an async thunk to fetch data and handle its states in the slice.

    ```typescript
    // userSlice.ts
    import axios from 'axios'
    import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'

    type User = {
      id: number
      name: string
    }
    type InitialState = {
      loading: boolean
      users: User[]
      error: string
    }
    const initialState: InitialState = {
      loading: false,
      users: [],
      error: ''
    }

    export const fetchUsers = createAsyncThunk('user/fetchUsers', async () => {
      const response = await axios.get('https://jsonplaceholder.typicode.com/users')
      return response.data
    })

    const userSlice = createSlice({
      name: 'user',
      initialState,
      reducers: {},
      extraReducers: builder => {
        builder.addCase(fetchUsers.pending, state => {
          state.loading = true
        })
        builder.addCase(
          fetchUsers.fulfilled,
          (state, action: PayloadAction<User[]>) => {
            state.loading = false
            state.users = action.payload
            state.error = ''
          }
        )
        builder.addCase(fetchUsers.rejected, (state, action) => {
          state.loading = false
          state.users = []
          state.error = action.error.message || 'Something went wrong'
        })
      }
    })

    export default userSlice.reducer
    ```

6. **Use Thunks in Components**:
    - Dispatch async thunks within `useEffect` and handle loading, error, and success states in the UI.

    ```typescript
    // UserView.tsx
    import { useEffect } from 'react'
    import { useAppSelector, useAppDispatch } from '../../app/hooks'
    import { fetchUsers } from './userSlice'

    export const UserView = () => {
      const user = useAppSelector(state => state.user)
      const dispatch = useAppDispatch()
      useEffect(() => {
        dispatch(fetchUsers())
      }, [dispatch])

      return (
        <div>
          <h2>List of Users</h2>
          {user.loading && <div>Loading...</div>}
          {!user.loading && user.error ? <div>Error: {user.error}</div> : null}
          {!user.loading && user.users.length ? (
            <ul>
              {user.users.map(user => (
                <li key={user.id}>{user.name}</li>
              ))}
            </ul>
          ) : null}
        </div>
      )
    }
    ```

7. **Integrate Components and Redux Store**:
    - Ensure the Redux store and components are integrated in the main application file.

    ```typescript
    // App.tsx
    import './App.css'
    import CakeView from './features/cake/CakeView'
    import IcecreamView from './features/icecream/IcecreamView'
    import { UserView } from './features/user/UserView'

    function App() {
      return (
        <div className='App'>
          <CakeView />
          <IcecreamView />
          <UserView />
        </div>
      )
    }

    export default App

    // index.tsx
    import React from 'react';
    import ReactDOM from 'react-dom/client';
    import { Provider } from 'react-redux';
    import store from './app/store';
    import App from './App';
    import './index.css';

    const container = document.getElementById('root');
    const root = ReactDOM.createRoot(container!);

    root.render(
      <React.StrictMode>
        <Provider store={store}>
          <App />
        </Provider>
      </React.StrictMode>
    );
    ```

### Explanation

- **Type Safety with TypeScript**: Using TypeScript ensures type safety across actions, state, and thunks. This reduces runtime errors and enhances code readability and maintainability.
- **Custom Hooks**: `useAppDispatch` and `useAppSelector` provide type-safe alternatives to `useDispatch` and `useSelector`, making the code more robust.
- **Async Thunks**: Handling asynchronous operations with `createAsyncThunk` simplifies the process and integrates well with Redux Toolkit's slices.
- **Component Integration**: The components are designed to dispatch actions and select state slices in a type-safe manner, leveraging the benefits of TypeScript in a Redux setup.

This project showcases how to effectively integrate TypeScript with Redux Toolkit, creating a scalable and maintainable state management solution for React applications.