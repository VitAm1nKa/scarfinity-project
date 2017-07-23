import React from 'react';

import './utility__select-box.less';

import IconButton from 'material-ui/IconButton';
import MoreVert from 'material-ui/svg-icons/navigation/more-vert';

const style = {
    iconButton: {
        width: 30,
        height: 30,
        padding: 0,
    },
    icon: {
        color: "#777",
    }
}

const validateState = {
    pre: "pre",
    selected: "selected",
    valid: "valid",
    error: "error",
}

class Utility__SelectBox extends React.Component {
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
            <div className={`utility__select-box ${vState} ${lightTheme ? "utility__select-box--light-theme" : ""}`} 
                data-pre-select-title={cummonTitle.pre}
                data-error-title={cummonTitle.error}
                >
                <input 
                        className="utility__select-box__input" 
                        type="text"
                        value={currentValue}
                        readOnly 
                        onFocus={this.handleFocus}
                        onBlur={this.handleBlur}
                        ref="root"
                        />
                <div className="utility__select-box__icon">
                    <IconButton style={style.iconButton} iconStyle={style.icon} onClick={this.handleClick}>
                        <MoreVert />
                    </IconButton>
                </div>
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

export default Utility__SelectBox;