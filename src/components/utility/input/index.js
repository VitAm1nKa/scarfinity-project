import React from 'react';

import './input.less';

// API
var APIpath = 'http://kladr-api.ru/api.php';

// AIzaSyB1Dr0Ll-JLvTrYDz20dE86cdqXCzK-ID8

export const BasicInput = (props) => {
    return(
        <input
            className={`sInput${
                props.success   ? " sInput--success" : 
                props.error     ? " sInput--error"   :
                props.search    ? " sInput--search"  : ""
            }`}
            type="text"
            placeholder={props.placeholder}
            disabled={props.disabled}
            ref={props.inputRef}/>
    )
}
BasicInput.defaultProps = {
    success: false,
    error: false,
    search: false,
    dispabled: false,
    placeholder: "",
    inputRef: null,
}

export class NameInput extends React.Component {
    //- Getter -----------------------------------------------------------------------------------------------
        value() { return this.input.value }
    //- ------------------------------------------------------------------------------------------------------
    constructor(props) {
        super(props);

        this.state = Object.assign({}, props, {
            valid: false,
            validate: false,
        });

        this.doValidate = this.doValidate.bind(this);

        this.value = this.value.bind(this);
    }

    doValidate() {
        this.state.valid = this.valid();
        this.setState({validate: true});
        return this.state.valid;
    }

    valid() {
        const rej = /^[a-zа-я ,.'-]+$/i;
        return rej.test(this.input.value);
    }

    validate() {
        this.setState({
            valid: this.valid()
        }, () => {
            if(this.state.onValidate) this.state.onValidate(this.state.valid);
            return this.state.valid;
        });
    }

    handleInput() {
        this.validate();
    }

    render() {
        return(
            <input
                className={`sInput${
                    this.state.valid                            ? " sInput--success" : 
                    !this.state.valid && this.state.validate    ? " sInput--error"   : ""
                }`}
                type="text"
                placeholder={this.state.placeholder}
                disabled={this.state.disabled}
                onInput={this.handleInput.bind(this)}
                ref={input => this.input = input}/>
        )
    }
}

export class EmailInput extends React.Component {
    //- Getter -----------------------------------------------------------------------------------------------
        value() { return this.input.value }
    //- ------------------------------------------------------------------------------------------------------
    constructor(props) {
        super(props);

        this.state = Object.assign({}, props, {
            valid: false,
            validate: false,
        });

        this.doValidate = this.doValidate.bind(this);

        this.value = this.value.bind(this);
    }

    doValidate() {
        this.state.valid = this.valid();
        this.setState({validate: true});
        return this.state.valid;
    }

    validate() {
        this.setState({
            valid: this.valid(),
        }, () => {
            if(this.state.onValidate) this.state.onValidate(this.state.valid);
            return this.state.valid;
        });
    }

    valid() {
        const rej = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return rej.test(this.input.value);
    }

    handleInput() {
        this.validate();
    }

    render() {
        return(
            <input
                className={`sInput${
                    this.state.valid                            ? " sInput--success" : 
                    !this.state.valid && this.state.validate    ? " sInput--error"   : ""
                }`}
                type="email"
                placeholder="E-mail"
                disabled={this.state.disabled}
                onInput={this.handleInput.bind(this)}
                ref={input => this.input = input}/>
        )
    }
}

export class PhoneInput extends React.Component {
    //- Getter -----------------------------------------------------------------------------------------------
        value() { return this.state.values.join('') }
    //- ------------------------------------------------------------------------------------------------------
    constructor(props) {
        super(props);

        this.state = Object.assign({}, props, {
            values: [],
            digits: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
            controls: ["Backspace", "Delete", "Tab", "ArrowLeft", "ArrowRight"],
            numbers: [0, 0, 1, 2, 3, 3, 3, 4, 5, 6, 6, 7, 8, 8, 9],
            numbersCaret: [5, 5, 6, 9, 10, 10, 10, 11, 13, 14, 14, 16, 17, 17, 18],
            backspace: [0, 1, 2, 2, 2, 3, 4, 5, 5, 6, 7, 7, 8, 9],
            backspaceCaret: [4, 5, 6, 6, 6, 9, 10, 11, 11, 13, 14, 14, 16, 17],
            delete: [0, 0, 1, 2, 3, 3, 3, 4, 5, 6, 6, 7, 8, 8, 9],
            flag: false,
            valid: false,
            validate: false,
        });

        this.doValidate = this.doValidate.bind(this);

        this.value = this.value.bind(this);
    }

