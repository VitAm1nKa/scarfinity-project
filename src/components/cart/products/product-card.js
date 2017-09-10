import React                    from 'react';
import productCard		        from '../../product';

import FlatButton               from 'material-ui/FlatButton';
import IconButton               from 'material-ui/IconButton';
import NavigationCancel         from 'material-ui/svg-icons/navigation/cancel';
import Utility__Currency        from '../../utility/Utility__Currency.jsx';
import Utility__ImageContainer  from '../../utility/Utility__ImageContainer.jsx';

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

class ProductCard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            inProcess: false,
            collapsed: false,
        };

        this.handleQuantityChange = this.handleQuantityChange.bind(this);
        this.handleRemoveItem = this.handleRemoveItem.bind(this);
	}

    handleQuantityChange() {
        // let { id, quantity, onQuantityChange } = this.state;
        // this.setState({inProcess: true});
        // setTimeout(() => {
        //     onQuantityChange(id, quantity + 1);
        //     this.setState({inProcess: false});
        // }, 800);
    }

    handleRemoveItem() {
        this.setState({collapsed: true});
    }

    handleTransitionEnd() {
        if(this.state.collapsed) {
            const timeout = setTimeout(() => {
                if(this.props.onRemoveItem) this.props.onRemoveItem();
            }, 50);
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState(nextProps);
    }

    render() {
        const {inProcess, collapsed} = this.state;

        return (
            <div 
                className={`cart__product-card${
                    inProcess ? " cart__product-card--in-process" :
                    collapsed ? " cart__product-card--collapsed" : ""
                }`}
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
                                <Utility__ImageContainer
                                    imageUrl={this.props.images.preview}/>
                            </div>
                        </div>
                        <div className="cart__product-card__content-block">
                            <div className="cart__product-card__content-block__header">
                                {this.props.main.title}
                            </div>
                            <div className="cart__product-card__content-block__content">
                                <span className="title">Цвет:</span>
                                <div className="color-container">
                                    {this.props.colorCode}
                                </div>
                            </div>
                        </div>
                        <div className="cart__product-card__price-block">
                            <Utility__Currency
                                value={this.props.pricing.cost}
                                size="small"
                                unmutable={true} />
                        </div>
                        <div className="cart__product-card__delim-block">&#215;</div>
                        <div className="cart__product-card__quantity-block">
                            <FlatButton
                                label={this.props.quantity.currentQuantity}
                                onTouchTap={this.handleQuantityChange} />
                        </div>
                        <div className="cart__product-card__delim-block">&#61;</div>
                        <div className="cart__product-card__total-block">
                            <Utility__Currency
                                value={inProcess ? null: this.props.pricing.cost * this.props.quantity.currentQuantity}
                                size="small" />
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

export default productCard(ProductCard);