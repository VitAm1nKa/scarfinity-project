import React from 'react';

import './review.less';

import Utility__RaitingBox from '../utility/Utility__RaitingBox.jsx';

const Review = (props) =>  {
    console.log(props);
    return(
        <div className="review">
            <div className="review__left-side">
                <div className="review__left-side__rating">
                    <Utility__RaitingBox currentValue={props.rating}/>
                </div>
                <div className="review__left-side__avatar">
                    {
                        props.userInfo &&
                        <img src={props.userInfo.avatar} />
                    }
                </div>
            </div>
            <div className="review__right-side">
                <div className="review__right-side__top-row">
                    <span className="review__right-side__top-row__user-name">Михаил Силантьев</span>
                    <div className="review__right-side__top-row__rating">
                        <Utility__RaitingBox iconSize={18} currentValue={props.rating}/>
                    </div>
                    <span className="review__right-side__top-row__date">{props.date}</span>
                </div>
                <div className="review__right-side__content">
                    <p className="review__right-side__content__text">
                        {props.body}
                    </p>
                </div>
                <div className="review__right-side__bottom-row">
                    <span className="review__right-side__bottom-row__question" 
                          data-normal="Был ли этот отзыв полезен Вам?"
                          data-small="Полезный отзыв?"></span>
                    <div className="review__right-side__bottom-row__answer review__right-side__bottom-row__answer--yes" data-value={`(${props.useful})`}>да</div>
                    <div className="review__right-side__bottom-row__answer review__right-side__bottom-row__answer--no" data-value={`(${props.unuseful})`}>нет</div>
                </div>
            </div>
        </div>
    );
}
Review.defaultProps = {
    id: -1,
    rating: 0,
    body: "",
    date: "",
    useful: 0,
    unuseful: 0,
    userInfo: null,
}

export default Review;