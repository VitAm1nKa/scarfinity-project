import CONST from '../lib/constants.js';

const initialState = [];

const updateAndReturn = (state, product) => {
    const index = state.indexOf(product);
    state[index] = product;
    return state;
}

const product = (state = initialState, action) => {
    switch (action.type) {
        case "FETCH_PRODUCTBYID_SUCCESS": return state.find(p => p.id == action.data.id) ? updateAndReturn(state, action.data) : [...state, action.data];
        case "ADDD__CATALOG": return action.data;
        default: 
            return state
    }
}

export default product;