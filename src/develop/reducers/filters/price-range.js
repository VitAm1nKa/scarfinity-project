import CONST from '../../lib/constants.js';

const initialState = {
    minValue: 500,
    maxValue: 5000,
    leftValue: 500,
    rightValue: 5000,
    leftValueDefault: 500,
    rightValueDefault: 5000,
};

const filterPriceRange = (state = initialState, action) => {
    switch (action.type) {
        case CONST.PRICE_RANGE__CHANGE: return Object.assign({}, state, {
            leftValue: action.leftValue,
            rightValue: action.rightValue,
        })
        case CONST.PRICE_RANGE__DEFAULT: return Object.assign({}, state, {
            leftValue: state.leftValueDefault,
            rightValue: state.rightValueDefault,
        })
        default: 
            return state
    }
}

export default filterPriceRange;