export const addItem = (orderInfo) => dispatch => {
    console.log("Add to cart action", orderInfo);
    dispatch({type: "CART__ADD", data: orderInfo});
}

export const removeItem = (productId) => dispatch => {
    dispatch({type: "CART__REMOVE", data: { productId }});
}