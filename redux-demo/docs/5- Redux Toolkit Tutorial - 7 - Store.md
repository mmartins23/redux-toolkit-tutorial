### Summary of Redux Toolkit Tutorial - 7 - Store

In this tutorial, we learn about the **Redux Store**, which is essential for holding the application's state and managing state changes in response to actions.

#### Key Concepts

- **Store**: Central object that holds the state of the application.
- **`createStore` Function**: Creates the Redux store.
- **Dispatching Actions**: Sending actions to the store to update the state.
- **Subscribing to State Changes**: Listening for changes in the store's state.

### Example: Creating and Using a Store

#### Importing Redux
First, we import the necessary functions from Redux:
```javascript
const redux = require("redux");
const createStore = redux.createStore;
```

#### Action Type and Action Creator
Define an action type and an action creator for ordering cakes:
```javascript
const CAKE_ORDERED = "CAKE_ORDERED";

function orderCake() {
    return {
        type: CAKE_ORDERED,
        quantity: 1,
    }
}
```

#### Initial State
Define the initial state of the application:
```javascript
const initialState = {
    numOfCakes: 10,
}
```

#### Reducer Function
Create a reducer function to handle state changes:
```javascript
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case CAKE_ORDERED:
            return {
                ...state,
                numOfCakes: state.numOfCakes - 1,
            }
        default:
            return state
    }
}
```

#### Creating the Store
Use the `createStore` function to create the Redux store with the reducer:
```javascript
const store = createStore(reducer);
console.log("Initial state", store.getState());
```

#### Subscribing to State Changes
Subscribe to state changes in the store and log the updated state:
```javascript
const unsubscribe = store.subscribe(() => console.log("Updated state", store.getState()));
```

#### Dispatching Actions
Dispatch actions to update the state:
```javascript
store.dispatch(orderCake());
store.dispatch(orderCake());
store.dispatch(orderCake());
```

#### Unsubscribing
Unsubscribe from the store to stop listening for state changes:
```javascript
unsubscribe();
```

### Output
- **Initial state**: `{ numOfCakes: 10 }`
- **Updated state** after each `orderCake` action:
  - After first dispatch: `{ numOfCakes: 9 }`
  - After second dispatch: `{ numOfCakes: 8 }`
  - After third dispatch: `{ numOfCakes: 7 }`

### Summary
- **Store**: Holds the application's state.
- **Creating a Store**: Use `createStore` with a reducer to create a store.
- **Dispatching Actions**: Use `store.dispatch(action)` to update the state.
- **Subscribing to Changes**: Use `store.subscribe(listener)` to listen for state updates.

By understanding and utilizing the Redux store, you can effectively manage and track the state of your application in a centralized manner.