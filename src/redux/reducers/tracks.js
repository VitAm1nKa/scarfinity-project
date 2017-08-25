const initialState = [
    {id: '1500583984353', title: 'A state of Trance 702'},
    {id: '1500583984355', title: 'A state of Trance 638'},
];

const tracks = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_TRACK'            : return [...state, action.payload]
        case 'FETCH_TRACKS_SUCCESS' : return action.payload
        default                     : return state
    }
}

export default tracks;