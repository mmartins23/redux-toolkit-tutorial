### Summary of Redux Toolkit Tutorial - 11 - Multiple Reducers

In this tutorial, we explore how to manage multiple slices of state by using multiple reducers in Redux. Each reducer manages a distinct part of the application's state.

#### Key Concepts

- **Multiple Reducers**: Separate reducers for different slices of state.
- **Combining Reducers**: Use `combineReducers` to merge multiple reducers into a single reducer function.
- **Action Types and Action Creators**: Define action types and creators for different parts of the state.

### Example: Managing Cakes and Ice Creams

#### Importing Redux
First, we import the necessary functions from Redux:
```javascript
const redux = require("redux");
const createStore = redux.createStore;
const combineReducers = redux.combineReducers;
```

#### Action Types
Define action types for ordering and restocking cakes and ice creams:
```javascript
const CAKE_ORDERED = "CAKE_ORDERED";
const CAKE_RESTOCKED = "CAKE_RESTOCKED";
const ICECREAM_ORDERED = "ICECREAM_ORDERED";
const ICECREAM_RESTOCKED = "ICECREAM_RESTOCKED";
```

#### Action Creators
Define action creators for ordering and restocking cakes and ice creams:
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

function orderIceCream(qty = 1) {
    return {
        type: ICECREAM_ORDERED,
        payload: qty,
    }
}

function restockIceCream(qty = 1) {
    return {
        type: ICECREAM_RESTOCKED,
        payload: qty,
    }
}
```

#### Initial States
Define the initial states for cakes and ice creams:
```javascript
const initialCakeState = {
    numOfCakes: 10,
}

const initialIceCreamState = {
    numOfIceCreams: 20,
}
```

#### Reducer Functions
Create reducer functions to handle the state changes for cakes and ice creams:
```javascript
const cakeReducer = (state = initialCakeState, action) => {
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

const iceCreamReducer = (state = initialIceCreamState, action) => {
    switch (action.type) {
        case ICECREAM_ORDERED:
            return {
                ...state,
                numOfIceCreams: state.numOfIceCreams - 1,
            }
        case ICECREAM_RESTOCKED:
            return {
                ...state,
                numOfIceCreams: state.numOfIceCreams + action.payload,
            }
        default:
            return state
    }
}
```

#### Combining Reducers
Use `combineReducers` to merge the cake and ice cream reducers into a single root reducer:
```javascript
const rootReducer = combineReducers({
    cake: cakeReducer,
    iceCream: iceCreamReducer,
});
```

#### Creating the Store
Use the `createStore` function to create the Redux store with the combined reducers:
```javascript
const store = createStore(rootReducer);
console.log("Initial state", store.getState());
```

#### Subscribing to State Changes
Subscribe to state changes in the store and log the updated state:
```javascript
const unsubscribe = store.subscribe(() => console.log("Updated state", store.getState()));
```

#### Dispatching Actions
Dispatch actions to order and restock cakes and ice creams:
```javascript
store.dispatch(orderCake());
store.dispatch(orderCake());
store.dispatch(orderCake());

store.dispatch(restockCake(3));

store.dispatch(orderIceCream());
store.dispatch(orderIceCream());
store.dispatch(orderIceCream());

store.dispatch(restockIceCream(5));
```

#### Unsubscribing
Unsubscribe from the store to stop listening for state changes:
```javascript
unsubscribe();
```

### Output
- **Initial state**: `{ cake: { numOfCakes: 10 }, iceCream: { numOfIceCreams: 20 } }`
- **Updated state** after dispatching actions:
  - After ordering cakes: `{ cake: { numOfCakes: 7 }, iceCream: { numOfIceCreams: 20 } }`
  - After restocking cakes: `{ cake: { numOfCakes: 10 }, iceCream: { numOfIceCreams: 20 } }`
  - After ordering ice creams: `{ cake: { numOfCakes: 10 }, iceCream: { numOfIceCreams: 17 } }`
  - After restocking ice creams: `{ cake: { numOfCakes: 10 }, iceCream: { numOfIceCreams: 22 } }`

### Summary
- **Multiple Reducers**: Manage different slices of state with separate reducers.
- **Combining Reducers**: Use `combineReducers` to create a single root reducer from multiple reducers.
- **Action Creators**: Functions that return action objects for different parts of the state.
- **Reducer Handling**: Each reducer handles specific actions related to its slice of state.

By using multiple reducers and combining them, you can manage complex state structures in your Redux application effectively.