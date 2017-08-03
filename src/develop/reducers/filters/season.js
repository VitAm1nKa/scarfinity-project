import FILTERS from '../../lib/constants.js';

const initialState = {
    list: [
        { title: "Весна-лето", checked: false, },
        { title: "Осень-зима", checked: false, },
    ]
};

const changeCheck = (list, index) => {

}

const filterSeason = (state = initialState, action) => {
    switch (action.type) {
        case FILTERS.SEASON__CHANGE_CHECK: return Object.assign({}, state, {
            list: state.list.map((value, index) => index === action.index
                ? Object.assign({}, value, {checked: !value.checked })
                : value
            )
        })
        case FILTERS.SEASON__DEFAULT: return Object.assign({}, state, {
            list: state.list.map((value) =>
                Object.assign({}, value, {checked: false })
            )
        })
        default: 
            return state
    }
}

export default filterSeason;