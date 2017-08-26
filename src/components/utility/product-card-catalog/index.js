import React from 'react';

import './product-card-catalog.less';

import Paper                            from 'material-ui/Paper';
import FlatButton                       from 'material-ui/FlatButton';
import RaisedButton                     from 'material-ui/RaisedButton';
import AddShopingCart                   from 'material-ui/svg-icons/action/add-shopping-cart';
import PriceTicket                      from '../price-ticket';
import Utility__ImageContainer          from '../Utility__ImageContainer.jsx';
import Utility__RaitingBox              from '../Utility__RaitingBox.jsx';
import Utility__Currency                from '../Utility__Currency.jsx';
import {ColorPicker, ColorPickerItem}   from '../Utility__ColorPicker.jsx';

export const ProductCardCatalogViewWhite = (props) => {
return(
        <div className="product-card-catalog">

            <div className="product-card-catalog__image">
                <div className="product-card-catalog__image__image">
                    <Utility__ImageContainer />
                </div>
                <div className="product-card-catalog__image__info">
                    <span>Цвета:</span>
                    <ColorPicker itemSize={22} itemGap={5} unselectable/>
                </div>
            </div>

            <div className="product-card-catalog__rating">
            </div>

            <div className="product-card-catalog__description">
                <Utility__RaitingBox
                    currentValue={4.5}
                    text={"123"}
                    iconSize={20} />
                <span className="product-card-catalog__title">Шарф-хомут палантин</span>
                <div className="product-card-catalog__description__pricing">
                    <PriceTicket value={1200} />
                    <FlatButton 
                        label={`в корзину`}
                        style={{marginLeft: 5}}
                        icon={
                            <AddShopingCart color={"#aaaaaa"} style={{width: 18, height: 18}} />
                        }/>
                </div>
            </div>
        </div>
    )
}

export const ProductCardCatalogView = (props) => {
    return(
        <Paper zDepth={1} style={{boxShadow: "0 1px 2px rgba(0,0,0,.2)"}} >
            <div className="product-card-catalog">
                <div className="product-card-catalog__image">
                    <div className="product-card-catalog__image__image">
                        <Utility__ImageContainer
                            imageUrl={props.images.main}/>
                    </div>
                    <div className="product-card-catalog__image__info">
                        <span>Цвета:</span>
                        <ColorPicker itemSize={22} itemGap={5} unselectable/>
                    </div>
                </div>

                <div className="product-card-catalog__rating">
                </div>

                <div className="product-card-catalog__description">
                    <Utility__RaitingBox
                        currentValue={props.reviews.rating}
                        text={`${props.reviews.count}`}
                        iconSize={20} />
                    <span className="product-card-catalog__title">{props.title}</span>
                    <div className="product-card-catalog__description__pricing">
                        <PriceTicket value={props.price.cost} />
                        <FlatButton 
                            label={`в корзину`}
                            style={{marginLeft: 5}}
                            icon={
                                <AddShopingCart color={"#aaaaaa"} style={{width: 18, height: 18}} />
                            }/>
                    </div>
                </div>
            </div>
        </Paper>
    )
}
ProductCardCatalogView.defaultProps = {
    title: "",
    reviews: {
        count: 0,
        rating: 0,
    },
    price: {
        cost: 0,
        sale: 0,
        saleTag: 0,
    },
    images: {
        main: "",
        preview: "",
        list: null,
    }
}

export default ProductCardCatalogView;