    insertIntoArray(array, index, value) {
        return [...array.slice(0, index), value, ...array.slice(index, array.length)];
    }

    removeFromArray(array, index) {
        return [...array.slice(0, index), ...array.slice(index + 1, array.length)];
    }

    doValidate() {
        this.state.valid = this.valid();
        this.setState({validate: true});
        return this.state.valid;
    }

    valid() {
        return this.state.values.length === 10;
    }

    validate() {
        if(this.state.valid != this.valid()) {
            this.setState({
                valid: !this.state.valid,
            }, () => {
                if(this.state.onValidate) this.state.onValidate(this.state.valid);
                return this.state.valid;
            });
        }
    }

    updateValue(count) {
        const base = "+7 ";
        switch(count) {
            case 0: return base;
            case 1:
            case 2: return `${base}(${this.state.values.slice(0, count).join('')}`;
            case 3: return `${base}(${this.state.values.slice(0, count).join('')}) `;
            case 4:
            case 5: return `${this.updateValue(3)}${this.state.values.slice(3, count).join('')}`;
            case 6: return `${this.updateValue(3)}${this.state.values.slice(3, count).join('')} `;
            case 7: return `${this.updateValue(6)}${this.state.values.slice(6, count).join('')}`;
            case 8: return `${this.updateValue(6)}${this.state.values.slice(6, count).join('')}-`;
            case 9: 
            case 10: return `${this.updateValue(8)}${this.state.values.slice(8, count).join('')}`;
        }
    }

    handlePaste(event) {
        event.stopPropagation();
        event.preventDefault();
        return false;
    }

    handleFocus(event) {
        if(!this.state.flag) {
            this.setState({
                flag: true,
            }, () => {
                this.input.value = this.updateValue(this.state.values.length);
            })
        }
    }

    handleBlur(event) {
        if(this.state.values.length == 0) {
            this.setState({
                flag: false
            }, () => {
                this.input.value = "";
            });
        }
    }

    handleKeyDown(event) {
        if(this.state.digits.indexOf(event.nativeEvent.key) !== -1 && this.state.values.length < 10) {
            event.stopPropagation();
            event.preventDefault();

            const caret = this.input.selectionStart;

            if(caret >= 3) {
                this.state.values = this.insertIntoArray(this.state.values, this.state.numbers[caret - 3], Number(event.nativeEvent.key));
                this.input.value = this.updateValue(this.state.values.length);
                this.input.selectionStart = this.state.numbersCaret[caret - 3];
                this.input.selectionEnd = this.state.numbersCaret[caret - 3];
            }

        } else if(this.state.controls.indexOf(event.nativeEvent.key) !== -1) {
            switch(event.nativeEvent.key) {
                case 'Backspace': {
                    event.stopPropagation();
                    event.preventDefault();
    
                    const caret = this.input.selectionStart;
    
                    if(caret >= 5) {
                        this.state.values = this.removeFromArray(this.state.values, this.state.backspace[caret - 5]);
                        this.input.value = this.updateValue(this.state.values.length);
                        this.input.selectionStart = this.state.backspaceCaret[caret - 5];
                        this.input.selectionEnd = this.state.backspaceCaret[caret - 5];
                    }

                    return false;
                }
                case 'Delete': {
                    event.stopPropagation();
                    event.preventDefault();
        
                    const caret = this.input.selectionStart;
        
                    if(caret >= 3) {
                        this.state.values = this.removeFromArray(this.state.values, this.state.delete[caret - 3], Number(event.nativeEvent.key));
                        this.input.value = this.updateValue(this.state.values.length);
                        this.input.selectionStart = caret;
                        this.input.selectionEnd = caret;
                    }
                    return false;
                } break;
                default: return true;
            }
        }

        event.stopPropagation();
        event.preventDefault();
        return false;
    }

