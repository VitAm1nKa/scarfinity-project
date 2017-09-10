import React from 'react';
import {Route, Redirect, Switch} from 'react-router';

import './middle-section.less';

// Comonents -----------------------
import TreeNavigation               from '../../components/navigation/tree-navigation';

// Pages ---------------------------
import Page__CatalogGrid            from '../catalog-grid';
import Page__ProductCard            from '../product-card';
import Page__Cart                   from '../cart';
import Page__Info                   from '../info';
import Page__OptInfo                from '../opt-info';

const Site__MiddleSection = (props) => {
    return(
        <div className="site__middle-section">
            <TreeNavigation />
            <Switch>
                <Route path="/catalog" exact component={Page__CatalogGrid} />
                <Route path="/product/:id" component={Page__ProductCard} />
                <Route path="/product" component={Page__ProductCard} />
                <Route path="/cart" exact component={Page__Cart} />
                <Route path="/info" exact component={Page__Info} />
                <Route path="/opt/:id" component={Page__OptInfo} />
                <Route path="/opt" component={Page__OptInfo} />
            </Switch>
        </div>
    )
}

export default Site__MiddleSection;