import React from 'react';

import './requisites.less';

import {BasicInput}             from '../../utility/input';
import Utitlity__SelectBox      from '../../utility/Utility__SelectBox.jsx';
import Utility__AutocompleteBox from '../../utility/Utility__AutocompleteBox.jsx';
import Utility__Currency        from '../../utility/Utility__Currency.jsx';

// Lib
import {
    count__shipDuration__day,
    count__shipDuration__week
}                               from '../../../lib/currying';

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
    size: 20,
}

const PriceCalculationView = (props) => {
    return(
        <div className="requisites-price-calculation">
            <div className="requisites-price-calculation__row">
                <span className="requisites-price-calculation__row__text">Товары</span>
                <span className="requisites-price-calculation__row__sign"></span>
                <span className="requisites-price-calculation__row__text">Доставка</span>
                <span className="requisites-price-calculation__row__sign"></span>
                <span className="requisites-price-calculation__row__text accent">Сумма</span>
            </div>
            <div className="requisites-price-calculation__row">
                <span className="requisites-price-calculation__row__text">
                    <Utility__Currency value={props.productsCost} fontSize={16} fontWeight={400} glyphFull />
                </span>
                <span className="requisites-price-calculation__row__sign plus"></span>
                <span className="requisites-price-calculation__row__text">
                    <Utility__Currency value={props.shippingCost} fontSize={16} fontWeight={400} glyphFull />
                </span>
                <span className="requisites-price-calculation__row__sign equals"></span>
                <span className="requisites-price-calculation__row__text accent">
                    <Utility__Currency value={props.productsCost + props.shippingCost} fontSize={16} fontWeight={500} glyphFull />
                </span>
            </div>
        </div>
    )
}
PriceCalculationView.defaultProps = {
    productsCost: 3200,
    shippingCost: 120,
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
                <Utility__Currency value={props.cost} fontSize={15} fontWeight={500} glyphFull />
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

class ShippingMethod extends React.Component {
    constructor(props) {
        super(props);

        this.state = Object.assign({}, props, {
            checkedId: -1,
        });
    }

    componentWillReceiveProps(nextProps) {
        this.setState(nextProps);
    }

    handleClick(id) {
        this.setState({
            checkedId: id,
        });
    }

    render() {
        return(
            <div className="requisites-shipping-method">
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
            cost: 120,
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

const Requisites = (props) => {
    return(
        <div className="requisites">
            <div className="requisites-row">
                <div className="requisites-row__left">
                    <span className="requisites-title"><b>Адрес </b>доставки</span>
                </div>
                <div className="requisites-row__middle"></div>
                <div className="requisites-row__right">
                    <span className="requisites-title"><b>Контактная </b>информация</span>
                </div>
            </div>
            <div className="requisites-row">
                <div className="requisites-row__left">
                    <Utitlity__SelectBox 
                        options={["Россия"]}
                        selectedId={0}
                        placeholderTitle="Выберите страну"
                        sectionTitle="Выбор города"
                        errorTitle="Город не выбран"
                        noElementsTitle="Нет элементов"
                        doValidate={ref => (this.countrySelect = ref)} />
                    <Utility__AutocompleteBox
                        placeholderTitle="Город"
                        defaultSection={"Недавние значения"}
                        defaultOptions={["Новосибирск", "Кемерово", "Омск"]}
                        options={["новосибирск", "москва", "новоросийск", "морянка"]}
                        errorTitle="Город не выбран"
                        sectionTitle="Выбор города"
                        doValidate={ref => (this.citySelect = ref)} />
                    <Utility__AutocompleteBox
                        placeholderTitle="Адрес"
                        defaultSection={"Недавние значения"}
                        defaultOptions={["Новосибирск", "Кемерово", "Омск"]}
                        options={["новосибирск", "москва", "новоросийск", "морянка"]}
                        errorTitle="Город не выбран"
                        sectionTitle="Выбор города"
                        doValidate={ref => (this.streetSelect = ref)} />
                    <ShippingMethod />
                </div>
                <div className="requisites-row__middle requisites-row__middle--delim"></div>
                <div className="requisites-row__right">
                    <BasicInput placeholder="Фамилия"/>
                    <BasicInput placeholder="Имя"/>
                    <BasicInput placeholder="E-mail"/>
                    <BasicInput placeholder="Телефон"/>
                    <PriceCalculationView />
                </div>
            </div>
        </div>
    )
}

export default Requisites;