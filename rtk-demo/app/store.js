const configureStore = require('@reduxjs/toolkit');
const cakeReducer = require("")

const store = configureStore({
    reducer: {
        cake: cakeReducer,
    },
})

module.exports = store;