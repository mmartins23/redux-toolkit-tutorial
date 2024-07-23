### Steps to Add Extra Reducers in Redux Toolkit

1. **Import Required Modules**:
   - Import the necessary action from another slice and `createSlice` from `@reduxjs/toolkit`.

2. **Define Initial State**:
   - Create an initial state object for the slice you are working on.

3. **Create the Slice**:
   - Use `createSlice` to define the slice, specifying `name`, `initialState`, `reducers`, and `extraReducers`.

4. **Add Extra Reducers**:
   - Utilize the `extraReducers` property to add cases for actions from other slices using a builder callback.

5. **Export the Reducer and Actions**:
   - Export the generated reducer and actions from the slice.

#### Detailed Steps with Code

1. **Import Required Modules**:
   ```javascript
   const { cakeActions } = require("../cake/cakeSlice");
   const { createSlice } = require("@reduxjs/toolkit");
   ```

2. **Define Initial State**:
   ```javascript
   const initialState = {
       numOfIceCreams: 20,
   };
   ```

3. **Create the Slice**:
   ```javascript
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
   ```

4. **Add Extra Reducers**:
   - Use the `extraReducers` property within the `createSlice` function to handle actions from other slices.
   - Utilize a builder function to add the necessary cases.
   ```javascript
       extraReducers: (builder) => {
           builder.addCase(cakeActions.ordered, (state) => {
               state.numOfIceCreams--;
           });
       },
   });
   ```

5. **Export the Reducer and Actions**:
   ```javascript
   module.exports = icecreamSlice.reducer;
   module.exports.icecreamActions = icecreamSlice.actions;
   ```

### Explanation

- **Import Required Modules**: You need to bring in actions from other slices that you want to handle in your current slice.
- **Define Initial State**: This sets up the initial state for your slice, ensuring that the state has the required structure.
- **Create the Slice**: The `createSlice` function is used to define the slice, including its `name`, `initialState`, and local `reducers`.
- **Add Extra Reducers**: The `extraReducers` property allows you to handle actions that are defined outside of the slice. By using a builder function, you can add cases for these external actions.
- **Export the Reducer and Actions**: Finally, export the reducer and actions so they can be used elsewhere in your application.

This approach ensures that your slice can respond to actions from other slices, maintaining modular and scalable state management.


*** 

```js
// Importing the required action from the cake slice and the createSlice function from Redux Toolkit
const { cakeActions } = require("../cake/cakeSlice");
const { createSlice } = require("@reduxjs/toolkit");

// Defining the initial state for the icecream slice
const initialState = {
    numOfIceCreams: 20,  // Setting initial number of ice creams to 20
}

// Creating the icecream slice using createSlice
const icecreamSlice = createSlice({
    name: 'icecream',  // Naming the slice 'icecream'
    initialState,  // Setting the initial state
    reducers: {  // Defining local reducers for the icecream slice
        ordered: (state) => {
            state.numOfIceCreams--;  // Decrement the number of ice creams by 1 when 'ordered' action is dispatched
        },
        restocked: (state, action) => {
            state.numOfIceCreams += action.payload;  // Increment the number of ice creams by the payload amount when 'restocked' action is dispatched
        }
    },
    extraReducers: (builder) => {  // Adding extra reducers to handle actions from other slices
        builder.addCase(cakeActions.ordered, (state) => {
            state.numOfIceCreams--;  // Decrement the number of ice creams by 1 when the 'ordered' action from the cake slice is dispatched
        });
    }
});

// Exporting the reducer function for the icecream slice
module.exports = icecreamSlice.reducer;
// Exporting the actions generated for the icecream slice
module.exports.icecreamActions = icecreamSlice.actions;
```
