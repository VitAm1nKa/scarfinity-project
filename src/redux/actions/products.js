export const fetchProduct = (id) => dispatch => {
    fetch('api/api__products.json')
    .then(response => response.json())
    .then(jsonData => {
        console.log(jsonData);
        const product = jsonData.list.find(p => p.id == id);
        if(product != null && product != 'undefined')
            dispatch({type: 'FETCH_PRODUCTBYID_SUCCESS', data: product});
        else 
            dispatch({type: 'FETCH_PRODUCTBYID_ERROR', payload: null});
    })
    // .catch(error => {
    //     console.log("Fetching error", error.message);
    //     dispatch({type: 'FETCH_PRODUCTBYID_ERROR', payload: null});
    // })
}