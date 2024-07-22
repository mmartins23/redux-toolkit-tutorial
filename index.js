const redux = require("redux");
const createStore = redux.createStore;
const combineReducers = redux.combineReducers;

const CAKE_ORDERED = "CAKE_ORDERED";
const CAKE_RESTOCKED = "CAKE_RESTOCKED";
const ICECREAM_ORDERED = "ICECREAM_ORDERED";
const ICECREAM_RESTOCKED = "ICECREAM_RESTOCKED";

function orderCake() {
    return {
        type: CAKE_ORDERED,
        payload: 1,
    }
}

function restockCake(qty = 1) {
    return {
        type: CAKE_RESTOCKED,
        payload: qty,
    }
}

function orderIceCream(qty = 1) {
    return {
        type: ICECREAM_ORDERED,
        payload: qty,
    }
}

function restockIceCream(qty = 1) {
    return {
        type: ICECREAM_RESTOCKED,
        payload: qty,
    }
}

// const initialState = {
//     numOfCakes: 10,
//     numOfIceCreams: 20
// }

const initialCakeState = {
    numOfCakes: 10,
}

const initialIceCreamState = {
    numOfCakes: 20,
}

// (previousState, action) => newState
const cakeReducer = (state = initialCakeState, action) => {
    switch (action.type) {
        case CAKE_ORDERED:
            return {
                ...state,
                numOfCakes: state.numOfCakes - 1,
            }
        case CAKE_RESTOCKED:
            return {
                ...state,
                numOfCakes: state.numOfCakes + action.payload,
            }
        default:
            return state
    }
}

const iceCreamReducer = (state = initialIceCreamState, action) => {
    switch (action.type) {
        case ICECREAM_ORDERED:
            return {
                ...state,
                numOfIceCreams: state.numOfIceCreams - 1,
            }
        case ICECREAM_RESTOCKED:
            return {
                ...state,
                numOfIceCreams: state.numOfIceCreams + action.payload,
            }
        default:
            return state
    }
}

const rootReducer = combineReducers({
    cake: cakeReducer,
    iceCream: iceCreamReducer,
})

const store = createStore(rootReducer);
console.log("Initial state", store.getState());

const unsubsribe = store.subscribe(() => console.log("update state", store.getState()));

store.dispatch(orderCake());
store.dispatch(orderCake());
store.dispatch(orderCake());

store.dispatch(restockCake(3));

store.dispatch(orderIceCream());
store.dispatch(orderIceCream());
store.dispatch(orderIceCream());

store.dispatch(restockIceCream(5));


unsubsribe();