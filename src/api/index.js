import React from 'react';

import api__product from './product';

api__product.api__init();
console.log("From api => ", api__product.get());