import React from 'react';
import {Router, Route, Redirect, Switch} from 'react-router';
import {BrowserRouter} from 'react-router-dom';

import {Provider, connect} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import {syncHistoryWithStore} from 'react-router-redux';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import reducer from './redux/reducers';
const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// import reducer from './reducers'

// import {getTracks} from './actions/tracks';








// Develop 				-------
import TestRedux from './develop/redux-test.jsx';

// Production -------------------------------
import Main from './pages/main';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import './App.less';

class App extends React.Component {
	render() {
		return (
			<MuiThemeProvider>
				<div className="App">
					<Provider store={store}>
						<BrowserRouter>
							<Switch>
								<Route exact path='/' component={Main} />
							</Switch>
						</BrowserRouter>
					</Provider>
				</div>
			</MuiThemeProvider>
		);
	}
}

export default App;



{/* <Route exact path="/login" component={LoginPage} />
<Route exact path="/about" component={AboutPage} />
<Route exact path="/catalogPage" component={CatalogPage} />
<Route exact path="/h" component={CartHeaderNavigation} />
<Route exact path="/basic" component={BasicComponentsPage} />
<Route exact path="/develop" component={TestRedux} /> */}