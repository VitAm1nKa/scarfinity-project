import React from 'react';

import './cart__product-section.less';

import Utility__Currency from '../utility/Utility__Currency.jsx';

import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import NavigationCancel from 'material-ui/svg-icons/navigation/cancel';

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
    constructor(props, context) {
        super(props, context);

        this.state = {
            inProcess: false,
            collapsed: false,
            id: 0,
            cost: 0,
            quantity: 1,
            onQuantityChange: () => {},
        }

        // this.data = {
        //     id: 0,
        //     cost: 0,
        //     quantity: 1,
        //     onQuantityChange: () => {},
        // }

        const { onQuantityChange } = this.props;

        if(this.props.productData) {
            let data = this.props.productData;
            this.state.id = data.id;
            this.state.cost = data.cost;
            this.state.quantity = data.quantity;
        }

        if(onQuantityChange && typeof(onQuantityChange) === 'function') {
            this.state.onQuantityChange = onQuantityChange;
        }

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

        const t = this.props.onRemoveItem;
        if(t) {
            t(this.state.id);
        }

        const { collapsed } = this.state;
        this.setState( { collapsed: true } );
    }

    componentWillReceiveProps(data) {
        const { quantity } = data.productData;

        if(quantity && typeof(quantity) === 'number') {
            this.setState({ quantity: quantity });
        }
    }

    render() {

        const { inProcess, collapsed, name, cost, quantity } = this.state;

        return (
            <div className={`cart__product-card 
                            ${ inProcess ? "cart__product-card--in-process" : "" }
                            ${ collapsed ? "cart__product-card--collapsed": "" }`}>
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
                            {name}
                        </div>
                        <div className="cart__product-card__content-block__content">
                            <span className="title">Цвет:</span>
                            <div className="color-container">
                                
                            </div>
                        </div>
                    </div>
                    <div className="cart__product-card__price-block">
                        <Utility__Currency value={cost} size="small" unmutable={true} />
                    </div>
                    <div className="cart__product-card__delim-block">&#215;</div>
                    <div className="cart__product-card__quantity-block">
                        <FlatButton label={quantity} onTouchTap={this.handleQuantityChange} />
                    </div>
                    <div className="cart__product-card__delim-block">&#61;</div>
                    <div className="cart__product-card__total-block">
                        <Utility__Currency value={inProcess ? null: cost * quantity} size="small" />
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

    constructor(props, context) {
        super(props, context);

        this.state = {
            items: [
                { id: 1, name: "Шарф-хомут, кашемир", cost: 350, quantity: 1, color: "" },
                { id: 2, name: "Платок пляжный", cost: 200, quantity: 2, color: "" },
                { id: 3, name: "Шарф Gucci, новинка", cost: 1250, quantity: 1, color: "" },
            ],
            index: 4,
        }

        this.handleRemoveItem = this.handleRemoveItem.bind(this);
        this.handleItemQuantityChange = this.handleItemQuantityChange.bind(this);
        this.addItem = this.addItem.bind(this);
	}

    handleRemoveItem(itemID) {
        if(itemID) {
            setTimeout(() => {
                var {items} = this.state;
                items.splice(items.findIndex(x => x.id === itemID), 1);
                this.setState({items: items});
            }, 200);
        }
    }

    handleItemQuantityChange(itemId, value) {
        let {items} = this.state;
        items.find(x => x.id === itemId).quantity = value;
        this.setState({ items: items });
    }

    // cummon methods
    itemsCountTitle(count) {
        if(count && typeof(count) === 'number') {
            let subTitle = "товар";

            const hundredMod = count % 100;
            if(hundredMod === 11 || hundredMod === 12 || hundredMod === 13 || hundredMod === 14) {
                return `${count} товаров`;
            }

            switch (count % 10) {
                case 0:
                case 5:
                case 6: 
                case 7:
                case 8: 
                case 9: subTitle = "товаров"; break;
                case 1: subTitle = "товар"; break;
                case 2:
                case 3:
                case 4: subTitle = "товара"; break;
            }

            return `${count} ${subTitle}`;
        }

        return "0 товаров";
    }
    
    random(min, max) {
        return Math.floor(Math.random()  * (max - min) + min)
    }

    addItem() {
        let {items, index} = this.state;
        const newItem = { id: index++, name: "Шарф-хомут, кашемир", cost: this.random(701, 301), quantity: this.random(4, 1), color: "" };
        console.log(newItem);
        this.setState({ items: [...items, newItem], index: index });
    }

    render() {

        const { items, value } = this.state;
        let subTotal = items.map(x => (x.cost * x.quantity)).reduce((a,b) => { return a + b }, 0);
        console.log(subTotal);
        if(!subTotal) subTotal = 0;
        const itemsCountTitle = this.itemsCountTitle(items.length);

        return (
            <div className="cart__products-container">
                <div className="cart__header-row">
                    У вас <span className="cart__header-row__accent">{itemsCountTitle}</span> в корзине
                    <FlatButton label="Add Item" onTouchTap={this.addItem} />
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
                        key={item.id} 
                        productData={item}
                        onRemoveItem={this.handleRemoveItem} 
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

export default Cart__ProductSection;

