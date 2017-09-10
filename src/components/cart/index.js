import React from 'react';

import './cart.less';

import FlatButton               from 'material-ui/FlatButton';
import Paper                    from 'material-ui/Paper';

import Requisites               from './requisites';
import Products                 from './products';
import Payments                 from './payments';
import HeaderNavigation         from './header-navigation';
import BottomNavigation         from './bottom-navigation';

// Data ------------------------
import {connect}                from 'react-redux';
import {addItem, removeItem}    from '../../redux/actions/cart';

class Cart extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = Object.assign({}, props, {
            step: 0,
        });
    }
    
    componentWillReceiveProps(nextProps) {
        this.setState(nextProps);
    }

    getRandomArbitrary(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }

    handleAdd() {
        this.state.addItem({
            productId: this.getRandomArbitrary(0, 3),
            quantity: this.getRandomArbitrary(1, 3),
            title: "Шарфик от Scarfinity",
            cost: this.getRandomArbitrary(1700, 3230),
            color: "",
        });
    }

    handleRemove() {
        const id = this.getRandomArbitrary(0, 3);
        const count = 1;
        this.state.removeItem(id, count);
    }

    handleNextStep() {
        // DO Validation check
        switch(this.state.step) {
            case 0: {
                this.setState({
                    step: this.state.step + 1
                });
            } break;
            case 1: {
                if(this.requisites.getWrappedInstance().validate()) {
                    this.setState({
                        step: this.state.step + 1
                    });
                }
            } break;
        }
    }

    handlePrevStep() {
        this.setState({
            step: (this.state.step + 3 - 1) % 3,
        });
    }

    render() {
        return (
            <Paper
                className="cart" 
                zDepth={1}>
                    <HeaderNavigation step={this.state.step} />
                    <div className="cart__container">
                        {
                              this.state.step == 0  ? <Products />  
                            : this.state.step == 1  ? <Requisites ref={ref => this.requisites = ref } /> 
                            : <Payments/>
                        }
                    </div>
                    <BottomNavigation
                        step={this.state.step}
                        onNextStep={this.handleNextStep.bind(this)}
                        onPrevStep={this.handlePrevStep.bind(this)} />


                    <FlatButton label="Add product" primary={true} onTouchTap={this.handleAdd.bind(this)}/>
                    <FlatButton label="Remove product" onTouchTap={this.handleRemove.bind(this)}/>

                    <div style={{
                        background: '#ccc',
                    }}>
                        <div className="price-ticket2"></div>
                    </div>

            </Paper>
        );

    }
}

const mstp__Cart = (state, ownProps) => {
    return {}
}

const mdtp__Cart = (dispatch) => {
    return {
        addItem: (orderInfo) => dispatch(addItem(orderInfo)),
        removeItem: (productId, quantity) => dispatch(removeItem(productId, quantity)),
    }
}

export default connect(mstp__Cart, mdtp__Cart)(Cart);