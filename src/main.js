import ReactDOM from 'react-dom';
import React from 'react';
import { HashRouter as Router, Route, Link } from 'react-router-dom';

// import api from './api';

// import SessionActions from './actions/SessionActions';

import App from './App.jsx';

// window.handleGoogleApiLoaded = () => {
// 	SessionActions.authorize(true, renderApp);
// 	console.log('API loaded');
// }

renderApp();

function renderApp() {
	ReactDOM.render(
		<Router>
			<Route path="/" component={App} />
		</Router>,
		document.getElementById('mount-point')
	);
};

