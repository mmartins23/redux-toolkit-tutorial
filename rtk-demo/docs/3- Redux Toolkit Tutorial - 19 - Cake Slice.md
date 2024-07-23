### Redux Toolkit Tutorial - 19 - Cake Slice

In this tutorial, we set up the "cake" feature using Redux Toolkit's `createSlice` function. Here’s a summary:

1. **Import `createSlice` from Redux Toolkit**:
   ```javascript
   const createSlice = require("@reduxjs/toolkit").createSlice;
   ```

2. **Define the Initial State**:
   - Create an `initialState` object to define the starting state for the feature:
     ```javascript
     const initialState = {
         numOfCakes: 10
     }
     ```

3. **Create a Slice**:
   - Use `createSlice` to define the name, initial state, and reducers for the cake feature:
     ```javascript
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
     })
     ```

4. **Export the Reducer and Actions**:
   - Export the reducer to be used in the store configuration:
     ```javascript
     module.exports = cakeSlice.reducer;
     ```
   - Export the actions to be used in the application to dispatch state changes:
     ```javascript
     module.exports.cakeActions = cakeSlice.actions;
     ```

This setup simplifies the process of defining actions and reducers by consolidating them into a single slice object, making the code more concise and readable. In the next steps, we will integrate this slice into our store and use the actions in our application.