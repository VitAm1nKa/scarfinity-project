import React from 'react';

import './utility__autocomplete-box.less';

import IconButton from 'material-ui/IconButton';
import MoreVert from 'material-ui/svg-icons/navigation/more-vert';
import Clear from 'material-ui/svg-icons/content/clear';

const style = {
    iconButton: {
        width: 30,
        height: 30,
        padding: 0,
    },
    icon: {
        color: "#777",
    },
    cummonIconButton: {
        width: 24,
        height: 24,
        padding: 2,
        hoverColor: "#888",
    },
    cummonIcon: {
        width: 18,
        height: 18,
        color: "#aaa",
        hoverColor: "#888",
    }
}

const validateState = {
    pre: "pre",
    selected: "selected",
    valid: "valid",
    error: "error",
    tapping: "tapping",
}

class Utility__AutocompleteBox extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            options: [],
            validate: validateState.pre,
            autocomplete: "",
            cummonTitle: {
                pre: "",
                section: "",
                error: "",
                noElements: "",
            },
            focus: false,
            currentValue: "",
            selectedId: -1,
        }

        this.defaultData = {options: ["первый"], section: "Недавние запросы"};

        const {options, placeholderTitle, sectionTitle, errorTitle, noElementsTitle, doValidate} = this.props;

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

        this.preClick = false;
        this.forceClear = false;

        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleClearClick = this.handleClearClick.bind(this);
        this.handleClearMouseEnter = this.handleClearMouseEnter.bind(this);
        this.handleClearMouseLeave = this.handleClearMouseLeave.bind(this);
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
                this.setState({
                    selectedId: selectedId,
                    currentValue: item.title,
                    validate: this.renderState(),
                });
                return true;
            }
        }

        return false;
    }

    componentWillReceiveProps(props) {
        const {options} = props;

        if(options && Array.isArray(options)) {
            this.setState({option: this.prepareOptions(options)});
        }
    }

    // autocomplete methods
    handleKeyDown(event) {
        let {options, selectedId} = this.state;
        const count = options.length;
        event.preventDefault();

        if(event.keyCode === 13) {
            this.forceClear = true;
            this.refs.root.blur(); 
            return;
        }

        if(event.keyCode === 40) {
            this.selectId((selectedId + 1 == count) ? 0 : selectedId + 1);
            return;
        }

        if(event.keyCode === 38) {
            this.selectId((selectedId - 1 < 0) ? count - 1 : selectedId - 1);
            return;
        }
    }

    eventQuit() {
        this.forceClear = false;
        this.setState({
            focus: false, 
            validate: this.renderState(false), 
            options: [], 
            selectedId: -1,
        });
    }

    autocompleteChange(value) {
        if(value !== null) {
            const {options} = this.state;

            this.setState({
                selectedId: -1,
                currentValue: value,
            });
        }
    }

    prepareData() {
        const {currentValue} = this.state;
        const {options, section} = this.defaultData;
        if(currentValue.length === 0) {
            this.state.options = this.prepareOptions(options);
            this.state.cummonTitle.section = section;
        }
    }

    clearField() {
        this.autocompleteChange("");
        this.prepareData();
        setTimeout(() => {
            this.refs.root.focus();
        }, 10);
    }

    handleInput(event) {
        this.autocompleteChange(event.target.value);

        const text = event.target.value;

        // if(text != "") {
        //     $.ajax({
        //         url: `http://kladr-api.ru/api.php?query=${text}&limit=5&contentType=city`,
        //         type: 'get',
        //         dataType: 'jsonp'
        //     }).done(jsonData => {
        //         if(jsonData.result != null) {
        //             if(jsonData.result.length > 0) {
        //                 this.setState({
        //                     options: jsonData.result.map(item => ({title: item.name})),
        //                 });
        //                 return;
        //             }
        //         }

        //         this.setState({
        //             options: [],
        //         });
        //     });
        // }
    }

    handleChange(event) {
        console.log("change");
    }

    handleClearClick() {
        this.clearField();
    }

    handleClearMouseEnter() {
        this.preClick = true;
    }

    handleClearMouseLeave() {
        this.preClick = false;
    }

    handleFocus() {
        console.log("focus");
        this.prepareData();
        this.setState({focus: true, validate: this.renderState()});
    }

    handleBlur() {
        if(this.forceClear) this.eventQuit();
        else if(!this.preClick) this.eventQuit();
    }

    handleClick() {
        this.refs.root.focus();
    }

    handleSelect(id) {
        if(this.selectId(id)) {
            this.forceUpdate();
        }
    }

    // ----- //
    renderState(focused = true) {
        const {currentValue} = this.state;
        console.log(this.state);

        if(focused) {
            return validateState.tapping;
        } 

        if(currentValue.length === 0) {
            return validateState.pre;
        }

        if(currentValue.length > 0) {
            return validateState.selected;
        }
    }

    validate() {
        const {currentValue} = this.state;

        if(currentValue.length === 0) {
            this.setState({validate: validateState.error});
            return false;
        }

        if(currentValue.length > 0) {
            this.setState({validate: validateState.valid});
        }

        return true;
    }

    render() {

        console.log("render");

        const { options, validate, focus, currentValue, cummonTitle, selectedId, autocomplete } = this.state;

        let vState = "";
        switch(validate) {
            case validateState.pre: vState = "utility__autocomplete-box--state-pre-select"; break;
            case validateState.valid: vState = "utility__autocomplete-box--state-correct"; break;
            case validateState.error: vState = "utility__autocomplete-box--state-error"; break;
            case validateState.selected: vState = "utility__autocomplete-box--state-selected"; break;
            case validateState.tapping: vState = "utility__autocomplete-box--state-tapping"; break;
        }

        const exFocus = (options.length > 0 && focus) ? true : false;

        return (
            <div className={`utility__autocomplete-box ${vState}`} 
                data-pre-select-title={cummonTitle.pre}
                data-error-title={cummonTitle.error}
                // data-autocomplete-title={autocomplete}
                >
                <input 
                        className="utility__autocomplete-box__input" 
                        type="text"
                        value={currentValue}
                        onFocus={this.handleFocus}
                        onBlur={this.handleBlur}
                        onInput={this.handleInput}
                        onChange={this.handleChange}
                        onKeyUp={this.handleKeyDown}
                        ref="root"
                        />
                <div className="utility__autocomplete-box__cummon-button">
                    <IconButton 
                        style={style.cummonIconButton} 
                        iconStyle={style.cummonIcon}
                        onClick={this.handleClearClick}
                        onMouseEnter={this.handleClearMouseEnter}
                        onMouseLeave={this.handleClearMouseLeave}
                        ><Clear hoverColor={"#888"}/>
                    </IconButton>
                </div>
                {/* <div
                    className="utility__autocomplete-box__icon"
                    onClick={this.handleClick}
                    onMouseEnter={this.handleClearMouseEnter}
                    onMouseLeave={this.handleClearMouseLeave}>
                </div> */}
                <div 
                    className={`utility__autocomplete-box__options-container ${ exFocus ? "utility__autocomplete-box__options-container--expand": "" }`} 
                    data-section-title={options.length == 0 ? cummonTitle.noElements : cummonTitle.section }>
                    { 
                        options.map((item, index) => 
                            <div 
                                key={index}
                                className={`utility__autocomplete-box__options-container__item 
                                            ${(selectedId === index) ? "utility__autocomplete-box__options-container__item--selected" : ""}`}
                                onMouseDown={() => {this.handleSelect(item.id)}}
                            >{item.title}</div>
                        )
                    }
                </div>
            </div>
        );
    }
}

