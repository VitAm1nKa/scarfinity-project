export const getTracks = () => dispatch => {

    fetch("https://jsonplaceholder.typicode.com/posts")
    .then(response => response.json())
    .then(jsonData => {
        let showData = jsonData.slice(0, 10).map(data => (
            { id: data.id, title: data.title }
        ));
        dispatch({type: 'FETCH_TRACKS_SUCCESS', payload: showData});
    })
    .catch(error => {
        console.log("Fetching error", error.message);
        dispatch({type: 'FETCH_TRACKS_ERROR', payload: []});
    })
}