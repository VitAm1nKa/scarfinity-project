import React from 'react';

import './review.less';

import Utility__RaitingBox from '../utility/Utility__RaitingBox.jsx';

class Review extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            id: 1,
            title: "",
            user: {
                name: "",
                avatar: "",
            },
            rating: 0,
            useful: {
                yes: 0,
                no: 0,
            },
            content: "",
            date: "",
        }

        const {reviewData} = props;

        if(reviewData) {
            this.state = reviewData;
        }
    }

    ////------------------------------------

    componentWillReceiveProps(props) {
        const {reviewData} = props;
        if(reviewData) {
            this.setState(reviewData);
        }
    }

    render() {

        const {user, rating, useful, content, date} = this.state;

        return(
            <div className="review">
                <div className="review__left-side">
                    <div className="review__left-side__rating">
                        <Utility__RaitingBox currentValue={rating}/>
                    </div>
                    <div className="review__left-side__avatar">
                        <img src={user.avatar} />
                    </div>
                </div>
                <div className="review__right-side">
                    <div className="review__right-side__top-row">
                        <span className="review__right-side__top-row__user-name">Михаил Силантьев</span>
                        <div className="review__right-side__top-row__rating">
                            <Utility__RaitingBox currentValue={rating}/>
                        </div>
                        <span className="review__right-side__top-row__date">{date}</span>
                    </div>
                    <div className="review__right-side__content">
                        <p className="review__right-side__content__text">
                            {content}
                        </p>
                    </div>
                    <div className="review__right-side__bottom-row">
                        <span className="review__right-side__bottom-row__question" 
                              data-normal="Был ли этот отзыв полезен Вам?"
                              data-small="Полезный отзыв?"></span>
                        <div className="review__right-side__bottom-row__answer review__right-side__bottom-row__answer--yes" data-value={`(${useful.yes})`}>да</div>
                        <div className="review__right-side__bottom-row__answer review__right-side__bottom-row__answer--no" data-value={`(${useful.no})`}>нет</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Review;