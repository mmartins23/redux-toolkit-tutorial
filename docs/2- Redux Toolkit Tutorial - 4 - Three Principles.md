### Summary of Redux Toolkit Tutorial - 4 - Three Principles

In this tutorial, we delve into the three fundamental principles of Redux: **Single Source of Truth**, **State is Read-Only**, and **Changes are Made with Pure Functions**. These principles ensure a predictable and maintainable state management system.

#### 1. Single Source of Truth
- **Definition**: The entire state of the application is stored in a single JavaScript object inside the store.
- **Benefits**: 
  - Centralized state management simplifies debugging and makes it easier to understand the state at any point.
  - It allows for consistent state across the entire application.
- **Example**:
  ```javascript
  const initialState = {
    user: { name: 'John Doe', loggedIn: false },
    posts: []
  };
  ```

#### 2. State is Read-Only
- **Definition**: The only way to change the state is to dispatch an action, an object that describes what happened.
- **Purpose**: This ensures that the state is not modified directly, which helps in tracking changes and maintaining predictability.
- **Immutable State**: Direct state modifications are not allowed; instead, actions are used to express state changes.
- **Example**:
  ```javascript
  const loginAction = {
    type: 'LOGIN',
    payload: { name: 'John Doe' }
  };
  store.dispatch(loginAction);
  ```

#### 3. Changes are Made with Pure Functions
- **Definition**: Reducers are pure functions that take the previous state and an action as arguments and return a new state.
- **Pure Functions**: These functions do not have side effects, ensuring that the same inputs always produce the same outputs, which makes the state changes predictable.
- **Example**:
  ```javascript
  function authReducer(state = { loggedIn: false }, action) {
    switch (action.type) {
      case 'LOGIN':
        return { ...state, loggedIn: true, user: action.payload };
      default:
        return state;
    }
  }
  ```

### Summary
These three principles form the backbone of Redux:
1. **Single Source of Truth**: Centralized state management.
2. **State is Read-Only**: State can only be changed by dispatching actions.
3. **Changes are Made with Pure Functions**: Reducers handle state changes predictably.

Adhering to these principles helps create a consistent and maintainable state management system, ensuring your application behaves as expected.