    handleKeyUp(event) {
        this.validate();
    }

    handleSubmit(event) {}

    render() {
        return(
            <input
                type="tel"
                className={`sInput-phone${
                    this.state.valid                                    ? " sInput-phone--success" : 
                    (!this.state.valid && this.state.validate)          ? " sInput-phone--error"   : ""
                }${this.state.flag ? " sInput-phone--flag": ""}`}
                placeholder="Телефон"
                onPaste={this.handlePaste.bind(this)}
                onFocus={this.handleFocus.bind(this)}
                onBlur={this.handleBlur.bind(this)}
                onSubmit={this.handleSubmit.bind(this)}
                onKeyUp={this.handleKeyUp.bind(this)}
                onKeyDown={this.handleKeyDown.bind(this)}
                ref={input => this.input = input}
                />
        )
    }
}

export class SearchInput extends React.Component {
    constructor(props) {
        super(props);

        this.state = Object.assign({}, props, {
            options: [],
            optionsIndex: -1,
            currentOption: null,
            showOptions: false,
            wrap: false,
            inputValue: "",
            preSelectIndex: -1,
            searchLimit: 5,
            valid: false,
            validate: false,
            warning: false,
        });

        this.doValidate = this.doValidate.bind(this);
    }

    inputValue() {
        if(this.state.optionsIndex == -1) {
            return this.state.inputValue;
        } else {
            if(this.state.city) {
                return this.state.options[this.state.optionsIndex].name;
            } else if(this.state.street) {
                const option = this.state.options[this.state.optionsIndex];
                if(option.contentType == "street") {
                    return option.name;
                } else if(option.contentType == "building") {
                    const streetInfo = option.parents.filter(x => x.contentType == "street");
                    if(streetInfo && streetInfo.length > 0) {
                        return `${streetInfo[0].name} ${option.name}`;
                    }
                }
            }
        }
    }

    currentOptionValue() {
        if(this.state.optionsIndex == -1) {
            return null;
        } else {
            return this.state.options[this.state.optionsIndex];
        }
    }

    showOptions() {
        return this.state.options.length > 0;
    }

    // Навигация по списку
    handleKeyDown(event) {
        if(event.nativeEvent.key == "ArrowDown" || event.nativeEvent.key == "ArrowUp") {
            event.stopPropagation();
            event.preventDefault();

            let index = this.state.optionsIndex;
            let count = this.state.options.length;
            
            if(count > 0) {
                count = count + 1; // add -1 value 

                switch(event.nativeEvent.key) {
                    case "ArrowDown": index = (index + 2) % count - 1; break;
                    case "ArrowUp": ; index = (index + count) % count - 1; break;
                }

                this.setState({
                    optionsIndex: index,
                }, () => {
                    this.input.value = this.inputValue();
                    this.state.currentOption = this.currentOptionValue();
                    this.input.selectionStart = this.input.value.length;
                    this.input.selectionEnd = this.input.value.length;
                });
            }

            return false;
        }

        if(event.nativeEvent.key == "Enter" || event.nativeEvent.key == "Tab") {
            this.setState({
                showOptions: false,
                optionsIndex: -1,
                options: [],
            }, () => {
                this.input.blur();
            });
        }

        return true;
    }

    handleInput(event) {
        this.state.warning = false;
        this.state.inputValue = event.target.value;
        this.state.optionsIndex = -1;
        this.preSelectIndex = -1;
        this.state.currentOption = null;
        this.search(this.state.inputValue);
        this.validate();
    }

    handleFocus() {
        this.setState({
            showOptions: this.showOptions(),
        });
    }

    handleBlur(event) {
        this.validate(true);
        if(this.state.preSelectIndex == -1) {
            this.setState({
                showOptions: false,
                optionsIndex: -1,
                options: [],
            }, this.removeWrap);
        } else {
            event.stopPropagation();
            this.input = document.activeElement;
        }
    }

