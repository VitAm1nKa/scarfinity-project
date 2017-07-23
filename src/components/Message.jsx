import React 		from 'react';

import './Message.less';

import messages 	from '../messages.json';

class Message extends React.Component {

	constructor(props, context) {
		super(props, context);

		let { messageId } = this.props.match.params;

		this.state = {
			message: messages.find(message => message.id === messageId)
		}
	}

	componentWillReceiveProps(nextProps) {
		let { messageId: prevId } = this.props.match.params;
		let { messageId: nextId } = nextProps.match.params;

		if(prevId !== nextId) {
			this.setState({
				message: messages.find(message => message.id === nextId)
			});
		}
	}

	render() {

		let { message } = this.state;

		return (
			<div className="Message">
				<p>From: {message.senderName} ({message.senderEmail})</p>
				<p>To: You</p>
				<p>Subject: {message.subject}</p>
				<hr />
				<p>{message.body}</p>
			</div>
		);
	}
}

export default Message;