### Redux Toolkit Tutorial - 22 - Logger Middleware

In this tutorial, we learn how to apply middleware to a Redux Toolkit store, specifically the `redux-logger` middleware. This middleware will help us log the actions dispatched and the resulting state changes, providing insight into Redux Toolkit's behavior.

#### Steps Taken:

1. **Install Logger Middleware**:
   - Open the terminal in the `redux-toolkit-demo` folder.
   - Run the command to install the `redux-logger` package:
     ```bash
     npm install redux-logger
     ```

2. **Create Logger Middleware**:
   - In `store.js`, import and create the logger middleware:
     ```javascript
     const { configureStore } = require('@reduxjs/toolkit');
     const reduxLogger = require('redux-logger');
     const cakeReducer = require("../features/cake/cakeSlice");
     const icecreamReducer = require("../features/icecream/icecreamSlice");
     const logger = reduxLogger.createLogger();

     const store = configureStore({
         reducer: {
             cake: cakeReducer,
             icecream: icecreamReducer,
         },
         middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
     });

     module.exports = store;
     ```

3. **Configure the Store with Middleware**:
   - The `configureStore` function automatically applies some default middleware. We extend this by concatenating our logger middleware using `getDefaultMiddleware`.

4. **Modify `index.js`**:
   - Update `index.js` to initialize the store, import actions, and dispatch them. Remove the state logging in the store subscription as the logger middleware will handle it:
     ```javascript
     const store = require('./app/store');
     const cakeActions = require('./features/cake/cakeSlice').cakeActions;
     const icecreamActions = require('./features/icecream/icecreamSlice').icecreamActions;

     console.log("Initial state", store.getState());
     const unsubscribe = store.subscribe(() => {});

     store.dispatch(cakeActions.ordered());
     store.dispatch(cakeActions.ordered());
     store.dispatch(cakeActions.ordered());
     store.dispatch(cakeActions.restocked(3));

     store.dispatch(icecreamActions.ordered());
     store.dispatch(icecreamActions.ordered());
     store.dispatch(icecreamActions.restocked(2));

     unsubscribe();
     ```

5. **Observe Logs in Terminal**:
   - Run `node index` to see the logger middleware output in the terminal. The logs will show the action types dispatched and the updated state:
     ```
     Initial state { cake: { numOfCakes: 10 }, icecream: { numOfIceCreams: 20 } }

     action cake/ordered @ hh:mm:ss.mmm
       prev state { cake: { numOfCakes: 10 }, icecream: { numOfIceCreams: 20 } }
       action     { type: 'cake/ordered' }
       next state { cake: { numOfCakes: 9 }, icecream: { numOfIceCreams: 20 } }

     action cake/ordered @ hh:mm:ss.mmm
       prev state { cake: { numOfCakes: 9 }, icecream: { numOfIceCreams: 20 } }
       action     { type: 'cake/ordered' }
       next state { cake: { numOfCakes: 8 }, icecream: { numOfIceCreams: 20 } }

     action cake/ordered @ hh:mm:ss.mmm
       prev state { cake: { numOfCakes: 8 }, icecream: { numOfIceCreams: 20 } }
       action     { type: 'cake/ordered' }
       next state { cake: { numOfCakes: 7 }, icecream: { numOfIceCreams: 20 } }

     action cake/restocked @ hh:mm:ss.mmm
       prev state { cake: { numOfCakes: 7 }, icecream: { numOfIceCreams: 20 } }
       action     { type: 'cake/restocked', payload: 3 }
       next state { cake: { numOfCakes: 10 }, icecream: { numOfIceCreams: 20 } }

     action icecream/ordered @ hh:mm:ss.mmm
       prev state { cake: { numOfCakes: 10 }, icecream: { numOfIceCreams: 20 } }
       action     { type: 'icecream/ordered' }
       next state { cake: { numOfCakes: 10 }, icecream: { numOfIceCreams: 19 } }

     action icecream/ordered @ hh:mm:ss.mmm
       prev state { cake: { numOfCakes: 10 }, icecream: { numOfIceCreams: 19 } }
       action     { type: 'icecream/ordered' }
       next state { cake: { numOfCakes: 10 }, icecream: { numOfIceCreams: 18 } }

     action icecream/restocked @ hh:mm:ss.mmm
       prev state { cake: { numOfCakes: 10 }, icecream: { numOfIceCreams: 18 } }
       action     { type: 'icecream/restocked', payload: 2 }
       next state { cake: { numOfCakes: 10 }, icecream: { numOfIceCreams: 20 } }
     ```

### Key Takeaways

- **Middleware Application**: We learn how to apply middleware in Redux Toolkit, extending its functionality.
- **Logger Insight**: The logger middleware provides clear insights into the dispatched actions and the resulting state changes, enhancing debugging and understanding of Redux Toolkit's behavior.
- **Action Types**: Redux Toolkit automatically handles action types using slice names and reducer keys, simplifying action management.