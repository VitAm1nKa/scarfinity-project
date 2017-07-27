import React from 'react';

import FilterContainerView  from '../filter-block';
import {ColorPicker}        from '../../utility/Utility__ColorPicker.jsx';

const FilterColorPickerView = (props) => {
    return(
        <FilterContainerView
            title={props.title}
            buttonTitle={props.buttonTitle}
            buttonAction={props.buttonAction}>
                <ColorPicker />
        </FilterContainerView>
    )
}
FilterColorPickerView.defaultProps = {
    title: "Цвет",
    buttonTitle: "сброс",
    buttonAction: () => {},
}

class FilterColorPicker extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        }

        this.handleButtonAction = this.handleButtonAction.bind(this);
    }

    handleButtonAction() {

    }

    render() {
        return(
            <FilterColorPickerView />
        )
    }
}
FilterColorPicker.defaultProps = {
    
}

export default FilterColorPicker;