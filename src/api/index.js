import React from 'react';

import api__product from './product';

const init__ = (callback) => {
    let initCounter = 1;

    const goToMain = () => {
        if(initCounter <= 0) {
            if(callback) callback();
        }
    }

    api__product.api__init(() => {initCounter--; goToMain();});
}

export default {
    init__,
    api__product,
}
