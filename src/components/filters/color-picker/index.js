import React from 'react';

import FilterContainerView  from '../filter-block';
import {ColorPicker}        from '../../utility/Utility__ColorPicker.jsx';

const FilterColorPickerView = (props) => {
    return(
        <FilterContainerView
            title={props.title}
            buttonTitle={props.buttonTitle}
            buttonAction={props.buttonAction}>
                <ColorPicker
                    colors={props.colors}
                    selectedIndex={props.selectedColors}
                    multiselect/>
        </FilterContainerView>
    )
}
FilterColorPickerView.defaultProps = {
    title: "Цвет",
    buttonTitle: "сброс",
    buttonAction: () => {},
    colors: "",
    selectedColors: "",
}

class FilterColorPicker extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            colors: props.colors,
            values: props.values,
            defaultValues: props.defaultValues,
        }

        this.handleButtonAction = this.handleButtonAction.bind(this);
    }

    handleButtonAction() {
        this.setState({values: this.state.defaultValues});
    }

    render() {
        return(
            <FilterColorPickerView
                colors={this.state.colors}
                selectedColors={this.state.values.selectedColors}
                buttonAction={this.handleButtonAction}/>
        )
    }
}
FilterColorPicker.defaultProps = {
    colors: "1, 2, 3",
    values: {
        selectedColors: "",
    },
    defaultValues: {
        selectedColors: "",
    }
}

export default FilterColorPicker;