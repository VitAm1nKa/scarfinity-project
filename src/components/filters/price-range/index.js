import React from 'react';

import FilterContainerView  from '../filter-block';
import PriceRangeWidget     from '../../utility/PriceRangeWidget.jsx';

import RaisedButton from 'material-ui/RaisedButton';

export class FilterPriceRange extends React.Component {
    constructor(props) {
        super(props);

        this.state = props;

        this.handleButtonAction = this.handleButtonAction.bind(this);
        this.handleValueChange = this.handleValueChange.bind(this);
    }

    handleButtonAction() {
        this.setState({values: this.state.defaultValues});
    }

    handleValueChange(values) {
        // this.state.values = values;
    }

    render() {
        return(
            <FilterContainerView
                title="Цена"
                buttonTitle={"сброс"}
                buttonAction={this.handleButtonAction}>
                    <PriceRangeWidget
                        {...this.state.values}
                        minValue={this.state.minValue}
                        maxValue={this.state.maxValue}
                        onValueChange={this.handleValueChange}/>
            </FilterContainerView>
        )
    }
}
FilterPriceRange.defaultProps = {
    values: {
        leftValue: 50,
        rightValue: 60,
    },
    defaultValues: {
        leftValue: 10,
        rightValue: 90,
    },
    minValue: 500,
    maxValue: 5000,
};

export class TestFilter extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            leftValue: 10,
            rightValue: 90,
        }

        this.click = this.click.bind(this);
    }

    click() {
        this.forceUpdate(() => {
            console.log(this.state);
        });
    }

    render() {
        return(
            <div>
                <PriceRangeWidget
                    leftValue={this.state.leftValue}
                    rightValue={this.state.rightValue}/>
                <RaisedButton label="Primary" primary={true} onClick={this.click}/>
            </div>
        )
    }
}

export default FilterPriceRange;