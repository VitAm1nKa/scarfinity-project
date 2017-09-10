import ReactDOM from 'react-dom';
import React from 'react';
import {Router, Route, Redirect, Switch} from 'react-router';
import {BrowserRouter, HashRouter} from 'react-router-dom';

import {Provider, connect} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import {syncHistoryWithStore} from 'react-router-redux';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import reducer from './redux/reducers';
var store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

import './main.less';

// import api from './api';

// import SessionActions from './actions/SessionActions';

// import App from './App.jsx';

// window.handleGoogleApiLoaded = () => {
// 	SessionActions.authorize(true, renderApp);
// 	console.log('API loaded');
// }

// Production -------------------------------
import Pages from './pages';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import api from './api';

// api.init__(renderApp);
renderApp();

function renderApp() {
	ReactDOM.render(
		<MuiThemeProvider>
			<Provider store={store}>
				<HashRouter>
					<Pages />
				</HashRouter>
			</Provider>
		</MuiThemeProvider>,
		document.getElementById('mount-point')
	);
};

// function renderApp() {
// 	ReactDOM.render(
// 		<Router>
// 			<Route path="/" component={App} />
// 		</Router>,
// 		document.getElementById('mount-point')
// 	);
// };