// export class AutocompleteInput extends React.Component {
//     constructor(props) {
//         super(props);

//         this.state = Object.assign({}, props, {
//             options: [],
//             optionsIndex: -1,
//             showOptions: false,
//             inputValue: "",
//             clearButton: false,
//             clearButtonHover: false,
//             valid: false,
//             validate: false,
//         });
//     }

//     inputValue() {
//         if(this.state.optionsIndex == -1) {
//             return this.state.inputValue;
//         } else {
//             return this.state.options[this.state.optionsIndex];
//         }
//     }

//     showOptions() {
//         return this.state.options.length > 0;
//     }

//     // Навигация по списку
//     handleKeyDown(event) {
//         if(event.nativeEvent.key == "ArrowDown" || event.nativeEvent.key == "ArrowUp") {
//             event.stopPropagation();
//             event.preventDefault();

//             let index = this.state.optionsIndex;
//             let count = this.state.options.length;
            
//             if(count > 0) {
//                 count = count + 1; // add -1 value

//                 switch(event.nativeEvent.key) {
//                     case "ArrowDown": index = (index + 2) % count - 1; break;
//                     case "ArrowUp": ; index = (index + count) % count - 1; break;
//                 }

//                 this.setState({
//                     optionsIndex: index,
//                 }, () => {
//                     this.input.value = this.inputValue();
//                     this.input.selectionStart = this.input.value.length;
//                     this.input.selectionEnd = this.input.value.length;
//                 });
//             }

//             return false;
//         }

//         if(event.nativeEvent.key == "Enter") {
//             this.input.blur();
//         }

//         return true;
//     }

//     isClearButton() {
//         return this.input.value.length > 0;
//     }

//     handleInput(event) {
//         this.state.inputValue = event.target.value;
//         this.state.optionsIndex = -1;
//         this.search(this.state.inputValue);
//     }

//     handleFocus() {
//         this.setState({
//             showOptions: this.showOptions(),
//             clearButton: this.isClearButton(),
//         });
//     }

//     handleBlur() {
//         this.setState({
//             showOptions: false,
//             clearButton: false,
//             optionsIndex: -1,
//             options: [],
//         });
//     }

