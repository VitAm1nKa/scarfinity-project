import React from 'react';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import ShoppingBasket from 'material-ui/svg-icons/action/shopping-basket';

import Utility__ImageContainer from '../utility/Utility__ImageContainer.jsx';
import Utility__RaitingBox from '../utility/Utility__RaitingBox.jsx';
import Utility__Currency from '../utility/Utility__Currency.jsx';
import {ColorPicker, ColorPickerItem} from '../utility/Utility__ColorPicker.jsx';

import Ribbon from './Ribbon.jsx';
import ColorSelect from './ColorSelect.jsx';

import './CatalogProductCardMini.less';

let style = {

    middleBlockButton: {
        width: 62,
        height: 62,
        padding: 0,
    },

    middleBlockIcon: {
        color: '#fff',
        width: 32,
        height: 32,
    },

    paper: {
        display: 'inline-block',
    }
}

class CatalogProductCardMini extends React.Component {

    constructor(props, context) {
        super(props, context);
	}

    render() {
        return (
            <Paper zDepth={1}>
                <div className="offers__best-sellers-block">
                    <Ribbon type={"new"} />
                    <div className="offers__best-sellers-block__container">
                        <div className="offers__best-sellers-block__container__top-block">
                            <div className="offers__best-sellers-block__container__top-block__image">
                                <img src="./img/scarf-3.jpg" />
                            </div>
                            <div className="offers__best-sellers-block__container__top-block__annotation">
                                <div className="offers__best-sellers-block__container__top-block__annotation__container">
                                    <h4>Цвета:</h4>
                                    <ColorSelect />
                                </div>
                            </div>
                        </div>
                        <div className="offers__best-sellers-block__container__middle-block">
                            <IconButton style={style.middleBlockButton} iconStyle={style.middleBlockIcon} >
                                <ShoppingBasket />
                            </IconButton>
                            <span className="offers__best-sellers-block__container__middle-block__button">
                            </span>
                        </div>
                        <div className="offers__best-sellers-block__container__bottom-block">
                            <span className="title">Шарф хомут</span>
                            <span className="cost">$75</span>
                        </div>
                    </div>
                </div>
            </Paper>
        );
    }
}

export class CatalogProductCardDefault extends React.Component {

    constructor(props, context) {
        super(props, context);
	}

    render() {
        return (
            <Paper zDepth={1} >
                <div className="catalog-produc-card-default">

                    <div className="catalog-produc-card-default__image">
                        <div className="catalog-produc-card-default__image__image">
                            <Utility__ImageContainer />
                        </div>
                        <div className="catalog-produc-card-default__image__info">
                            <span>Цвета:</span>
                            <ColorPicker itemSize={22} itemGap={5} unselectable/>

                        </div>
                    </div>

                    <div className="catalog-produc-card-default__rating">
                        <Utility__RaitingBox currentValue={4.5} iconSize={20} />
                    </div>

                    <div className="catalog-produc-card-default__description">
                        <span className="catalog-produc-card-default__title">Шарф-хомут палантин</span>
                        <Utility__Currency size={"small"} value={1200} saleValue={1000} accent />
                    </div>



                    {/*<div className="offers__best-sellers-block__container">
                        <div className="offers__best-sellers-block__container__top-block">
                            <div className="offers__best-sellers-block__container__top-block__image">
                                <img src="./img/scarf-3.jpg" />
                            </div>
                            <div className="offers__best-sellers-block__container__top-block__annotation">
                                <div className="offers__best-sellers-block__container__top-block__annotation__container">
                                    <h4>Цвета:</h4>
                                    <ColorSelect />
                                </div>
                            </div>
                        </div>
                        <div className="offers__best-sellers-block__container__middle-block">
                            <IconButton style={style.middleBlockButton} iconStyle={style.middleBlockIcon} >
                                <ShoppingBasket />
                            </IconButton>
                            <span className="offers__best-sellers-block__container__middle-block__button">
                            </span>
                        </div>
                        <div className="offers__best-sellers-block__container__bottom-block">
                            <span className="title">Шарф хомут</span>
                            <span className="cost">$75</span>
                        </div>
                    </div>*/}
                </div>
            </Paper>
        );
    }
}

export default CatalogProductCardMini

