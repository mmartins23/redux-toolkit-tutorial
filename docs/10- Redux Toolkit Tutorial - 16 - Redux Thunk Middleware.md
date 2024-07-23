### Summary of Redux Toolkit Tutorial - 16 - Redux Thunk Middleware

This tutorial demonstrates how to use `redux-thunk` middleware in Redux to handle asynchronous operations, particularly for fetching data from an API.

1. **Initial State**:
   - The initial state includes `loading`, `users`, and `error`.
   - `loading` tracks whether a request is in progress.
   - `users` holds the fetched data.
   - `error` holds error messages in case of a failure.

2. **Action Types**:
   - `FETCH_USERS_REQUESTED`: Dispatched when a fetch request starts.
   - `FETCH_USERS_SUCCEEDED`: Dispatched when a fetch request succeeds, carrying the user data.
   - `FETCH_USERS_FAILED`: Dispatched when a fetch request fails, carrying the error message.

3. **Action Creators**:
   - `fetchUsersRequest`: Returns the `FETCH_USERS_REQUESTED` action.
   - `fetchUserSuccess`: Returns the `FETCH_USERS_SUCCEEDED` action with users as the payload.
   - `fetchUserFailure`: Returns the `FETCH_USERS_FAILED` action with an error message as the payload.

4. **Reducer**:
   - Manages state changes based on action types:
     - `FETCH_USERS_REQUESTED`: Sets `loading` to true.
     - `FETCH_USERS_SUCCEEDED`: Sets `loading` to false, updates `users` with the fetched data, and clears `error`.
     - `FETCH_USERS_FAILED`: Sets `loading` to false, clears `users`, and updates `error` with the error message.

5. **Async Action Creator (Thunk)**:
   - `fetchUsers`: An asynchronous action creator using `redux-thunk`.
   - It dispatches `fetchUsersRequest` to start the request.
   - Makes an HTTP GET request to fetch user data.
   - On success, dispatches `fetchUserSuccess` with the user data.
   - On failure, dispatches `fetchUserFailure` with the error message.

6. **Store Configuration**:
   - The Redux store is created with the reducer and `thunkMiddleware` applied to handle async actions.
   - The store subscribes to log state updates.

**Code Example**:
```javascript
const redux = require("redux");
const axios = require('axios');
const createStore = redux.createStore;
const applyMiddleware = redux.applyMiddleware;
const thunkMiddleware = require('redux-thunk').default;

const initialState = {
    loading: false,
    users: [],
    error: "",
}

const FETCH_USERS_REQUESTED = "FETCH_USERS_REQUESTED";
const FETCH_USERS_SUCCEEDED = "FETCH_USERS_SUCCEEDED";
const FETCH_USERS_FAILED = "FETCH_USERS_FAILED";

const fetchUsersRequest = () => {
    return {
        type: FETCH_USERS_REQUESTED
    }
}

const fetchUserSuccess = (users) => {
    return {
        type: FETCH_USERS_SUCCEEDED,
        payload: users,
    }
}

const fetchUserFailure = (error) => {
    return {
        type: FETCH_USERS_FAILED,
        payload: error,
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USERS_REQUESTED:
            return {
                ...state,
                loading: true,
            }
        case FETCH_USERS_SUCCEEDED:
            return {
                loading: false,
                users: action.payload,
                error: ""
            }
        case FETCH_USERS_FAILED:
            return {
                loading: false,
                users: [],
                error: action.payload,
            }
        default:
            return state;
    }
}

const fetchUsers = () => {
    return function (dispatch) {
        dispatch(fetchUsersRequest())
        axios.get("https://jsonplaceholder.typicode.com/users").then((response) => {
            const users = response.data.map(user => user.id);
            dispatch(fetchUserSuccess(users))
        })
            .catch(error => {
                dispatch(fetchUserFailure(error.message))
            })
    }
}

const store = createStore(reducer, applyMiddleware(thunkMiddleware));
store.subscribe(() => console.log(store.getState()));
store.dispatch(fetchUsers());
```

### Key Points:
- `redux-thunk` allows for dispatching functions (thunks) instead of plain action objects.
- Thunks can contain asynchronous logic, such as API calls.
- The state is updated based on the outcomes of the async operations, managing loading, success, and error states effectively.