    search(query) {
        if(query !== "") {
            let searchURL = null;

            if(this.state.city) {
                searchURL = `${APIpath}?query=${query}&limit=${this.state.searchLimit}&contentType=city`;
            }

            if(this.state.street && this.cityId !== null) {
                //searchURL = `${APIpath}?query=${query}&limit=${this.state.searchLimit}&cityId=${this.cityId}&oneString=1&withParent=1`;
                searchURL = `${APIpath}?query=${query}&limit=${this.state.searchLimit}&cityId=${"5400000100000"}&oneString=1&withParent=1`;
                //5400000100000
            }

            console.log(searchURL, this.state.street, this.cityId);

            if(searchURL == null) return;

            $.ajax({
                url: searchURL,
                type: 'get',
                dataType: 'jsonp'
            }).done(jsonData => {
                console.log(jsonData);
                if(jsonData.result != null) {
                    if(jsonData.result.length > 0) {
                        const items = jsonData.result;
                        this.setState({
                            options: items,
                            showOptions: items.length > 0 && this.input === document.activeElement,
                            wrap: items.length > 0 && this.input === document.activeElement,
                        });
                        return;
                    }
                }
            });
        } else {
            this.setState({
                options: [],
                showOptions: false,
            }, this.removeWrap);
        }
    }

    prepareName(item) {
        if(this.state.city) {
            if(item && item.name && item.typeShort)
                return `${item.typeShort}. ${item.name}`;
        }

        if(this.state.street) {
            if(item) {
                if(item.contentType == "street") {
                    return `${item.typeShort}. ${item.name}`;
                } else if(item.contentType == "building") {
                    const street = item.parents.filter(x => x.contentType == "street");
                    if(street && street.length > 0) {
                        const streetData = street[0];
                        return `${streetData.typeShort}. ${streetData.name}  ${item.typeShort}. ${item.name}`;
                    }

                }
            }
        }

        return "";
    }

    handlePreSelect(index) {
        this.state.preSelectIndex = index;
    }

    handleRemovePreSelect(index) {
        this.state.preSelectIndex = -1;
    }

    handleSelect(event) {
        event.stopPropagation();
        this.state.optionsIndex = this.state.preSelectIndex;
        this.input.value = this.inputValue();
        this.state.currentOption = this.currentOptionValue();
        this.input.selectionStart = this.input.value.length;
        this.input.selectionEnd = this.input.value.length;
        this.validate(true);

        this.setState({
            showOptions: false,
            optionsIndex: -1,
            options: [],
        }, this.removeWrap);

        return true;
    }

    removeWrap() {
        setTimeout(() => {
            this.setState({
                wrap: false,
            });
        }, 150);
    }

    doValidate() {
        this.state.valid = this.valid();
        this.state.warning = this.warning();
        this.setState({validate: true});
        return {valid: this.state.valid, warning: this.state.warning};
    }

    validate(warning = false) {
        this.setState({
            valid: this.valid(),
            warning: warning ? this.warning() : this.state.warning,
        }, () => {
            if(this.state.onValidate) this.state.onValidate({
                valid: this.state.valid, 
                warning: this.state.warning, 
                data: this.state.currentOption,
            });
        });
    }

    valid() {
        if(this.input.value != "" && this.state.currentOption != null) {
            return true;
        }

        return false;
    }

    warning() {
        if(this.input.value != "") {
            if(this.state.currentOption == null) {
                return true;
            } 
        }

        return false;
    }

