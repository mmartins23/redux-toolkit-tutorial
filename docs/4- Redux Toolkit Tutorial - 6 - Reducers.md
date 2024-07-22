### Summary of Redux Toolkit Tutorial - 6 - Reducers

In this tutorial, we focus on **Reducers**, which are functions responsible for handling state changes in response to actions.

#### Key Concepts

- **Reducer Function**: A function that takes the current state and an action as arguments and returns a new state.
- **Pure Function**: Reducers must be pure functions, meaning they do not have side effects and always produce the same output for the same input.
- **Initial State**: The starting state of the application or a particular slice of the state.

### Example: Handling Cake Orders

#### Action Type and Action Creator
First, we define an action type and an action creator:
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
Next, we define the initial state for our application:
```javascript
const initialState = {
    numOfCakes: 10,
}
```

#### Reducer Function
Finally, we create the reducer function that handles the state changes:
```javascript
// (previousState, action) => newState
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

### How It Works
1. **Initial State**: The reducer is initialized with the `initialState`.
2. **Handling Actions**: When an action is dispatched, the reducer checks the action type.
3. **State Update**: If the action type matches `CAKE_ORDERED`, the reducer returns a new state object with the `numOfCakes` property decremented by 1. If the action type does not match, it returns the current state.

### Summary
- **Reducers**: Functions that handle how the state changes in response to actions.
- **Initial State**: Defines the starting state of the application.
- **Pure Functions**: Ensure predictable state updates without side effects.
- **State Updates**: Handled immutably by returning new state objects.

By understanding and utilizing reducers, you can manage state changes in a predictable and maintainable way in your Redux applications.