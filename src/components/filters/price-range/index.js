import React from 'react';

import FilterContainerView  from '../filter-block';
import PriceRangeWidget     from '../../utility/PriceRangeWidget.jsx';

import RaisedButton from 'material-ui/RaisedButton';

const FilterPriceRange = (props) => {
    return(
        <FilterContainerView
            title="Цена"
            buttonTitle={"сброс"}
            buttonAction={props.onDefaultChange}>
                <PriceRangeWidget
                    {...props.values}
                    minValue={props.minValue}
                    maxValue={props.maxValue}
                    onValueChange={props.onValueChange}/>
        </FilterContainerView>
    )
}
FilterPriceRange.defaultProps = {
    values: {
        leftValue: 700,
        rightValue: 4000,
    },
    minValue: 500,
    maxValue: 5000,
    onValueChange: () => {},
    onDefaultChange: () => {},
};

export default FilterPriceRange;