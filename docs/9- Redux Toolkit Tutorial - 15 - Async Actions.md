### Summary of Redux Toolkit Tutorial - 15 - Async Actions

This tutorial explains how to handle asynchronous actions in Redux, focusing on fetching data from an API and managing loading states, success, and errors.

1. **Initial State**:
   - Defined the initial state with `loading`, `users`, and `error` properties.
   - `loading` tracks if a request is in progress.
   - `users` stores fetched user data.
   - `error` stores error messages if the request fails.

2. **Action Types**:
   - `FETCH_USERS_REQUESTED`: Indicates a user fetch request has started.
   - `FETCH_USERS_SUCCEEDED`: Indicates the user fetch request succeeded and data was received.
   - `FETCH_USERS_FAILED`: Indicates the user fetch request failed.

3. **Action Creators**:
   - `fetchUsersRequest`: Returns the `FETCH_USERS_REQUESTED` action.
   - `fetchUserSuccess`: Returns the `FETCH_USERS_SUCCEEDED` action with fetched users as the payload.
   - `fetchUserFailure`: Returns the `FETCH_USERS_FAILED` action with an error message as the payload.

4. **Reducer**:
   - Handles the three action types to update the state accordingly:
     - `FETCH_USERS_REQUESTED`: Sets `loading` to true.
     - `FETCH_USERS_SUCCEEDED`: Sets `loading` to false, updates `users` with the fetched data, and clears any error messages.
     - `FETCH_USERS_FAILED`: Sets `loading` to false, clears `users`, and updates `error` with the error message.

5. **Store Creation**:
   - Created a Redux store using the reducer.

**Code Example**:
```javascript
const redux = require("redux");
const createStore = redux.createStore;

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

const store = createStore(reducer);
```

### Key Takeaways:
- Handling async actions in Redux requires managing multiple states: loading, success, and error.
- Action creators and types help in dispatching the appropriate actions based on the request's lifecycle.
- The reducer updates the state based on the action received, allowing the UI to respond to the current state of the async request.