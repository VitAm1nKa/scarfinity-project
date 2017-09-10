import CONSTANTS from '../lib/constants';

const initialState = {
    priceRange: {
        minValue: 500,
        maxValue: 5000,
        leftValue: 1200,
        rightValue: 4000,
        leftValueDefault: 500,
        rightValueDefault: 5000,
    },
    colors: {
        selectedColors: [],
        defaultValue: [],
    },
    rating: {
        rating: 2,
        defaultRating: 2,
    },
    season: {
        list: [
            { title: "Весна-лето", checked: false, },
            { title: "Осень-зима", checked: false, },
        ]
    }
};

// Subcomponents
const priceRange = (state = initialState.priceRange, action) => {
    switch (action.type) {
        case CONSTANTS.PRICE_RANGE__CHANGE: return Object.assign({}, state, {
            leftValue: action.leftValue,
            rightValue: action.rightValue,
        })
        case CONSTANTS.PRICE_RANGE__DEFAULT: return Object.assign({}, state, {
            leftValue: state.leftValueDefault,
            rightValue: state.rightValueDefault,
        })
        default: 
            return state
    }
}

const colors = (state = initialState.colors, action) => {
    switch (action.type) {
        case CONSTANTS.COLORS__ADD: return Object.assign({}, state, {
            selectedColors: [...state.selectedColors, action.color],
        })
        case CONSTANTS.COLORS__REMOVE: return Object.assign({}, state, {
            selectedColors: (
                list = this.state.selectedColors, 
                color = action.color) => {
                    let index = list.indexOf(color);
                    if(index > -1) {
                        return list.splice(index, 1);
                    }

                    return list;
                },
        })
        case CONSTANTS.COLORS__DEFAULT: return Object.assign({}, state, {
            selectedColors: state.defaultValue,
        })
        default: 
            return state
    }
}

const rating = (state = initialState.rating, action) => {
    switch (action.type) {
        case CONSTANTS.RATING__CHANGE: return Object.assign({}, state, {
            rating: action.rating,
        })
        default: 
            return state
    }
}

const season = (state = initialState.season, action) => {
    switch (action.type) {
        case CONSTANTS.SEASON__CHANGE_CHECK: return Object.assign({}, state, {
            list: state.list.map((value, index) => index === action.index
                ? Object.assign({}, value, {checked: !value.checked })
                : value
            )
        })
        case CONSTANTS.SEASON__DEFAULT: return Object.assign({}, state, {
            list: state.list.map((value) =>
                Object.assign({}, value, {checked: false })
            )
        })
        default: 
            return state
    }
}

export default (state = initialState, action) => {
    return {
        priceRange: priceRange(state.priceRange, action),
        colors: colors(state.colors, action),
        rating: rating(state.rating, action),
        season: season(state.season, action),
    }
}

