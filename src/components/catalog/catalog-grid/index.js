import React from 'react';

import './catalog-grid.less';

import ProductCardCatalogView from '../../utility/product-card-catalog';

import CONSTANTS from '../../../develop/lib/constants';

// Filters import
import FilterPriceRange         from '../../filters/price-range';
import FilterColorPicker        from '../../filters/color-picker';
import FilterRatingSelect       from '../../filters/rating-select';
import FilterSeasonSelectView   from '../../filters/check-box-list-view';

// Product cards
export const ProductCardsGridView = (props) => {
    return(
        <div className="product-cards-grid">
            {
                props.items &&
                props.items.map((item, index) =>
                    <ProductCardCatalogView
                        key={index}/>
                )
            }
        </div>
    )
}
ProductCardsGridView.defaultProps = {
    items: ["", ""],
}

// Filters
export const FiltersGridView = (props) => {
    return(
        <div className="filters-grid">
            {
                props.priceRange && 
                <FilterPriceRange
                    values={{
                        leftValue: props.priceRange.leftValue,
                        rightValue: props.priceRange.rightValue,
                    }}
                    minValue={props.priceRange.minValue}
                    maxValue={props.priceRange.maxValue}/>
            }
            {props.color && <FilterColorPicker />}
            {props.rating && <FilterRatingSelect />}
            {props.season && <FilterSeasonSelectView />}
        </div>
    )
}
FiltersGridView.defaultProps = {
    priceRange: null,
    color: null,
    rating: null,
    season: null,
}

export class FiltersGrid extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            priceRange: props.priceRange,
            colors: props.colors,
            rating: props.rating,
            season: props.season,
        }

        console.log("State = >", this.state);
    }

    render() {
        return(
            <FiltersGridView
                priceRange={this.state.priceRange}
                colors={this.state.colors}
                rating={this.state.rating}
                season={this.state.season}/>
        )
    }
}
FiltersGrid.defaultProps = {
    priceRange: null,
    colors: null,
    rating: null,
    season: null,
}

export default ProductCardsGridView;