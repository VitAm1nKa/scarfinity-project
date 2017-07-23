import React from 'react';
import { Route, Link } from 'react-router-dom';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import LoginPage from './components/LoginPage.jsx';
import AboutPage from './components/AboutPage.jsx';
import CatalogPage from './components/CatalogPage.jsx';
import CartHeaderNavigation from './components/cart/CartTest.jsx';
import BasicComponentsPage from './components/basic/BasicComponentsPage.jsx';

// Develop 				-------
import TestRedux from './develop/redux-test.jsx';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import './App.less';

import MainRouting from './develop/main-routing';

class App extends React.Component {
	render() {
		return (
			<MuiThemeProvider>
				<div className="App">
					<TestRedux />
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