    render() {
        return (
            <div className={`sInput-search-wrap${this.state.wrap ? " sInput-search-wrap--active" : ""}`}>
                <input
                    className={`sInput-search
                        ${this.state.valid                          ? " sInput-search--success" : 
                        (!this.state.valid && this.state.validate)  ? " sInput-search--error"   :
                        this.state.warning                          ? " sInput-search--warning" : ""}`}
                    onFocus={this.handleFocus.bind(this)}
                    onBlur={this.handleBlur.bind(this)}
                    onInput={this.handleInput.bind(this)}
                    onKeyDown={this.handleKeyDown.bind(this)}
                    placeholder={this.state.placeholder}
                    ref={ref => this.input = ref}/>
                {
                    (this.state.showOptions && this.input === document.activeElement) &&
                    <div 
                        className="sInput-options-container"
                        data-section-title={this.state.options.length == 0 ? "Ничего не найдено" : "Результаты" }>
                        {
                            this.state.options.length > 0 &&
                            this.state.options.map((item, index) => 
                                <div 
                                    key={index}
                                    className={`sInput-options-container__item
                                        ${(this.state.optionsIndex === index) ? " sInput-options-container__item--selected" : ""}`}
                                    onMouseEnter={() => {this.handlePreSelect(index)}}
                                    onMouseLeave={this.handleRemovePreSelect.bind(this)}
                                    onClick={event => {this.handleSelect(event)}}
                                >{this.prepareName(item)}</div>
                            )
                        }
                    </div>
                }
            </div>
        );
    }
}
SearchInput.defaultProps = {
    city: false,
    street: false,
    cityId: null,
    placeholder: "",
}

export class SearchInputCity extends React.Component {
    //- Getter -----------------------------------------------------------------------------------------------
        value() {
            console.log(this.state.placeInformation);
            if(!this.state.customInfo && this.state.placeInformation != null) {
                const address_components = this.state.placeInformation.address_components
                    .map(item => ({
                        type: item.types[0],
                        name: item.short_name,
                    }));

                return (({
                    formatted_address,
                    name,
                    place_id,
                    id,
                }) => ({
                    address_components,
                    formatted_address,
                    name,
                    place_id,
                    id,
                }))(this.state.placeInformation)
            }

            return {
                address_components: null,
                name: this.input.value,
                formatted_address: "",
                place_id: "",
                id: "",
            }
        }
    //- ------------------------------------------------------------------------------------------------------
    constructor(props) {
        super(props);

        this.state = Object.assign({}, props, {
            valid: false,
            validate: false,
            warning: false,
            placeInformation: null,
            customInfo: false,
        });

        this.doValidate = this.doValidate.bind(this);

        this.value = this.value.bind(this);
    }

    componentDidMount() {
        let otions = {
            types: ['(cities)'],
            componentRestrictions: {country: "ru"},
        }

        if(google) {
            this.autocomplete = new google.maps.places.Autocomplete(this.input, otions);
            this.autocomplete.addListener('place_changed', this.handlePlaceChaged.bind(this));
        }
    }

    handlePlaceChaged() {
        const placeInfo = this.autocomplete.getPlace();
        this.state.placeInformation = placeInfo;
        this.state.customInfo = false;
        this.validate();
    }

    handleInput() {
        this.state.customInfo = true;
        this.validate();
    }

    doValidate() {
        this.state.valid = this.valid();
        this.state.warning = this.warning();
        this.setState({
            validate: true,
        })

        return({
            valid: this.state.valid,
            warning: this.state.warning,
            error: this.state.valid == false && this.state.warning == false,
        });
    }

    valid() {
        if(this.input.value != "" && this.state.placeInformation != null && this.state.customInfo == false) {
            return true;
        }

        return false;
    }

    warning() {
        if(this.state.customInfo && this.input.value != "") {
            return true;
        }

        return false;
    }

    validate() {
        this.setState({
            valid: this.valid(),
            warning: this.warning(),
        }, () => {
            if(this.state.onValidate) this.state.onValidate({
                valid: this.state.valid,
                warning: this.state.warning,
            })
        });
    }

