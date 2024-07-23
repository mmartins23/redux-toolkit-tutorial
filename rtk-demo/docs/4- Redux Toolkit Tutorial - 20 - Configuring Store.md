### Summary: Redux Toolkit Tutorial - 20 - Configuring Store

This tutorial explains how to configure a Redux store using Redux Toolkit and manage a cake feature.

#### `store.js`

This file sets up the Redux store using `configureStore` from Redux Toolkit and includes the `cakeReducer`.

```javascript
const configureStore = require('@reduxjs/toolkit').configureStore;
const cakeReducer = require('../features/cake/cakeSlice');

const store = configureStore({
    reducer: {
        cake: cakeReducer,
    },
});

module.exports = store;
```

#### `index.js`

This file initializes the store, imports actions from the cake slice, logs the initial state, subscribes to state updates, dispatches actions, and then unsubscribes from the store updates.

```javascript
const store = require('./app/store');
const cakeActions = require('./features/cake/cakeSlice').cakeActions;

console.log("Initial state", store.getState());

const unsubscribe = store.subscribe(() => {
    console.log("Updated state", store.getState());
});

store.dispatch(cakeActions.ordered());
store.dispatch(cakeActions.ordered());
store.dispatch(cakeActions.ordered());
store.dispatch(cakeActions.restocked(3));

unsubscribe();
```

#### `cakeSlice.js`

This file creates a slice for the cake feature using `createSlice` from Redux Toolkit, defining the initial state and reducers for ordering and restocking cakes.

```javascript
const createSlice = require("@reduxjs/toolkit").createSlice;

const initialState = {
    numOfCakes: 10
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
        }
    },
});

module.exports = cakeSlice.reducer;
module.exports.cakeActions = cakeSlice.actions;
```

### Steps Summary

1. **Create Slice**:
   - Use `createSlice` to define the initial state and reducers for the cake feature.

2. **Configure Store**:
   - Use `configureStore` to set up the Redux store and include the `cakeReducer`.

3. **Initialize Store and Dispatch Actions**:
   - Import the store and actions in `index.js`.
   - Log the initial state.
   - Subscribe to state updates.
   - Dispatch actions to order and restock cakes.
   - Unsubscribe from the store updates.

This setup streamlines the process of managing state transitions and reduces boilerplate code using Redux Toolkit.