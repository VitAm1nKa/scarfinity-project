import React from 'react';

var products = null;

const api__init = () => {
    fetch(`api/api__products.json`)
    .then(response => response.json())
    .then(jsonData => products = jsonData);
    console.log(products);
}

// Get product by id

const get = () => {
    return(
        products[0]
    )
}

export default {
    api__init,
    get,
}
