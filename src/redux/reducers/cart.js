import CONST from '../lib/constants.js';

const initialState = [];

const addItem = (state, action) => {
    console.log(state, action);
    const isExsists = state.find(p => p.productId === action.productId);
    if(isExsists) {
        return state.map(p => p.productId === action.productId ?
            Object.assign({}, p, {
                quantity: p.quantity + action.quantity
            }) : p
        )
    }

    return [...state, action];
}

const removeItem = (state, action) => {
    return state.filter(p => p.productId !== action.productId);
}

const cart = (state = initialState, action) => {
    switch (action.type) {
        case "CART__ADD": return addItem(state, action.data);
        case "CART__REMOVE": return removeItem(state, action.data);
        default: 
            return state
    }
}

export default cart;