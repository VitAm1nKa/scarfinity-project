import React from 'react';

import { HashRouter, Route, Redirect, Switch } from 'react-router-dom';



//import {Router, Route, Redirect, Switch, HashRouter} from 'react-router'

// import {Provider, connect} from 'react-redux';
// import {createStore, applyMiddleware} from 'redux';
// import {composeWithDevTools} from 'redux-devtools-extension';
// import thunk from 'redux-thunk';
// import {Router, Route, Redirect, Switch} from 'react-router';
// import {syncHistoryWithStore} from 'react-router-redux';
// import {HashRouter} from 'react-router-dom';

// Components

const RootCatalog = (props) => (
    <div>
        {console.log(props)}
        <h1>{props.title}</h1>
    </div>
)
RootCatalog.defaultProps = {
    title: "Default title",
}

const Root = props => (
    <div>
        <h1>ROOT</h1>
        <Switch>
            <Route path='/catalog' render={props => <RootCatalog {...props} title="Catalog" />}/>
            <Route path='/info' render={props => <RootCatalog {...props} title="Info" />}/>
            <Route path='/user' render={props => <RootCatalog {...props} title="User" />}/>
            <Route path='/cart' render={props => <RootCatalog {...props} title="Cart" />}/>
        </Switch>
    </div>
)

const MainRouting = (props) => (
    <HashRouter>
        <Switch>
            <Route path='/' component={Root} />
        </Switch>
    </HashRouter>
)

export default MainRouting;