import React from 'react';

import FilterContainerView  from '../filter-block';
import PriceRangeWidget     from '../../utility/PriceRangeWidget.jsx';

class FilterPriceRange extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            values: [50, 90],
            minValue: 150,
            maxValue: 5000,
        };

        this.handleButtonAction = this.handleButtonAction.bind(this);
    }

    handleButtonAction() {
        this.setState({values: [10, 90]});
    }

    render() {
        const {values, minValue, maxValue} = this.state;
        return(
            <FilterContainerView buttonAction={this.handleButtonAction}>
                <PriceRangeWidget
                    values={values}
                    minValue={minValue}
                    maxValue={maxValue}
                    onValueChange={this.handleValueChange}/>
            </FilterContainerView>
        )
    }
}
FilterPriceRange.defaultProps = {
    values: [50, 90],
    defaultValues: [10, 90],
    minValue: 500,
    maxValue: 5000,
}

export default FilterPriceRange;