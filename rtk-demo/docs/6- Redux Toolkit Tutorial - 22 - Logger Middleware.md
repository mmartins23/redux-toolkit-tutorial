### Summary: Redux Toolkit Tutorial - 21 - Ice Cream Feature

This tutorial explains how to add an ice cream feature to the Redux store using Redux Toolkit.

#### `store.js`

This file configures the Redux store to include both cake and ice cream reducers.

```javascript
const { configureStore } = require('@reduxjs/toolkit');
const cakeReducer = require("../features/cake/cakeSlice");
const icecreamReducer = require("../features/icecream/icecreamSlice");

const store = configureStore({
    reducer: {
        cake: cakeReducer,
        icecream: icecreamReducer,
    },
});

module.exports = store;
```

#### `icecreamSlice.js`

This file creates a slice for the ice cream feature using `createSlice` from Redux Toolkit, defining the initial state and reducers for ordering and restocking ice creams.

```javascript
const { createSlice } = require("@reduxjs/toolkit");

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
});

module.exports = icecreamSlice.reducer;
module.exports.icecreamActions = icecreamSlice.actions;
```

#### `index.js`

This file initializes the store, imports actions from the cake and ice cream slices, logs the initial state, subscribes to state updates, dispatches actions for both cake and ice cream, and then unsubscribes from the store updates.

```javascript
const store = require('./app/store');
const cakeActions = require('./features/cake/cakeSlice').cakeActions;
const icecreamActions = require('./features/icecream/icecreamSlice').icecreamActions;

console.log("Initial state", store.getState());

const unsubscribe = store.subscribe(() => {
    console.log("Updated state", store.getState());
});

store.dispatch(cakeActions.ordered());
store.dispatch(cakeActions.ordered());
store.dispatch(cakeActions.ordered());
store.dispatch(cakeActions.restocked(3));

store.dispatch(icecreamActions.ordered());
store.dispatch(icecreamActions.ordered());
store.dispatch(icecreamActions.restocked(2));

unsubscribe();
```

### Steps Summary

1. **Create Slice for Ice Cream**:
   - Use `createSlice` to define the initial state and reducers for the ice cream feature.

2. **Configure Store**:
   - Use `configureStore` to set up the Redux store and include both `cakeReducer` and `icecreamReducer`.

3. **Initialize Store and Dispatch Actions**:
   - Import the store and actions in `index.js`.
   - Log the initial state.
   - Subscribe to state updates.
   - Dispatch actions to order and restock cakes and ice creams.
   - Unsubscribe from the store updates.

This setup demonstrates how to manage multiple slices of state (cakes and ice creams) using Redux Toolkit, simplifying the state management process and reducing boilerplate code.