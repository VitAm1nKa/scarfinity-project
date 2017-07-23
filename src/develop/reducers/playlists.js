const initialState = [
    'My home playlist',
    'My work playlist'
];

const playlists = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_PLAYLIST'     : return state
        case 'DELETE_PLAYLIST'  : return state
        default                 : return state
    }
}

export default playlists;