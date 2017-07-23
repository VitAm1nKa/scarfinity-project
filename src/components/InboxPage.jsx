import React 			from 'react';
import { Route, Link } 	from 'react-router-dom';
import PropTypes 		from 'prop-types';

import MessagePreview 	from './MessagePreview.jsx';
import Message 			from './Message.jsx';

import messages 		from '../messages.json';

import './InboxPage.less';

class InboxPage extends React.Component {

	constructor(props, context) {
		super(props, context);

		this.state = {
			messages: messages
		}
	}

	handlePreviewClick(messageId) {
		this.context.router.history.push(`/inbox/messages/${ messageId }`);
	}

	render() {

		let { messages: messages } = this.state;

		return (
			<div className="InboxPage">
				<div className="messages">
					{
						messages.map(message => 
							<MessagePreview 
								key = { message.id}
								onClick = { this.handlePreviewClick.bind(this, message.id) }
								title = { message.subject }
								senderName = { message.senderName }
							/>
						)
					}
				</div>

				<div className="message-container">
					<Route path='/inbox/messages/:messageId' component = { Message } />
				</div>
			</div>
		);
	}
}

InboxPage.contextTypes = {
	router: PropTypes.object.isRequired
}

export default InboxPage;