import React from 'react';

import './bottom-navigation.less';

import Utility__Currency from '../../utility/Utility__Currency.jsx';

const PaymentsCheck = (props) => {
    return(
        <div className="payments-check">
            <span className="payments-check__title">Итого</span>
            <Utility__Currency value={props.value} fontSize={26} fontWeight={600} />
        </div>
    )
}
PaymentsCheck.defaultProps = {
    value: 3200,
}

const BottomNavigation = (props) => {
    return(
        <div className="cart__bottom-navigation">
            <div className="cart__bottom-navigation__left">
                <div
                    className="cart__button-prev"
                    onClick={props.onPrevStep}>
                        {props.titles[props.step].prev}</div>
            </div>
            <div className="cart__bottom-navigation__check">
                {
                    props.step == 2 &&
                    <PaymentsCheck value={props.sumValue} />
                }
            </div>
            <div className="cart__bottom-navigation__right">
                <div
                    className="cart__button-next"
                    onClick={props.onNextStep}>
                        {props.titles[props.step].next}</div>
            </div>
        </div>
    )
}
BottomNavigation.defaultProps = {
    step: 0,
    titles: [
        {
            prev: "Вернуться к покупкам",
            next: "Доставка",
        },
        {
            prev: "Корзина",
            next: "Способы оплаты",
        },
        {
            prev: "Доставка",
            next: "Оформить заказ",
        },
    ],
    sumValue: 0,
    onNextStep: () => {},
    onPrevStep: () => {},
}

export default BottomNavigation;