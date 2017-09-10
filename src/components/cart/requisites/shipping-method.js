//- Imports ------------------------------------------------------------------------------------------
    import React                    from 'react';
    import {connect}                from 'react-redux';

    import Utility__Currency        from '../../utility/Utility__Currency.jsx';

    // Lib
    import {
        count__shipDuration__day,
        count__shipDuration__week
    }                               from '../../../lib/currying';

//- ------------------------------------------------------------------------------------------

const RadioIcon = (props) => {
    const styles = {
        checked: {
            outside: "#1bb869",
            inside: "#ffffff",
            round: "1bb869",
        },
        unchecked: {
            outside: "#aaaaaa",
            inside: "#ffffff",
            round: "#ffffff",
        },
    }

    const style = props.checked ? styles.checked : styles.unchecked;

    return(
        <svg xmlns="http://www.w3.org/2000/svg" width={props.size} height={props.size} viewBox="0 0 300 300" style={{marginRight: 10}}>
            <circle
                style={{
                    fill: style.outside,
                }}
                cx="150" cy="150" r="144"/>
            <circle
                style={{
                    fill: style.inside,
                }}
                cx="150" cy="150" r="130"/>
            <circle
                style={{
                    fill: style.round,
                    transition: 'all 0.3s ease',

                }}
                cx="150" cy="150" r="65"/>
        </svg>
    )
}
RadioIcon.defaultProps = {
    checked: false,
    size: 16,
}

const ShippingMethodItem = (props) => {
    let durationTitle = `
        ${props.minDuration}${props.maxDuration ? `-${props.maxDuration}` : "" } 
        ${props.day 
            ? count__shipDuration__day(Math.max(props.minDuration, props.maxDuration))
            : count__shipDuration__week(Math.max(props.minDuration, props.maxDuration))}`;
    return(
        <div
            className={`requisites-shipping-method__item${props.checked ? " requisites-shipping-method__item--selected": ""}`}
            onClick={props.onClick}>
                <RadioIcon checked={props.checked} />
                <Utility__Currency value={props.cost} fontSize={15} fontWeight={500} />
                <span className="requisites-shipping-method__item__title">{props.title}</span>
                <span className="requisites-shipping-method__item__duration">{durationTitle}</span>
        </div>
    )
}
ShippingMethodItem.defaultProps = {
    checked: false,
    cost: 0,
    title: "",
    minDuration: 1,
    maxDuration: 0,
    day: true,
    onClick: () => {},
}

//- Export class -------------------------------------------------------------------------------
class ShippingMethod extends React.Component {
    constructor(props) {
        super(props);

        this.state = Object.assign({}, props, {
            checkedId: -1,
            valid: false,
            warning: false,
            validate: false,
        });
    }

    componentWillReceiveProps(nextProps) {
        this.setState(nextProps);
    }

    handleClick(shippingMethodId) {
        this.state.checkedId = shippingMethodId;
        this.validate();

        if(this.state.onTypeChange) this.state.onTypeChange(this.state.checkedId == 1);

        // Update Redux State
        // Добавление в стейт корзины информацию о способе доставки
        // Передается id и cost
        if(this.state.selectShippingMethod) {
            const {id, cost} = this.state.items[shippingMethodId];
            this.state.selectShippingMethod({id, cost});
        }
    }

    doValidate() {
        this.state.valid = this.valid();
        this.setState({
            validate: true,
        });
        return this.state.valid;
    }

    valid() {
        return this.state.checkedId != -1;
    }

    validate() {
        this.setState({
            valid: this.valid(),
        }, () => {
            if(this.state.onValidate) this.state.onValidate(this.state.valid);
        });
    }

    render() {
        return(
            <div
                className={`requisites-shipping-method
                ${
                    this.state.valid                            ? " requisites-shipping-method--success" :
                    this.state.warning                          ? " requisites-shipping-method--warning" :
                    !this.state.valid && this.state.validate    ? " requisites-shipping-method--error" : ""
                }`}>
                <span className="requisites-shipping-method__title">Способ доставки</span>
                {
                    this.state.items &&
                    this.state.items.map((item) =>
                        <ShippingMethodItem
                            key={item.id}
                            {...item}
                            checked={item.id == this.state.checkedId}
                            onClick={() => {this.handleClick(item.id)}}/>
                    )
                }
            </div>
        )
    }
}
ShippingMethod.defaultProps = {
    items: [
        {
            id: 0,
            cost: 300,
            title: "Почта России",
            minDuration: 1,
            maxDuration: 2,
            day: false,
        },
        {
            id: 1,
            cost: 120,
            title: "Самовывоз",
            minDuration: 1,
            day: true,
        },
    ]
}

//- State provide methods
const mstp = (state, ownProps) => {
    return {

    }
}

const mdtp = (dispatch) => {
    return {
        selectShippingMethod: shipInfo => dispatch({type: 'CART__SELECT_SM', data: shipInfo}),
        unselectShippingMethod: () => dispatch({type: 'CART__UNSELECT_SM', data: null}),
    }
}

export default connect(mstp, mdtp, null, {withRef: true})(ShippingMethod);