import React from 'react';

import './popular-items.less';

import FilterContainerView  from '../filter-block';
import ProductCardMin from '../../utility/product-card-min';

export const PopularItemsView = (props) => {
    return(
        <div 
            className="popular-items"
            ref={props.containerRef}>
            {
                props.items &&
                props.items.map((item, index) =>
                    <ProductCardMin 
                        key={index}/>
                )
            }
        </div>
    )
}
PopularItemsView.defaultProps = {
    items: ["", "", "", ""],
    containerRef: null,
}

export const FilterPopularItemsView = (props) => {
    return(
        <FilterContainerView
            title={props.title}
            buttonTitle={props.buttonTitle}
            buttonAction={props.buttonAction}>
                <PopularItemsView containerRef={props.containerRef} />
        </FilterContainerView>
    )
}
FilterPopularItemsView.defaultProps = {
    title: "Популярные",
    buttonTitle: "все",
    containerRef: null,
}

class FilterPopularItems extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        // window.addEventListener('resize', this.onSizeChange)
    }

    componentDidMount() {
    }

    componentWillUnmount() {
        // window.removeEventListener('resize', this.onSizeChange)
    }

    render() {
        return(
            <FilterPopularItemsView containerRef={container => this.container = container}/>
        )
    }
}

export default FilterPopularItems;