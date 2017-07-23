import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';

import IconButton from 'material-ui/IconButton';
import HightlightOff from 'material-ui/svg-icons/action/highlight-off';
import {blue500} from 'material-ui/styles/colors';

import CatalogPathNavigation from './navigation/catalogPathNavigation.jsx';

import '../styles/greeds.less';
import './AboutPage.less';
import './cart/Cart.less';

const style = {
  margin: 12,
  color: blue500,
};

class AboutPage extends React.Component {

	constructor(props, context) {
		super(props, context);

		this.state = {
			finished: false,
    		stepIndex: 0,
		};

		this.handleNext = this.handleNext.bind(this);
		this.handlePrev = this.handleNext.bind(this);
	}

	handleNext() {
		let { stepIndex } = this.state;
		if(stepIndex > 0) {
			this.setState({ 
				stepIndex: stepIndex + 1,
				finished: stepIndex >= 2,
			});
		}
	}

	handlePrev() {
		let { stepIndex } = this.state;
		if(stepIndex > 0) {
			this.setState({ 
				stepIndex: stepIndex - 1,
			});
		}
	}

	getStepContent(stepIndex) {
	    switch (stepIndex) {
	      case 0:
	        return 'Select campaign settings...';
	      case 1:
	        return 'What is an ad group anyways?';
	      case 2:
	        return 'This is the bit I really care about!';
	      default:
	        return 'You\'re a long way from home sonny jim!';
	    }
  	}

	render() {
		return (
			<section>
				<div className="greeds__content greeds__wrap">
					<div className="test">

						<CatalogPathNavigation />

						<Paper zDepth={1}>
							<div className="cart_m__bottom-section">
								<div className="left">
									<FlatButton label="Вернуться к покупкам" style={style} />
								</div>
								<div className="middle">
									<IconButton>
										<HightlightOff style={style} color={blue500} />
									</IconButton>
								</div>
								<div className="right">
									<RaisedButton label="Купить" primary={true} style={style} />
								</div>
							</div>
						</Paper>
					</div>
				</div>
			</section>
		);
	}
}

export default AboutPage;