const initialState = '';

const filterTracks = (state = initialState, action) => {
    switch (action.type) {
        case 'FIND_TRACK'    : return action.payload
        default              : return state
    }
}

export default filterTracks;