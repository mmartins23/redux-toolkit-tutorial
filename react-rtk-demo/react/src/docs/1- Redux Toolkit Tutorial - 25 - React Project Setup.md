### Summary of Redux Toolkit Tutorial - 25 - React Project Setup

In this tutorial, we set up a Redux Toolkit project in a React application by creating slices for managing different states and integrating them into the Redux store. Below are the key components and configurations provided:

1. **Store Configuration**:
    - Created a Redux store using `configureStore` from Redux Toolkit.
    - Added `cakeReducer`, `icecreamReducer`, and `userReducer` to the store's reducer configuration.

    ```javascript
    import { configureStore } from '@reduxjs/toolkit';
    import cakeReducer from '../features/cake/cakeSlice';
    import icecreamReducer from '../features/icecream/icecreamSlice';
    import userReducer from '../features/user/userSlice';

    const store = configureStore({
        reducer: {
            cake: cakeReducer,
            icecream: icecreamReducer,
            user: userReducer,
        },
    });

    export default store;
    ```

2. **Cake Slice**:
    - Defined a slice for managing the cake state with an initial state, and two reducers: `ordered` and `restocked`.

    ```javascript
    import { createSlice } from "@reduxjs/toolkit";

    const initialState = {
        numOfCakes: 10,
    };

    const cakeSlice = createSlice({
        name: 'cake',
        initialState,
        reducers: {
            ordered: (state) => {
                state.numOfCakes--;
            },
            restocked: (state, action) => {
                state.numOfCakes += action.payload;
            },
        },
    });

    export default cakeSlice.reducer;
    export const { ordered, restocked } = cakeSlice.actions;
    ```

3. **Cake View Component**:
    - A React component that displays the number of cakes and includes buttons to order and restock cakes.

    ```javascript
    const CakeView = () => {
        return (
            <div>
                <h2>Number of cakes - </h2>
                <button>Order cake</button>
                <button>Restock cake</button>
            </div>
        );
    };

    export default CakeView;
    ```

4. **Ice Cream Slice**:
    - Defined a slice for managing the ice cream state with an initial state, two reducers: `ordered` and `restocked`, and an extra reducer that decrements the number of ice creams when a cake is ordered.

    ```javascript
    import { ordered as cakeOrdered } from '../cake/cakeSlice';
    import { createSlice } from "@reduxjs/toolkit";

    const initialState = {
        numOfIceCreams: 20,
    };

    const icecreamSlice = createSlice({
        name: 'icecream',
        initialState,
        reducers: {
            ordered: (state) => {
                state.numOfIceCreams--;
            },
            restocked: (state, action) => {
                state.numOfIceCreams += action.payload;
            },
        },
        extraReducers: (builder) => {
            builder.addCase(cakeOrdered, (state) => {
                state.numOfIceCreams--;
            });
        },
    });

    export default icecreamSlice.reducer;
    export const { ordered, restocked } = icecreamSlice.actions;
    ```

5. **Ice Cream View Component**:
    - A React component that displays the number of ice creams and includes buttons to order and restock ice creams.

    ```javascript
    function IcecreamView() {
        return (
            <div>
                <h2>Number of ice creams - </h2>
                <button>Order ice cream</button>
                <button>Restock ice creams</button>
            </div>
        );
    }

    export default IcecreamView;
    ```

6. **User Slice**:
    - Defined a slice for managing user data with asynchronous actions using `createAsyncThunk` to fetch user data from an API.
    
    ```javascript
    import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
    import axios from 'axios';

    const initialState = {
        loading: false,
        users: [],
        error: '',
    };

    export const fetchUsers = createAsyncThunk('user/fetchUsers', () => {
        return axios
            .get('https://jsonplaceholder.typicode.com/users')
            .then(response => response.data.map(user => user.id));
    });

    const userSlice = createSlice({
        name: 'user',
        initialState,
        extraReducers: builder => {
            builder.addCase(fetchUsers.pending, state => {
                state.loading = true;
            });
            builder.addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
                state.error = '';
            });
            builder.addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.users = [];
                state.error = action.error.message;
            });
        },
    });

    export default userSlice.reducer;
    ```

7. **User View Component**:
    - A React component that displays a list of users.

    ```javascript
    const UserView = () => {
        return (
            <div>
                <h2>List of users</h2>
            </div>
        );
    };

    export default UserView;
    ```

8. **App Component**:
    - The main application component that includes `CakeView`, `IcecreamView`, and `UserView` components.

    ```javascript
    import './App.css';
    import CakeView from './features/cake/CakeView';
    import IcecreamView from './features/icecream/IcecreamView';
    import UserView from './features/user/UserView';

    function App() {
        return (
            <div>
                <CakeView />
                <IcecreamView />
                <UserView />
            </div>
        );
    }

    export default App;
    ```

This setup provides a structured approach to managing state in a React application using Redux Toolkit, with clear separation of concerns through slices and connected components.