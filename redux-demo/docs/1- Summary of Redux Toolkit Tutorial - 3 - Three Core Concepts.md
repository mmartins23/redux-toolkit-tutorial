### Summary of Redux Toolkit Tutorial - 3 - Three Core Concepts

In this tutorial, we dive into the three core concepts of Redux: **Actions**, **Reducers**, and **Store**. These are the fundamental building blocks for managing state in Redux applications.

#### Actions
- **Definition**: Actions are plain JavaScript objects that describe what happened in the application.
- **Structure**: Each action must have a `type` property that indicates the type of action being performed. Optionally, actions can have a `payload` property that carries additional data.
- **Example**: 
  ```javascript
  const incrementAction = {
    type: 'INCREMENT',
    payload: 1
  };
  ```

#### Reducers
- **Definition**: Reducers are functions that take the current state and an action as arguments, and return a new state.
- **Purpose**: They specify how the state changes in response to an action.
- **Pure Functions**: Reducers must be pure functions, meaning they should not have side effects and must return a new state object without mutating the existing state.
- **Example**:
  ```javascript
  const initialState = { count: 0 };

  function counterReducer(state = initialState, action) {
    switch (action.type) {
      case 'INCREMENT':
        return { count: state.count + action.payload };
      default:
        return state;
    }
  }
  ```

#### Store
- **Definition**: The store is an object that holds the application's state.
- **Responsibilities**: It provides methods to dispatch actions, subscribe to changes, and get the current state.
- **Creating a Store**: The `createStore` function from Redux is used to create a store.
- **Example**:
  ```javascript
  import { createStore } from 'redux';
  const store = createStore(counterReducer);
  ```

#### Connecting the Concepts
1. **Dispatching Actions**: Use `store.dispatch(action)` to send actions to the store.
2. **Subscribing to Store**: Use `store.subscribe(listener)` to listen for state changes.
3. **Getting the State**: Use `store.getState()` to retrieve the current state.

#### Redux Toolkit Simplification
- **Introduction to Redux Toolkit**: Redux Toolkit simplifies Redux setup and usage by providing helper functions and reducing boilerplate.
- **Example Setup**:
  ```javascript
  import { configureStore, createSlice } from '@reduxjs/toolkit';

  const counterSlice = createSlice({
    name: 'counter',
    initialState: { count: 0 },
    reducers: {
      increment: (state, action) => {
        state.count += action.payload;
      }
    }
  });

  const store = configureStore({
    reducer: counterSlice.reducer
  });

  store.dispatch(counterSlice.actions.increment(1));
  console.log(store.getState()); // { count: 1 }
  ```

By understanding and utilizing these three core concepts, you can effectively manage state in your Redux applications. The Redux Toolkit further streamlines the process, making it easier and more efficient to work with Redux.