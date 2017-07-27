import React from 'react';

import './filter-block.less';

import Paper from 'material-ui/Paper';

// import filters content
import PriceRangeWidget from '../utility/PriceRangeWidget.jsx';

export const DevelopFiltersContainer = (props) => {
    return(
        <div className="develop-filters-container">
            {props.children}
        </div>
    )
}

export const FilterContainerView = (props) => {
    return(
        <Paper style={{padding: '0px 15px', position: 'relative'}} zDepth={1}>
            <div className="filter-block">
                <div className="filter-block__header">
                    <span className="filter-block__header__title">{props.title}</span>
                    <div 
                        className="filter-block__header__reset-block"
                        onClick={props.buttonAction}
                    >{props.buttonTitle}</div>
                </div>
                <div className="filter-block__delim"></div>
                <div className="filter-block__content">
                    {props.children}
                </div>
            </div>
        </Paper>
    )
}
FilterContainerView.defaultProps = {
    title: "Имя фильра",
    buttonTitle: "bTitle",
    buttonAction: () => {},
}

// Filters
export class FilterPriceRange extends React.Component {
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
        // console.log(this.defaultProps);
        // this.state.values = this.defaultValues;
        // this.forceUpdate();
        // this.setState({values: this.defaultValues});
        this.forceUpdate();
    }

    render() {
        console.log(this.state.values);
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

// export default FilterContainerView;