    render() {
        return (
            <div className="sInput-search-wrap">
                <input
                    className={`sInput-search
                        ${
                            this.state.valid    ? " sInput-search--success" :
                            this.state.warning  ? " sInput-search--warning" :
                            !this.state.valid && this.state.validate   ? " sInput-search--error"   : ""
                        }`}
                    onInput={this.handleInput.bind(this)}
                    placeholder={this.state.placeholder}
                    ref={ref => this.input = ref}/>
            </div>
        );
    }
}
SearchInput.defaultProps = {
    placeholder: "",
}

export class SearchInputAddress extends React.Component {
    //- Getter -----------------------------------------------------------------------------------------------
        value() {
            console.log(this.state.placeInformation);
            if(!this.state.customInfo && this.state.placeInformation != null) {
                const address_components = this.state.placeInformation.address_components
                    .map(item => ({
                        type: item.types[0],
                        name: item.short_name,
                    }));

                return (({
                    formatted_address,
                    name,
                    place_id,
                    id,
                }) => ({
                    address_components,
                    formatted_address,
                    name,
                    place_id,
                    id,
                }))(this.state.placeInformation)
            }

            return {
                address_components: null,
                name: this.input.value,
                formatted_address: "",
                place_id: "",
                id: "",
            }
        }
    //- ------------------------------------------------------------------------------------------------------

    constructor(props) {
        super(props);

        this.state = Object.assign({}, props, {
            valid: false,
            validate: false,
            warning: false,
            placeInformation: null,
            customInfo: false,
            disabled: false,
        });

        this.doValidate = this.doValidate.bind(this);
        this.disable = this.disable.bind(this);
        this.enable = this.enable.bind(this);

        this.value = this.value.bind(this);
    }

    enable() {
        this.state.disabled = false;
        this.validate();  
    }

    disable() {
        this.setState({
            disabled: true,
        });
        if(this.state.onValidate) this.state.onValidate({valid: true, warning: false});
    }

    componentDidMount() {
        let otions = {
            types: ['address'],
            componentRestrictions: {country: "ru"},
        }

        this.autocomplete = new google.maps.places.Autocomplete(this.input, otions);
        this.autocomplete.addListener('place_changed', this.handlePlaceChaged.bind(this));
    }

    handlePlaceChaged() {
        const placeInfo = this.autocomplete.getPlace();
        this.state.placeInformation = placeInfo;
        this.state.customInfo = false;
        this.validate();
    }

    handleInput() {
        this.state.customInfo = true;
        this.validate();
    }

    doValidate() {
        this.setState({
            validate: true,
        })

        if(this.state.disabled == false) {
            this.state.valid = this.valid();
            this.state.warning = this.warning();

            return({
                valid: this.state.valid,
                warning: this.state.warning,
                error: this.state.valid == false && this.state.warning == false,
            });
        }

        return({
            valid: true,
            warning: false,
            error: false,
        });
    }

    valid() {
        if(this.input.value != "" && this.state.placeInformation != null && this.state.customInfo == false) {
            return true;
        }

        return false;
    }

    warning() {
        if(this.state.customInfo && this.input.value != "") {
            return true;
        }

        return false;
    }

    validate() {
        this.setState({
            valid: this.valid(),
            warning: this.warning(),
        }, () => {
            if(this.state.onValidate) this.state.onValidate({
                valid: this.state.valid,
                warning: this.state.warning,
            })
        });
    }

