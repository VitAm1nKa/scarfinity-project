import React from 'react';

import './review-and-other-section.less';

import {ReviewsContainer, ReviewsContainerHeader} from './ReviewsContainer.jsx';
import {LeaveReview, LeaveReviewHeader} from './LeaveReview.jsx';

class ReviewAndOtherSection extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            selectedId: 0,
            options: ["Отзывы", "Описание", "Дополнительно"],
            t: true,
            reviews: [],
            currentReviewListIndex: 0,
        }

        const {reviewsData} = props;

        if(reviewsData) {
            this.state.reviews = reviewsData;
        }

        this.handleClick = this.handleClick.bind(this);
        this.handleWriteReview = this.handleWriteReview.bind(this);
        this.handleBackToReviews = this.handleBackToReviews.bind(this);
        this.handleIndexChange = this.handleIndexChange.bind(this);

        this.reviewsContainerHeader = <ReviewsContainerHeader onWriteReview={this.handleWriteReview} />;
        this.LeaveReviewHeader = <LeaveReviewHeader onBackToReviews={this.handleBackToReviews} />;
    }

    handleClick(index) {
        this.setState({selectedId: index});
    }

    handleWriteReview() {
        console.log("!");
        this.setState({t: false});
    }

    handleBackToReviews() {
        console.log("!!");
        this.setState({t: true});
    }

    handleIndexChange(index) {
        this.setState({currentReviewListIndex: index});
    }

    getReviews(listId) {
        console.log(listId);
        const {reviews} = this.state;
        return reviews.slice(listId * 3, listId * 3 + 3);

    }

    render() {
        const { options, selectedId, t, currentReviewListIndex, reviews } = this.state;
        let reviewsCount = reviews.length;
        let pagesCount = Math.ceil(reviewsCount / 3);

        const navItems = options.map((option, index) =>
            <div key={index} 
                 className={`review-ao-section__navigation__item ${(selectedId === index) ? "review-ao-section__navigation__item--active" : ""}`}
                 onClick={() => {this.handleClick(index)}}
                 >{option}</div>
        );

        return(
            <div className="review-ao-section">
                <div className="review-ao-section__navigation">
                    {navItems}
                </div>
                <div className="review-ao-section__paper">
                    <div className="review-ao-section__navigation review-ao-section__navigation--fake">
                        {navItems}
                    </div>
                    <div className={`review-ao-section__container ${selectedId === 0 ? "rao-border" : ""}`}>
                        <div className="review-ao-section__container__header">
                            {   t 
                                ? <ReviewsContainerHeader onWriteReview={this.handleWriteReview} reviewsCount={reviewsCount} />
                                : <LeaveReviewHeader onBackToReviews={this.handleBackToReviews} />
                            }
                        </div>
                        <div className="review-ao-section__container__content">
                            {   t 
                                ? <ReviewsContainer 
                                    reviewListIndex={currentReviewListIndex} 
                                    reviewsData={this.getReviews(currentReviewListIndex)}
                                    onIndexChange={this.handleIndexChange}
                                    pagesCount={pagesCount}/>
                                : <LeaveReview />
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ReviewAndOtherSection;