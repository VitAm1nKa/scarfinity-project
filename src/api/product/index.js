import React from 'react';

var products = null;

const api__init = (callback) => {
    fetch(`api/api__products.json`)
    .then(response => response.json())
    .then(jsonData => {
        products = jsonData;
        if(callback) callback();
    });
}

// Get product by id

const get = (id) => {
    var product = products.list.find(p => parseInt(p.id) === parseInt(id));

    return product;
}

export default {
    api__init,
    get,
}
