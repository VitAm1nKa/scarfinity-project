import CONST from '../lib/constants.js';

// cummon functions
const getProductsTotalSum = (cart) => {
    return cart.products.reduce((a, b) => a + b.cost * b.quantity, 0);
}

const getDeliveryTotalSum = (cart) => {
    return cart.shippingMethod.cost;
}

const getCartTotalSum = (cart) => {
    return getProductsTotalSum(cart) + getDeliveryTotalSum(cart);
}

const initialState = {
    products: [],
    deliveryInfo: {
        userInfo: {
            firstName: null,
            lastName: null,
            email: null,
            phone: null,
        },
        addressInfo: {
            country: null,
            city: {
                name: null,
                formatted_address: null,
                placeId: null,
                id: null,
                address_components: null,
            },
            address: {
                name: null,
                formatted_address: null,
                placeId: null,
                id: null,
                address_components: null,
            },
        },
    },
    shippingMethod: {
        id: -1,
        cost: 0,
    },

    // methods
    getProductsTotalSum,
    getDeliveryTotalSum,
    getCartTotalSum,
}

const saveDeliveryInfo = (state, action) => {
    return Object.assign({}, state, action);
}

const addItem = (state, action) => {
    const isExsists = state.find(p => p.productId === action.productId);
    if(isExsists) {
        return state.map(p => p.productId === action.productId ?
            Object.assign({}, p, {
                quantity: p.quantity + action.quantity
            }) : p
        )
    }

    return [...state, action];
}

const removeItem = (state, action) => {
    return state.filter(p => p.productId !== action.productId);
}

const updateShippingMethod = (state, delivery) => {
    return Object.assign(state, {delivery});
}

const cart = (state = initialState, action) => {
    switch (action.type) {
        case "CART__ADD": return Object.assign({}, state, {
            products: addItem(state.products, action.data),
        })
        case "CART__REMOVE": return Object.assign({}, state, {
            products: removeItem(state.products, action.data),
        })
        case "CART__SAVE_DELIVERY_INFO": return Object.assign({}, state, {
            deliveryInfo: action.data
        });
        case "CART__SELECT_SM": return Object.assign({}, state, {
            shippingMethod: action.data,
        });
        default: 
            return state
    }
}

export default cart;