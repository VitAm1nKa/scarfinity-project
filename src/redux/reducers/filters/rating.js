import FILTERS from '../../lib/constants.js';

const initialState = {
    rating: 2,
    defaultRating: 2,
};

const filterRating = (state = initialState, action) => {
    switch (action.type) {
        case FILTERS.RATING__CHANGE: return Object.assign({}, state, {
            rating: action.rating,
        })
        default: 
            return state
    }
}

export default filterRating;