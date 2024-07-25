# Redux Toolkit Tutorial - TypeScript Support

This repository contains the code for the Redux Toolkit Tutorial with TypeScript support, based on the YouTube tutorial series. The project demonstrates the integration of Redux Toolkit in a React application, using TypeScript for type safety.

## Table of Contents
- [Introduction](#introduction)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Key Concepts](#key-concepts)
  - [Store Configuration](#store-configuration)
  - [Slices](#slices)
  - [Custom Hooks](#custom-hooks)
  - [Async Thunks](#async-thunks)
  - [Components](#components)
- [Running the Project](#running-the-project)
- [Contributing](#contributing)
- [License](#license)

## Introduction
This tutorial guides you through setting up Redux Toolkit with TypeScript in a React application. You'll learn how to configure the store, create slices, dispatch actions, and handle asynchronous operations, all while ensuring type safety with TypeScript.

## Getting Started

### Prerequisites
- Node.js (>= 14.x)
- npm or yarn

### Installation
1. Clone the repository:
    ```sh
    git clone https://github.com/your-username/redux-toolkit-tutorial.git
    cd redux-toolkit-tutorial
    ```

2. Install dependencies:
    ```sh
    npm install
    # or
    yarn install
    ```

### Running the Project
To start the development server:
```sh
npm start
# or
yarn start
```
Open your browser and navigate to `http://localhost:3000`.

## Project Structure
```
redux-toolkit-tutorial/
├── src/
│   ├── app/
│   │   ├── hooks.ts
│   │   ├── store.ts
│   ├── features/
│   │   ├── cake/
│   │   │   ├── cakeSlice.ts
│   │   │   ├── CakeView.tsx
│   │   ├── icecream/
│   │   │   ├── icecreamSlice.ts
│   │   │   ├── IcecreamView.tsx
│   │   ├── user/
│   │   │   ├── userSlice.ts
│   │   │   ├── UserView.tsx
│   ├── App.tsx
│   ├── index.tsx
├── package.json
├── README.md
```

## Key Concepts

### Store Configuration
The store is configured with slices for cake, ice cream, and user features.

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

### Slices
Slices define the state structure and reducers for each feature.

#### cakeSlice.ts
```typescript
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

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
    ordered: state => {
      state.numOfCakes--
    },
    restocked: (state, action: PayloadAction<number>) => {
      state.numOfCakes += action.payload
    }
  }
})

export default cakeSlice.reducer
export const { ordered, restocked } = cakeSlice.actions
```

### Custom Hooks
Custom hooks provide type-safe wrappers for `useSelector` and `useDispatch`.

```typescript
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from './store'

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
```

### Async Thunks
Async thunks handle asynchronous actions, such as fetching data from an API.

#### userSlice.ts
```typescript
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
    builder.addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
      state.loading = false
      state.users = action.payload
      state.error = ''
    })
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.loading = false
      state.users = []
      state.error = action.error.message || 'Something went wrong'
    })
  }
})

export default userSlice.reducer
```

### Components
Components use the custom hooks to dispatch actions and select state.

#### CakeView.tsx
```typescript
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { ordered, restocked } from './cakeSlice'

const CakeView = () => {
  const numbOfCakes = useAppSelector(state => state.cake.numOfCakes)
  const dispatch = useAppDispatch()
  return (
    <div>
      <h2>Number of cakes - {numbOfCakes} </h2>
      <button onClick={() => dispatch(ordered())}>Order cake</button>
      <button onClick={() => dispatch(restocked(5))}>Restock cake</button>
    </div>
  )
}

export default CakeView
```

#### UserView.tsx
```typescript
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

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License
This project is licensed under the MIT License.