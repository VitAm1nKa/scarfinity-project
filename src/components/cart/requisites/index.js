import React from 'react';

import './requisites.less';

import {connect}                from 'react-redux';

import {
    BasicInput,
    NameInput,
    EmailInput,
    PhoneInput,
    SelectInput,
    SearchInputCity,
    SearchInputAddress,
}                               from '../../utility/input';
import Utitlity__SelectBox      from '../../utility/Utility__SelectBox.jsx';
import Utility__Currency        from '../../utility/Utility__Currency.jsx';
import AlertBlockContainer      from '../../utility/alert-block';

import ShippingMethod           from './shipping-method';
import PriceCalculationView     from './price-calculation-view';

class Requisites extends React.Component {
    constructor(props) {
        super(props);

        this.state = Object.assign({}, props, {
            validList: [
                {
                    name: "country",
                    valid: true,
                    errorType: "default",
                    errorMessage: "",
                },
                {
                    name: "city",
                    valid: false,
                    errorType: "errorInputEmpty",
                    errorMessage: "Город",
                    warning: false,
                    warningType: "warning",
                    warningMessage: "sdfsdfsd",
                },
                {
                    name: "address",
                    valid: false,
                    errorType: "errorInputEmpty",
                    errorMessage: "Адрес",
                    warning: false,
                    warningType: "warning",
                    warningMessage: "sdfsdfsd123",
                },
                {
                    name: "delivery",
                    valid: false,
                    errorType: "errorSelect",
                    errorMessage: "Способ доставки",
                },
                {
                    name: "lastname",
                    valid: false,
                    errorType: "errorInputEmpty",
                    errorMessage: "Фамилия",
                },
                {
                    name: "firstname",
                    valid: false,
                    errorType: "errorInputEmpty",
                    errorMessage: "Имя",
                },
                {
                    name: "email",
                    valid: false,
                    errorType: "errorInputEmpty",
                    errorMessage: "E-mail",
                },
                {
                    name: "phone",
                    valid: false,
                    errorType: "errorInputEmpty",
                    errorMessage: "Телефон",
                },
            ],
            validate: false,
            valid: false,
            isAddressNeed: true,
        });

        this.handleValidate = this.handleValidate.bind(this);
        this.validate = this.validate.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState(nextProps);
    }

    valid() {
        return this.state.validList.map(item => item.valid).reduce((a, b) => a && b);
    }

    validate() {
        this.doValidate();
        this.state.valid = this.valid();
        this.setState({validate: true});
        return this.state.valid;
    }

    handleClick() {
        this.saveDeliveryInfo();
    }

    saveDeliveryInfo() {
        this.state.saveDeliveryInfo({
            userInfo: {
                lastName: this.inputLastName.value(),
                firstName: this.inputFirstName.value(),
                email: this.inputEmail.value(),
                phone: this.inputPhone.value(),
            },
            addressInfo: {
                countru: "ru",
                city: this.inputSearchCity.value(),
                address: this.inputSearchAddress.value(),
            }
        });
    }

    doValidate() {
        this.state.validList[1] = Object.assign({}, this.state.validList[1], this.inputSearchCity.doValidate());
        this.state.validList[2] = Object.assign({}, this.state.validList[2], this.inputSearchAddress.doValidate());
        this.state.validList[3].valid = this.shippingMethod.getWrappedInstance().doValidate();
        this.state.validList[4].valid = this.inputLastName.doValidate();
        this.state.validList[5].valid = this.inputFirstName.doValidate();
        this.state.validList[6].valid = this.inputEmail.doValidate();
        this.state.validList[7].valid = this.inputPhone.doValidate();
    }

    handleValidate(index, valid, warning) {
        this.state.validList[index].valid = valid;
        this.state.validList[index].warning = warning;
        this.forceUpdate();
    }

    handleInputSearchCityValidate(validData) {
        console.log(validData);
        this.state.cityData = validData.data;
        if(this.state.cityData) {
            this.inputSearchStreet.cityId = this.state.cityData.id;
        }
    }

    handleDeliveryTypeChange(type) {
        if(type) {
            this.inputSearchAddress.disable();
        } else {
            this.inputSearchAddress.enable();
        }
    }

    alertMap(item) {
        if(item.warning != null && item.warning == true) {
            return {
                type: "warning",
                textType: "warning",
                text: item.warningMessage,
            }
        }

        if(item.valid != null && item.valid == false) {
            return {
                type: "error",
                textType: item.errorType,
                text: item.errorMessage,
            }
        }

        return {};
    }

    render() {
        return(
            <div className="requisites">
                <div className="requisites-row">
                    <div className="requisites-row__left">
                        <span className="requisites-title"><b>Адрес </b>доставки</span>
                        <SelectInput 
                            options={["Россия"]}
                            selectedId={0}
                            placeholderTitle="Выберите страну"
                            sectionTitle="Выбор города"
                            errorTitle="Город не выбран"
                            noElementsTitle="Нет элементов"
                            doValidate={ref => (this.countrySelect = ref)} />
                        <SearchInputCity
                            placeholder="Введите город"
                            city
                            onValidate={valid => {this.handleValidate(1, valid.valid, valid.warning)}}
                            ref={ref => this.inputSearchCity = ref} />
                        <SearchInputAddress
                            placeholder="Введите адрес"
                            onValidate={valid => {this.handleValidate(2, valid.valid, valid.warning)}}
                            ref={ref => this.inputSearchAddress = ref} />
                        <ShippingMethod
                            onTypeChange={this.handleDeliveryTypeChange.bind(this)}
                            onValidate={valid => {this.handleValidate(3, valid)}}
                            ref={ref => this.shippingMethod = ref} />
                    </div>
                    <div className="requisites-row__middle requisites-row__middle--delim"></div>
                    <div className="requisites-row__right">
                        <span className="requisites-title"><b>Контактная </b>информация</span>
                        <NameInput
                            placeholder="Фамилия"
                            onValidate={valid => {this.handleValidate(4, valid)}}
                            ref={name => this.inputLastName = name} />
                        <NameInput
                            placeholder="Имя"
                            onValidate={valid => {this.handleValidate(5, valid)}}
                            ref={name => this.inputFirstName = name} />
                        <EmailInput
                            onValidate={valid => {this.handleValidate(6, valid)}}
                            ref={ref => this.inputEmail = ref} />
                        <PhoneInput
                            onValidate={valid => {this.handleValidate(7, valid)}}
                            ref={ref => this.inputPhone = ref} />
                        <PriceCalculationView />
                    </div>
                </div>
                {/* <AlertBlockContainer
                    items={
                            this.state.validate &&
                            this.state.validList
                            .filter(x => x.warning != null && x.warning == true)
                            .map(item => this.alertMap(item))}/> */}
            </div>
        )
    }
}

const mstp = (state, ownProps) => {
    return {
        deliveryInfo: state.cart.deliveryInfo,
        isDeliveryFree: state.cart.isDeliveryFree,
    }
}

const mdtp = (dispatch) => {
    return {
        saveDeliveryInfo: (info) => dispatch({type: "CART__SAVE_DELIVERY_INFO", data: info})
    }
}

export default connect(mstp, mdtp, null, { withRef: true })(Requisites);