### Summary of Redux Toolkit Tutorial - 14 - Middleware

This tutorial introduces the concept of middleware in Redux, focusing on integrating the `redux-logger` middleware to log actions and state changes.

1. **Action Types and Action Creators**:
   - Defined action types for ordering and restocking cakes and ice creams (`CAKE_ORDERED`, `CAKE_RESTOCKED`, `ICECREAM_ORDERED`, `ICECREAM_RESTOCKED`).
   - Created action creators (`orderCake`, `restockCake`, `orderIceCream`, `restockIceCream`) to dispatch these actions with payloads.

2. **Initial States**:
   - Defined initial states for cakes (`initialCakeState`) and ice creams (`initialIceCreamState`).

3. **Reducers**:
   - Created separate reducers (`cakeReducer` and `iceCreamReducer`) to handle actions for cakes and ice creams.
   - Each reducer updates its own piece of state based on the action type.

4. **Combining Reducers**:
   - Used `combineReducers` to merge `cakeReducer` and `iceCreamReducer` into a single root reducer (`rootReducer`).

5. **Applying Middleware**:
   - Imported `redux-logger` and created a logger middleware instance.
   - Applied the `logger` middleware using `applyMiddleware` when creating the Redux store.

6. **Store Creation and Subscription**:
   - Created a Redux store with the combined root reducer and applied middleware.
   - Subscribed to the store (though the subscription doesn't log updates directly in this example).

7. **Dispatching Actions**:
   - Dispatched several actions to order and restock cakes and ice creams.
   - Observed the logged actions and state updates through `redux-logger`.

**Code Example**:
```javascript
const redux = require("redux");
const createStore = redux.createStore;
const combineReducers = redux.combineReducers;
const applyMiddleware = redux.applyMiddleware;
const reduxLogger = require("redux-logger");
const logger = reduxLogger.createLogger();

const CAKE_ORDERED = "CAKE_ORDERED";
const CAKE_RESTOCKED = "CAKE_RESTOCKED";
const ICECREAM_ORDERED = "ICECREAM_ORDERED";
const ICECREAM_RESTOCKED = "ICECREAM_RESTOCKED";

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

const initialCakeState = {
    numOfCakes: 10,
}

const initialIceCreamState = {
    numOfIceCreams: 20,
}

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

const rootReducer = combineReducers({
    cake: cakeReducer,
    iceCream: iceCreamReducer,
})

const store = createStore(rootReducer, applyMiddleware(logger));
console.log("Initial state", store.getState());

const unsubscribe = store.subscribe(() => { });

store.dispatch(orderCake());
store.dispatch(orderCake());
store.dispatch(orderCake());

store.dispatch(restockCake(3));

store.dispatch(orderIceCream());
store.dispatch(orderIceCream());

store.dispatch(restockIceCream(2));

unsubscribe();
```

In this example, the `redux-logger` middleware logs every action dispatched to the Redux store, as well as the state before and after each action. This helps in debugging and understanding the flow of actions and state changes in the application.