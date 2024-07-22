### Summary of Redux Toolkit Tutorial - 8 - Restocking Cakes

In this tutorial, we focus on handling multiple types of actions in Redux, specifically the actions for ordering and restocking cakes.

#### Key Concepts

- **Multiple Action Types**: Managing different types of actions in a single reducer.
- **Payload**: Passing additional data with actions to specify details like quantity.

### Example: Ordering and Restocking Cakes

#### Importing Redux
First, we import the necessary functions from Redux:
```javascript
const redux = require("redux");
const createStore = redux.createStore;
```

#### Action Types
Define the action types for ordering and restocking cakes:
```javascript
const CAKE_ORDERED = "CAKE_ORDERED";
const CAKE_RESTOCKED = "CAKE_RESTOCKED";
```

#### Action Creators
Define action creators for ordering and restocking cakes:
```javascript
function orderCake() {
    return {
        type: CAKE_ORDERED,
        payload: 1,
    }
}

function restockCake(qty = 1) {
    return {
        type: CAKE_RESTOCKED,
        payload: qty,
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
Create a reducer function to handle the state changes for both action types:
```javascript
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case CAKE_ORDERED:
            return {
                ...state,
                numOfCakes: state.numOfCakes - 1,
            }
        case CAKE_RESTOCKED:
            return {
                ...state,
                numOfCakes: state.numOfCakes + action.payload,
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
Dispatch actions to order cakes and restock cakes:
```javascript
store.dispatch(orderCake());
store.dispatch(orderCake());
store.dispatch(orderCake());

store.dispatch(restockCake(3));
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
- **Updated state** after `restockCake` action:
  - After restocking 3 cakes: `{ numOfCakes: 10 }`

### Summary
- **Multiple Action Types**: Use different action types to manage various state changes.
- **Action Creators**: Functions that return action objects, including payload for additional data.
- **Reducer Handling**: A single reducer can handle multiple action types by using a switch statement.

By managing multiple action types within a reducer, you can handle complex state updates in your Redux application effectively.