//     getRandomArbitrary(min, max) {
//         return Math.floor(Math.random() * (max - min) + min);
//     }

//     search(query) {
//         if(query !== "") {
//             const count = this.getRandomArbitrary(1, 5);
//             const items = Array.apply(null, Array(5)).map(item => `Кубышка №${this.getRandomArbitrary(1, 5)}`);
//             this.setState({
//                 options: items,
//                 showOptions: items.length > 0,
//             });
//         } else {
//             this.setState({
//                 options: [],
//                 showOptions: false,
//             });
//         }
//     }

//     handleSelect(index) {
//         this.state.optionsIndex = index;
//         this.input.value = this.inputValue();
//         this.input.selectionStart = this.input.value.length;
//         this.input.selectionEnd = this.input.value.length;

//         this.setState({
//             showOptions: false,
//         });
//     }

//     render() {
//         return (
//             <div style={{position: 'relative'}}>
//                 <input
//                     className={`sInput-autocomplete
//                         ${this.state.valid                          ? " sInput-phone--success" : 
//                         (!this.state.valid && this.state.validate)  ? " sInput-phone--error"   : ""}`}
//                     onFocus={this.handleFocus.bind(this)}
//                     onBlur={this.handleBlur.bind(this)}
//                     onInput={this.handleInput.bind(this)}
//                     onKeyDown={this.handleKeyDown.bind(this)}
//                     ref={ref => this.input = ref}/>
//                 {
//                     this.state.showOptions &&
//                     <div 
//                         className="options-container"
//                         data-section-title={this.state.options.length == 0 ? "Ничего не найдено" : "Результаты" }>
//                         {
//                             this.state.options.length > 0 &&
//                             this.state.options.map((item, index) => 
//                                 <div 
//                                     key={index}
//                                     className={`options-container__item
//                                         ${(this.state.optionsIndex === index) ? " options-container__item--selected" : ""}`}
//                                     onMouseDown={() => {this.handleSelect(index)}}
//                                 >{item}</div>
//                             )
//                         }
//                     </div>
//                 }
//             </div>
//         );
//     }
// }

export default Utility__AutocompleteBox;


// {
//     this.state.clearButton &&
//     <IconButton
//         className="sInput-autocomplete__clear-button"
//         style={style.cummonIconButton} 
//         iconStyle={style.cummonIcon}
//         onMouseEnter={this.handleClearMouseEnter.bind(this)}
//         onMouseLeave={this.handleClearMouseLeave.bind(this)}
//         onClick={this.handleClearClick}
//         ><Clear hoverColor={"#888"}/>
//     </IconButton>
// }


                

        // if(text != "") {
        //     $.ajax({
        //         url: `http://kladr-api.ru/api.php?query=${text}&limit=5&contentType=city`,
        //         type: 'get',
        //         dataType: 'jsonp'
        //     }).done(jsonData => {
        //         if(jsonData.result != null) {
        //             if(jsonData.result.length > 0) {
        //                 this.setState({
        //                     options: jsonData.result.map(item => ({title: item.name})),
        //                 });
        //                 return;
        //             }
        //         }

        //         this.setState({
        //             options: [],
        //         });
        //     });
        // }

        // <div className={`utility__autocomplete-box ${vState}`} 
        //         data-pre-select-title={cummonTitle.pre}
        //         data-error-title={cummonTitle.error}
        //         // data-autocomplete-title={autocomplete}
        //         >
        //         <input 
        //                 className="utility__autocomplete-box__input" 
        //                 type="text"
        //                 value={currentValue}
        //                 onFocus={this.handleFocus}
        //                 onBlur={this.handleBlur}
        //                 onInput={this.handleInput}
        //                 onChange={this.handleChange}
        //                 onKeyUp={this.handleKeyDown}
        //                 ref="root"
        //                 />
        //         <div className="utility__autocomplete-box__cummon-button">

        //         </div>
        //         {/* <div
        //             className="utility__autocomplete-box__icon"
        //             onClick={this.handleClick}
        //             onMouseEnter={this.handleClearMouseEnter}
        //             onMouseLeave={this.handleClearMouseLeave}>
        //         </div> */}
                // <div 
                //     className={`utility__autocomplete-box__options-container ${ exFocus ? "utility__autocomplete-box__options-container--expand": "" }`} 
                //     data-section-title={options.length == 0 ? cummonTitle.noElements : cummonTitle.section }>
                //     { 
                //         options.map((item, index) => 
                //             <div 
                //                 key={index}
                //                 className={`utility__autocomplete-box__options-container__item 
                //                             ${(selectedId === index) ? "utility__autocomplete-box__options-container__item--selected" : ""}`}
                //                 onMouseDown={() => {this.handleSelect(item.id)}}
                //             >{item.title}</div>
                //         )
                //     }
                // </div>
        //     </div>