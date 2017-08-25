import React from 'react';

import './product-card-min.less';

import Utility__ImageContainer  from '../Utility__ImageContainer.jsx';
import Utility__Currency        from '../Utility__Currency.jsx';
import OfferBage                from '../offer-bage';

export const ProductCardMinView = (props) => {
    return(
        <div 
            className="product-card-min">
                <div className="product-card-min__image">
                    <Utility__ImageContainer />
                </div>
                <div 
                    className="product-card-min__content">
                        <span className="product-card-min__content__title">
                            {props.title}
                        </span> 
                        <div className="product-card-min__content__pricing">
                            <div className="product-card-min__content__pricing__price">
                                <Utility__Currency
                                    value={props.price}
                                    fontSize={15}
                                    accent 
                                    glyphFull/>
                            </div>
                            <OfferBage size={10}/>
                        </div>
                </div>
        </div>
    )
}
ProductCardMinView.defaultProps = {
    title: "Шарф-хомут палантин зеленый",
    price: 1235,
    priceSale: 1490,
    offer: "",
    containerWidth: 1,
    containerRef: null,
}

class ProductCardMin extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            containerWidth: 0,
        }
    }

    render() {
        return(
            <ProductCardMinView />
        )
    }
}

export default ProductCardMin;