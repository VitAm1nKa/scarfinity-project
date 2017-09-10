import React from 'react';

import FilterContainerView  from '../filter-block';
import RatinCheckBoxWidget  from '../../utility/rating-check-box';

const FilterRatingSelectView = (props) => {
    return(
        <FilterContainerView
            title={props.title}
            buttonTitle={props.buttonTitle}
            buttonAction={props.buttonAction}>
                <RatinCheckBoxWidget selectedIndex={props.selectedIndex}/>
        </FilterContainerView>
    )
}
FilterRatingSelectView.defaultProps = {
    title: "Рейтинг",
    buttonTitle: "сброс",
    buttonAction: () => {},
    selectedIndex: 0,
}

class FilterRatingSelect extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
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
            <FilterRatingSelectView 
                selectedIndex={this.state.values.selectedIndex}
                buttonAction={this.handleButtonAction} />
        )
    }
}
FilterRatingSelect.defaultProps = {
    values: {
        selectedIndex: 4,
    },
    defaultValues: {
        selectedIndex: 4,
    }
}

export default FilterRatingSelect;