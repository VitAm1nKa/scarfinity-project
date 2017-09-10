import React from 'react';
import { Link }                         from 'react-router-dom'
import productCard						from '../';

import './catalog.less';

import Paper                            from 'material-ui/Paper';
import FlatButton                       from 'material-ui/FlatButton';
import RaisedButton                     from 'material-ui/RaisedButton';
import AddShopingCart                   from 'material-ui/svg-icons/action/add-shopping-cart';
import Utility__ImageContainer          from '../../utility/Utility__ImageContainer.jsx';
import Utility__RaitingBox              from '../../utility/Utility__RaitingBox.jsx';
import Utility__Currency                from '../../utility/Utility__Currency.jsx';
import LazyLoader						from '../../utility/lazy-loader';

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

const ProductCardCatalogView = (props) => {
    if(props.loading) return null;

    return(
        <Paper zDepth={1} style={{maxWidth: 220}}>
            <div className="product-card-catalog">
                <div className="product-card-catalog__image">
                    <div className="product-card-catalog__image__image">
                        <Utility__ImageContainer
                            imageUrl={props.images.main}/>
                    </div>
                    <div className="product-card-catalog__image__info">
                        <span>Цвета:</span>
                        {/* <ColorPicker itemSize={22} itemGap={5} unselectable/> */}
                    </div>
                </div>

                <div className="product-card-catalog__rating">
                    <Utility__RaitingBox
                        currentValue={props.reviews.rating}
                        iconSize={16} />
                </div>

                <div className="product-card-catalog__description">
                    <span className="product-card-catalog__title">{props.main.title}</span>
                    <div className="product-card-catalog__description__pricing">
                        <Utility__Currency
                            glyphFull
                            value={props.pricing.cost}
                            fontSize={18}
                            fontWeight={500}/>
                    </div>
                </div>
            </div>
        </Paper>
    )
}

export default productCard(ProductCardCatalogView);