### Summary of Redux Toolkit Tutorial - 5 - Actions

In this tutorial, we focus on **Actions** in Redux, which are essential for describing changes that need to happen in the application's state.

#### Key Concepts

- **Actions**: Plain JavaScript objects that describe an event or change in the application.
- **Action Type**: A string constant that indicates the type of action being performed.
- **Action Creator**: A function that returns an action object.

### Example: Ordering a Cake

#### Action Type
First, we define a constant for the action type to ensure consistency and avoid typos:
```javascript
const CAKE_ORDERED = "CAKE_ORDERED";
```

#### Action Creator
Next, we create an action creator function that returns an action object with the defined type and any additional data (payload) needed for the action:
```javascript
function orderCake() {
    return {
        type: CAKE_ORDERED,
        quantity: 1,
    };
}
```

#### Usage
To use the action creator, you would dispatch the action returned by the function to the Redux store:
```javascript
store.dispatch(orderCake());
```

### Summary
- **Action Types**: Use constants to define action types for consistency.
- **Action Creators**: Functions that create and return action objects, making it easier to manage and dispatch actions in your application.

By following these practices, you can ensure that your Redux actions are well-structured and maintainable.