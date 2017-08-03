const initialState = '';

const filters = (state = initialState, action) => {
    switch (action.type) {
        case 'FIND_TRACK'    : return action.payload
        default              : return state
    }
}

export default filters;