    render() {
        return (
            <div className="sInput-search-wrap">
                <input
                    className={`sInput-search
                        ${
                            this.state.disabled == true ? "" :
                            this.state.valid    ? " sInput-search--success" :
                            this.state.warning  ? " sInput-search--warning" :
                            !this.state.valid && this.state.validate   ? " sInput-search--error"   : ""
                        }`}
                    disabled={this.state.disabled}
                    onInput={this.handleInput.bind(this)}
                    placeholder={this.state.placeholder}
                    ref={ref => this.input = ref}/>
            </div>
        );
    }
}
SearchInput.defaultProps = {
    placeholder: "",
}

const validateState = {
    pre: "pre",
    selected: "selected",
    valid: "valid",
    error: "error",
}

export class SelectInput extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            options: [],
            validate: validateState.pre,
            cummonTitle: {
                pre: "",
                section: "",
                error: "",
                noElements: "Нет элементов",
            },
            focus: false,
            currentId: -1,
            currentValue: "",
            lightTheme: false,
        }

        const {options, placeholderTitle, sectionTitle, errorTitle, noElementsTitle, selectedId, doValidate, lightTheme} = this.props;

        if(options && Array.isArray(options)) {
            this.state.options = this.prepareOptions(options);
        }

        if(placeholderTitle && typeof(placeholderTitle) === 'string') {
            this.state.cummonTitle.pre = placeholderTitle;
        }

        if(sectionTitle && typeof(sectionTitle) === 'string') {
            this.state.cummonTitle.section = sectionTitle;
        }

        if(errorTitle && typeof(errorTitle) === 'string') {
            this.state.cummonTitle.error = errorTitle;
        }

        if(noElementsTitle && typeof(noElementsTitle) === 'string') {
            this.state.cummonTitle.noElements = noElementsTitle;
        }

        if(selectedId != null && typeof(selectedId) === 'number') {
            this.selectId(selectedId);
        }

        if(lightTheme != null) {
            this.state.lightTheme = lightTheme;
        }

        this.click = false;

        this.handleFocus = this.handleFocus.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.validate = this.validate.bind(this);
        this.handleClick = this.handleClick.bind(this);

        if(doValidate && typeof(doValidate) === 'function') {
            doValidate(this);
        }
    }

    prepareOptions(options) {
        return options
        .filter((option) => {
            if(typeof(option) === 'string') {
                return true;
            }
            return false;
        })
        .map((option, index) => {
            return {id: index, title: option}
        });
    }

    selectId(selectedId) {
        if(selectedId >= 0 && this.state.options.length > selectedId - 1) {
            const { options } = this.state;
            const item = options.find(x => x.id === selectedId);
            if(item) {
                this.state.currentId = selectedId;
                this.state.currentValue = item.title;
                this.state.validate = validateState.selected;
                return true;
            }
        }

        return false;
    }

    componentWillReceiveProps(props) {
        const {options, selectedId} = props;

        if(options && Array.isArray(options)) {
            this.setState({option: this.prepareOptions(options)});
        }

        if(selectedId != null && typeof(selectedId) === 'int') {
            if(this.selectId(selectedId)) {
                this.forceUpdate();
            }
        }
    }

    handleFocus() {
        this.setState({focus: true});
    }

    handleBlur() {
        setTimeout(() => {
            if(this.click == false)
                this.setState({focus: false});
        }, 60);
    }

    handleClick() {
        this.click = true;
        setTimeout(() => { this.click = false }, 60);
        this.refs.root.focus();
    }

    handleSelect(id) {
        if(this.selectId(id)) {
            this.forceUpdate();
        }
    }

    validate() {
        const {currentId} = this.state;
        if(currentId === -1) {
            this.setState({validate: validateState.error});
            return false;
        }

        this.setState({validate: validateState.valid});

        return true;
    }

    render() {

        const { options, validate, focus, currentValue, cummonTitle, lightTheme} = this.state;

        let vState = "";
        switch(validate) {
            case validateState.pre: vState = "utility__select-box--state-pre-select"; break;
            case validateState.valid: vState = "utility__select-box--state-correct"; break;
            case validateState.error: vState = "utility__select-box--state-error"; break;
            case validateState.selected: vState = "utility__select-box--state-selected"; break;
        }

        return (
            <div
                className="sInput-select"
                data-pre-select-title={cummonTitle.pre}
                data-error-title={cummonTitle.error}
                >
                <input 
                        className="sInput-select__input" 
                        type="text"
                        value={currentValue}
                        readOnly 
                        onFocus={this.handleFocus}
                        onBlur={this.handleBlur}
                        ref="root"
                        />
                <div 
                    className={`utility__select-box__options-container ${ focus ? "utility__select-box__options-container--expand": "" }`} 
                    data-section-title={options.length == 0 ? cummonTitle.noElements : cummonTitle.section }>
                    { 
                        options.map(option => 
                            <div 
                                key={option.id}
                                className="utility__select-box__options-container__item"
                                onMouseDown={() => {this.handleSelect(option.id)}}
                            >{option.title}</div>
                        )
                    }
                </div>
            </div>
        );
    }
}