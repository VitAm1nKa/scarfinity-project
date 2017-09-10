import React from 'react';
import {Route, Redirect, Switch} from 'react-router';

import './left-section.less';

import LeftMenu from '../../components/utility/left-menu';

// Filters -----------------------------
import ColorPicker      from '../../components/filters/color-picker';
import PriceRange       from '../../components/filters/price-range';
import RatingSelect     from '../../components/filters/rating-select';
import CheckBoxListView from '../../components/filters/check-box-list-view';

// Reclame blocks ----------------------
import PopularItems     from '../../components/filters/popular-items';
import RecenlyViewed    from '../../components/filters/recenly-viewed';
import TagGrid          from '../../components/filters/tag-grid';

const Site__LeftSection = (props) => {
    console.log("Left section props", props);
    return(
        <div className="site__left-section">
            <LeftMenu />

            {/* Product page */}
            <Route path="/product" component={RecenlyViewed} />
            <Route path="/product" component={PopularItems} />
            <Route path="/product" component={TagGrid} />

            {/* Catalog filters */}
            <Route path="/catalog" component={ColorPicker} />
            <Route path="/catalog" component={PriceRange} />
            <Route path="/catalog" component={RatingSelect} />
            <Route path="/catalog" component={CheckBoxListView} />

            <Switch>
                <Route path="/product" render={props => <div>{"Product"}</div>} />
                <Route path="/cart" render={props => <div>{"Cart"}</div>} />
            </Switch>
        </div>
    )
}

export default Site__LeftSection;