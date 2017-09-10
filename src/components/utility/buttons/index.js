import React from 'react';

import './buttons.less';

export class CartButton extends React.Component {
    constructor(props) {
        super(props);

        this.state = Object.assign({}, props, {
            loading: false,
            processed: false,
            currentValue: props.inCart ? props.inCartValue : props.baseValue,
        });
    }

    componentWillReceiveProps(props) {
        if(props.inCart != this.state.inCart) {
            if(this.state.processed) {
                this.state.inCart = props.inCart;
                this.state.loading = false;
                this.currentValue = props.inCart ? this.state.inCartValue : this.state.props.baseValue;
            } else {
                this.setState({
                    inCart: props.inCart,
                    loading: false,
                    currentValue: props.inCart ? this.state.inCartValue : this.state.props.baseValue,
                });
            }
        } else {
            this.setState(props);
        }
    }

    handleClick() {
        if(!this.state.processed) {
            if(!this.state.inCart) {
                this.setState({
                    loading: true,
                    processed: true,
                }, () => {
                    this.state.addToCart();
                    setTimeout(() => {
                        this.setState({
                            processed: false,
                            currentValue: this.state.inCartValue,
                        });
                    }, 2000);
                });
            } else {
                this.state.goToCart();
            }
        }
    }

    render() {
        return(
            <button
                className={`buttons__cart-button${
                    this.state.tt || this.state.processed ? " buttons__cart-button--loading" :
                    this.state.inCart ? " buttons__cart-button--end" : ""
                }`}
                onClick={this.handleClick.bind(this)} >
                    {this.state.currentValue}
            </button>
        )
    }
}
CartButton.defaultProps = {
    inCart: false,
}

// if(props.loading == true && this.state.loading == false) {
//     this.setState({
//         process: true,
//         loading: true,
//     }, () => {
//         setTimeout(() => {
//             this.state.process = false;
//             let updater = {};
//             if(this.state.preEnd != null && this.state.preEnd == this.state.end) {
//                 Object.assign({}, updater, {end: this.state.preEnd});
//             }
//             if(this.state.preIddle != null && this.state.preIddle == this.state.iddle) {
//                 Object.assign({}, updater, {end: this.state.iddle});
//             }
//             this.setState(updater);
//         }, 700);
//     });
// }

// this.state.preEnd = props.end;
// this.state.preIddle = props.iddle;
// }
