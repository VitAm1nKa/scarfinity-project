import React from 'react';

class LoginPage extends React.Component {
	render() {
		return (
			<div>
				<h1>Hello world again!</h1>
				<div className="content">
					{this.props.children}
				</div>
			</div>
		)
	}
}

export default LoginPage;