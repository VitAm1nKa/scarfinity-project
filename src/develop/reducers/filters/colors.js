import CONST from '../../lib/constants.js';

const initialState = {
    selectedColors: [],
    defaultValue: [],
};

const removeColor = (list, color) => {
    let index = list.indexOf(color);
    if(index > -1) {
        return list.splice(index, 1);
    }

    return list;
}

const filterColors = (state = initialState, action) => {
    switch (action.type) {
        case CONST.COLORS__ADD: return Object.assign({}, state, {
            selectedColors: [...state.selectedColors, action.color],
        })
        case CONST.COLORS__REMOVE: return Object.assign({}, state, {
            selectedColors: removeColor(this.state.selectedColors, action.color),
        })
        case CONST.COLORS__DEFAULT: return Object.assign({}, state, {
            selectedColors: state.defaultValue,
        })
        default: 
            return state
    }
}

export default filterColors;