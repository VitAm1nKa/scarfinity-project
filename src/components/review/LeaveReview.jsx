import React from 'react';

import './leave-review.less';

import Utility__RaitingBox from '../utility/Utility__RaitingBox.jsx';
import RaisedButton from 'material-ui/RaisedButton';
import {green, addReviewBack} from '../basic/SRaisedButton.js';

export class LeaveReview extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            disabled: true,
        }

        this.onTextChange = this.onTextChange.bind(this);
    }

    onTextChange() {
        const text = this.refs.textarea.value;
        const length = text.replace(/ +(?= )/g,'').trim().length;
        if(length >= 20) {
            this.setState({disabled: false});
        } else {
            this.setState({disabled: true});
        }
    }

    render() {

        const {disabled} = this.state;

        return(
            <div className="leave-review">
                <div className="leave-review__top-row">
                    <div className="leave-review__top-row__avatar"></div>
                    <div className="leave-review__top-row__user-name">Михаил Силантьев</div>
                    <div className="leave-review__top-row__rating">
                        <span className="leave-review__top-row__rating__label">Оценка:</span>
                        <Utility__RaitingBox currentValue={5} changeable />
                    </div>
                </div>
                <div className="leave-review__text-box">
                    <textarea className="leave-review__text-box__text-area" name="" id="" rows="10" placeholder="Напишите отзыв о товаре..."
                        onChange={this.onTextChange}
                        ref="textarea"></textarea>
                </div>
                <div className="leave-review__bottom-row">
                    <div className="leave-review__bottom-row__button">
                        <RaisedButton label="Оставить отзыв" {...green} disabled={disabled} />
                    </div>
                    <div className="leave-review__bottom-row__notice">Минимальная длина: 20 символов</div>
                </div>
            </div>
        );
    }
}

export class LeaveReviewHeader extends React.Component {
    constructor(props, context) {
        super(props, context);

        const {onBackToReviews} = props;

        if(onBackToReviews && typeof(onBackToReviews) === 'function') {
            this.onBackToReviews = onBackToReviews;
        }

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        if(this.onBackToReviews) {
            this.onBackToReviews();
        }
    }

    render() {
        return(
            <div className="leave-review-header">
                <span className="leave-review-header__title">Оставить отзыв</span>
                <RaisedButton
                    onClick={this.handleClick}
                    className="leave-review-header__button" 
                    label 
                    {...addReviewBack} />
            </div>
        );
    }
}