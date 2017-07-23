import React from 'react';

import './MessagePreview.less';

class MessagePreview extends React.Component {

	constructor(props, context) {
		super(props, context);
	}

	render() {

		let { title, senderName, onClick } = this.props;

		return (
			<div className="MessagePreview" onClick = { onClick }>
				<div className="title">
					{ title }
				</div>
				<div className="from">
					{ `from ${senderName}` }
				</div>
			</div>
		);
	}
}

export default MessagePreview;