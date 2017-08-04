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
    console.log(props);
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
            {props.colors && <FilterColorPicker />}
            {props.rating && <FilterRatingSelect />}
            {props.season && <FilterSeasonSelectView />}
        </div>
    )
}
FiltersGridView.defaultProps = {
    priceRange: null,
    colors: null,
    rating: null,
    season: null,
}

export const FiltersGrid = (props) => {
    return(
        <FiltersGridView
            priceRange={props.priceRange}
            colors={props.colors}
            rating={props.rating}
            season={props.season}/>
    )
}
FiltersGrid.defaultProps = {
    priceRange: null,
    colors: null,
    rating: null,
    season: null,
    onClick: () => {},
}

export default ProductCardsGridView;