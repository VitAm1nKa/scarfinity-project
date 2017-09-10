//- Imports ------------------------------------------------------------------------------------------
import React                    from 'react';
import {connect}                from 'react-redux';

import Utility__Currency        from '../../utility/Utility__Currency.jsx';

//- ------------------------------------------------------------------------------------------

const PriceCalculationView = (props) => {
    return(
        <div className="requisites-price-calculation">
            <div className="requisites-price-calculation__row">
                <span className="requisites-price-calculation__row__text">Товары</span>
                <span className="requisites-price-calculation__row__sign"></span>
                <span className="requisites-price-calculation__row__text">Доставка</span>
                <span className="requisites-price-calculation__row__sign"></span>
                <span className="requisites-price-calculation__row__text accent">Сумма</span>
            </div>
            <div className="requisites-price-calculation__row">
                <span className="requisites-price-calculation__row__text">
                    <Utility__Currency value={props.productsTotalSum} fontSize={16} fontWeight={400} glyphFull />
                </span>
                <span className="requisites-price-calculation__row__sign plus"></span>
                <span className="requisites-price-calculation__row__text">
                    <Utility__Currency value={props.deliveryTotalSum} fontSize={16} fontWeight={400} glyphFull />
                </span>
                <span className="requisites-price-calculation__row__sign equals"></span>
                <span className="requisites-price-calculation__row__text accent">
                    <Utility__Currency value={props.cartTotalSum} fontSize={16} fontWeight={500} glyphFull />
                </span>
            </div>
        </div>
    )
}

const mstp = ({cart}, ownProps) => {
    return {
        productsTotalSum: cart.getProductsTotalSum(cart),
        deliveryTotalSum: cart.getDeliveryTotalSum(cart),
        cartTotalSum: cart.getCartTotalSum(cart),
    }
}

const mdtp = (dispatch) => {
    return {

    }
}

export default connect(mstp, mdtp)(PriceCalculationView)