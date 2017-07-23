import React from 'react';

import './reviews-container.less';

import Review from './Review.jsx';

import RaisedButton from 'material-ui/RaisedButton';
import {green} from '../basic/SRaisedButton.js';

import CatalogNavigation from '../catalogNavigation/CatalogNavigation.jsx';

export class ReviewsContainer extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            items: ["", "", ""],
            pagesCount: 10,
            currentPage: 1,
        }

        const {reviewsData, onIndexChange, pagesCount, currentPage} = props;

        if(reviewsData) {
            this.state.items = reviewsData;
        }

        if(onIndexChange) {
            this.onIndexChange = onIndexChange;
        }

        if(pagesCount !== null) {
            this.state.pagesCount = pagesCount;
        }

        if(currentPage !== null) {
            this.state.currentPage = currentPage;
        }

        this.handleIndexChange = this.handleIndexChange.bind(this);
    }

    handleIndexChange(index) {
        if(this.onIndexChange) {
            this.onIndexChange(index);
        }
    }

    ////------------------------------

    componentWillReceiveProps(props) {
        const {reviewsData} = props;
        if(reviewsData) {
            this.setState({items: reviewsData});
            console.log(reviewsData);
        }
    }

    render() {

        const {items, pagesCount, currentPage} = this.state;

        return(
            <div className="reviews-container">
                {items.map((item, index) => 
                    <div key={index} className="reviews-container__item">
                        <Review reviewData={item}/>
                    </div>
                )}

                <div className="reviews-container__bottom-navigation">
                    <CatalogNavigation onIndexChange={this.handleIndexChange} pagesCount={pagesCount} currentPage={currentPage} />
                </div>

            </div>
        );
    }
}

export class ReviewsContainerHeader extends React.Component {
    constructor(props, context) {
        super(props, context);

        console.log("constructor");

        this.state = {
            hidden: false,
            reviewsCount: 0,
        }

        const {onWriteReview, hidden, reviewsCount} = this.props;

        if(onWriteReview && typeof(onWriteReview) === 'function') {
            this.onWriteReview = onWriteReview;
        }

        if(hidden != null && typeof(hidden) === 'boolean') {
            this.state.hidden = hidden;
        }

        if(reviewsCount != null) {
            this.state.reviewsCount = reviewsCount;
        }

        this.handleClick = this.handleClick.bind(this);
    }

    componentWillReceiveProps(props) {
        const {hidden} = this.props;
        if(hidden !== null && typeof(hidden) === 'boolean') {
            this.state.hidden = hidden;
        }

        this.forceUpdate();
    }

    handleClick() {
        const onWriteReview = this.onWriteReview;
        if(onWriteReview) {
            onWriteReview();
        }
    }

    render() {

        const {hidden, reviewsCount} = this.state;

        return(
            <div className={`reviews-container-header ${hidden ? "reviews-container-header--hidden" : ""}`}>
                <span className="reviews-container-header__title">Отзывы</span>
                <div className="reviews-container-header__review-count">{reviewsCount}</div>
                <div className="reviews-container-header__div"></div>
                <RaisedButton 
                    onClick={this.handleClick}
                    className="reviews-container-header__button" 
                    label="Написать отзыв" 
                    {...green} />
            </div>
        );
    }

}