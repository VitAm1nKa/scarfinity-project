import React from 'react';

import './reviews-container.less';

import Review from './Review.jsx';

import RaisedButton from 'material-ui/RaisedButton';
import {green} from '../basic/SRaisedButton.js';

import CatalogNavigation from '../catalogNavigation/CatalogNavigation.jsx';

export class ReviewsContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            items: props.items,
            currentIndex: 0,
            pagesCount: props.items && props.items.length > 0 ? Math.ceil(props.items.length / 3) : 0,
        }
    }

    handleIndexChange(index) {
        this.setState({
            currentIndex: index,
        });
    }

    componentWillReceiveProps(props) {
        this.setState(props);
    }

    render() {
        return(
            <div className="reviews-container">
                {
                    this.state.pagesCount > 0 &&
                    this.state.items
                    .slice(this.state.currentIndex * 3, (this.state.currentIndex + 1) * 3)
                    .map((item, index) => 
                        <div key={index} className="reviews-container__item">
                            <Review {...item}/>
                        </div>
                )}
                <div className="reviews-container__bottom-navigation">
                    {
                        this.state.pagesCount > 0 &&
                        <CatalogNavigation
                            onIndexChange={this.handleIndexChange.bind(this)}
                            pagesCount={this.state.pagesCount}
                            currentPage={this.state.currentIndex + 1} />
                    }
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