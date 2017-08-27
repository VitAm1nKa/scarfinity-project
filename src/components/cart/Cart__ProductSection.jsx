import React from 'react';

import './cart__product-section.less';

import Utility__Currency from '../utility/Utility__Currency.jsx';

import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import NavigationCancel from 'material-ui/svg-icons/navigation/cancel';

// Utility
import {count__cartItems}		from '../../lib/currying';

// Data ------------------------
import {connect}                from 'react-redux';
import {addItem, removeItem}    from '../../redux/actions/cart';


const styles = {
    mediumIcon: {
        width: 22,
        height: 22,
        color: "#ccc",
        hoverColor: "#e46a5a",
    },

    medium: {
        width: 36,
        height: 36,
        padding: 2,
        hoverColor: "#e46a5a",
    },
}

class Cart__ProductSection__ProductCard extends React.Component {
    constructor(props) {
        super(props);

        this.state = Object.assign({}, props, {
            inProcess: false,
            collapsed: false,
        });

        this.handleQuantityChange = this.handleQuantityChange.bind(this);
        this.handleRemoveItem = this.handleRemoveItem.bind(this);
	}

    handleQuantityChange() {
        let { id, quantity, onQuantityChange } = this.state;
        this.setState({inProcess: true});
        setTimeout(() => {
            onQuantityChange(id, quantity + 1);
            this.setState({inProcess: false});
        }, 800);
    }

    handleRemoveItem() {
        this.setState({collapsed: true});
    }

    handleTransitionEnd() {
        if(this.state.collapsed) {
            const timeout = setTimeout(() => {
                if(this.state.onRemoveItem) this.state.onRemoveItem();
            }, 50);
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState(nextProps);
    }

    render() {
        const { inProcess, collapsed, productData } = this.state;

        return (
            <div className={`cart__product-card 
                            ${ inProcess ? "cart__product-card--in-process" : "" }
                            ${ collapsed ? "cart__product-card--collapsed": "" }`}
                            onTransitionEnd={this.handleTransitionEnd.bind(this)}>
                <div className="cart__product-card__back-remove-block">
                </div>
                <div className="cart__product-card__container">
                    <div className="cart__product-card__remove-block">
                        <IconButton iconStyle={ styles.mediumIcon } style={ styles.medium } onTouchTap={this.handleRemoveItem} >
                            <NavigationCancel hoverColor="#e46a5a" />
                        </IconButton>
                    </div>
                    <div className="cart__product-card__image-block">
                        <div className="cart__product-card__image-block__image">
                        </div>
                    </div>
                    <div className="cart__product-card__content-block">
                        <div className="cart__product-card__content-block__header">
                            {productData.title}
                        </div>
                        <div className="cart__product-card__content-block__content">
                            <span className="title">Цвет:</span>
                            <div className="color-container">
                                
                            </div>
                        </div>
                    </div>
                    <div className="cart__product-card__price-block">
                        <Utility__Currency value={productData.cost} size="small" unmutable={true} />
                    </div>
                    <div className="cart__product-card__delim-block">&#215;</div>
                    <div className="cart__product-card__quantity-block">
                        <FlatButton label={productData.quantity} onTouchTap={this.handleQuantityChange} />
                    </div>
                    <div className="cart__product-card__delim-block">&#61;</div>
                    <div className="cart__product-card__total-block">
                        <Utility__Currency value={inProcess ? null: productData.cost * productData.quantity} size="small" />
                    </div>
                </div>
                <div className="cart__product-card__process-block">
                    <span className="cart__product-card__process-block__spinner"></span>
                    <div className="cart__product-card__process-block__content">
                        Some processed...
                    </div>
                </div>
            </div>
        );
    }
}

class Cart__ProductSection extends React.Component {
    constructor(props) {
        super(props);

        this.state = Object.assign({}, props, {});

        this.handleRemoveItem = this.handleRemoveItem.bind(this);
        this.handleItemQuantityChange = this.handleItemQuantityChange.bind(this);
    }
    
    componentWillReceiveProps(nextProps) {
        this.setState(nextProps);
    }

    handleRemoveItem(productId) {
        this.state.removeItem(productId);
    }

    handleItemQuantityChange(itemId, value) {

    }

    render() {
        const {items} = this.state;
        let subTotal = items.map(x => (x.cost * x.quantity)).reduce((a,b) => { return a + b }, 0);
        if(!subTotal) subTotal = 0;
        const itemsCountTitle = count__cartItems(items.length);

        return (
            <div className="cart__products-container">
                <div className="cart__header-row">
                    У вас <span className="cart__header-row__accent">{`${items.length} ${count__cartItems(items.length)}`}</span> в корзине
                </div>
                <div className="cart__product-card cart__product-card--header">
                    <div className="cart__product-card__container">
                        <div className="cart__product-card__remove-block">
                        </div>
                        <div className="cart__product-card__image-block">
                        </div>
                        <div className="cart__product-card__content-block">
                            <span className="cart__u__grid-title" data-full="Наименование" data-abbr="Наименование"></span>
                        </div>
                        <div className="cart__product-card__price-block">
                            <span className="cart__u__grid-title" data-full="Цена" data-abbr="Цена"></span>
                        </div>
                        <div className="cart__product-card__delim-block"></div>
                        <div className="cart__product-card__quantity-block">
                            <span className="cart__u__grid-title" data-full="Количество" data-abbr="Кол-во"></span>
                        </div>
                        <div className="cart__product-card__delim-block"></div>
                        <div className="cart__product-card__total-block">
                            <span className="cart__u__grid-title" data-full="Сумма" data-abbr="Сумма"></span>
                        </div>
                    </div>
                </div>
                { items.map((item) => 
                    <Cart__ProductSection__ProductCard 
                        key={item.productId} 
                        productData={item}
                        onRemoveItem={() => this.handleRemoveItem(item.productId)} 
                        onQuantityChange={this.handleItemQuantityChange} />
                )}
                <div className="cart__bottom-row">
                    <span className="cart__bottom-row__label">Подитог:</span>
                    <Utility__Currency 
                        value={subTotal} 
                        size="medium" 
                        accent={true} 
                        test={true} />
                </div>
            </div>
        )
    }
}

const mstp__Cart__ProductSection = (state, ownProps) => {
    return {
        items: state.cart,
    }
}

const mdtp__Cart__ProductSection = (dispatch) => {
    return {
        addItem: (productId, count) => dispatch(addItem(productId, count)),
        removeItem: (productId, count) => dispatch(removeItem(productId, count)),
    }
}

export default connect(mstp__Cart__ProductSection, mdtp__Cart__ProductSection)(Cart__ProductSection);

