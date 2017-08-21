import React from 'react';

import './sub-banner.less';

import {Wrapper}                    from '../Utility__Css.jsx';
import Utility__ImageContainer      from '../Utility__ImageContainer.jsx';
import ChevroneLeft                 from 'material-ui/svg-icons/navigation/chevron-left';
import ChevroneRight                from 'material-ui/svg-icons/navigation/chevron-right';

var iconStyle = {
    width: 30,
    height: 30,
}

var paginationStyle = {
    width: 12,
    height: 12,
}

const SubBannerPagination = (props) => {
    return(
        <div className="sub-banner-pagination">
            {
                Array.apply({}, Array(props.itemsCount)).map((item, index) =>
                    <div
                        key={index}
                        className={`sub-banner-pagination__item ${props.currentIndex == index ? "sub-banner-pagination__item--active" : ""}`}
                        onClick={() => {props.onClick(index)}}></div>
                )
            }
        </div>
    )
}
SubBannerPagination.defaultProps = {
    itemsCount: 3,
    currentIndex: 1,
    onClick: () => {},
}

const SubBannerButton = (props) => {
    return(
        <div className={`sub-banner-button sub-banner-button${props.left ? "--left" : "--right"}`}>
            <div className={`sub-banner-button__container sub-banner-button__container${props.left ? "--left" : "--right"}`}>
                <Utility__ImageContainer imageUrl={props.imageUrl} />
            </div>
            <div className="sub-banner-button__icon">
                {
                       props.left
                    ? <ChevroneLeft style={iconStyle} />
                    : <ChevroneRight style={iconStyle} />
                }
            </div>
        </div>
    )
}
SubBannerButton.defaultProps = {
    left: false,
    imageUrl: "img/img2.jpg",
}

const SubBannerImage = (props) => {
    return(
        <div className="sub-banner-image">
            <div className="sub-banner-image__container">
                <Utility__ImageContainer imageUrl={props.imageUrl} />
            </div>
        </div>
    )
}
SubBannerImage.defaultProps = {
    imageUrl: "img/img2.jpg",
}

const SubBannerContent = (props) => {
    return(
        <div className="sub-banner-content">
            <span className="sub-banner-content__title">{props.title}</span>
            <div className="sub-banner-content__delim"></div>
            <span className="sub-banner-content__subtitle">{props.subTitle}</span>
            <div className="sub-banner-content__button">
                <button className="banner-button banner-button--first">
                    <span className="banner-button__text">{props.buttonTitle}</span>
                </button>
            </div>
        </div>
    )
}
SubBannerContent.defaultProps = {
    title: "Travel Bags",
    subTitle: "This sounded a very good reason, and Alice was quite pleased to know it. 'I never thought of that before!' she said.",
    buttonTitle: "Купить",
}

class SubBanner extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            changing: false,
            items: props.items,
            currentIndex: 0,
            intervalDelay: props.intervalDelay,
        }

        this.itemsCount = this.state.items.length;

        this.goNext = this.goNext.bind(this);
        this.goPrev = this.goPrev.bind(this);
    }

    start() {
        console.log("Interval started");
        this.interval = setInterval(() => {
            this.goNext();
        }, this.state.intervalDelay);
    }

    pause() {
        if(this.interval) {
            console.log("Interval paused");
            clearInterval(this.interval);
        }
    }

    stop() {
        if(this.interval) {
            console.log("Interval stoped");
            clearInterval(this.interval);
            this.interval = undefined;
        }
    }

    componentDidMount() {
        this.start();
    }

    componentWillUnmount() {
        this.stop();
    }

    changing(nextIndex, onChange, afterChange) {
        this.setState({
            changing: true,
        }, () => {
            if(onChange) onChange(() => {
                let timeout = setTimeout(() => {
                    this.setState({
                        currentIndex: nextIndex,
                        changing: false,
                    }, () => {
                        if(afterChange) afterChange();
                        clearTimeout(timeout);
                        timeout = undefined;
                    });
                }, 500);
            });
        });
    }

    changeIndex(index) {
        this.changing(index, callback => {
            this.pause();
            callback()
        }, () => {
            this.start();
        });
    }

    goPrev() {
        let nextIndex = this.state.currentIndex - 1;
        this.changeIndex(nextIndex < 0 ? this.itemsCount - 1 : nextIndex);
    }

    goNext() {
        let nextIndex = (this.state.currentIndex + 1) % this.itemsCount;
        this.changeIndex(nextIndex);
    }

    handlePaginationClick(index) {
        this.changeIndex(index);
    }

    render() {
        const selectedItem = this.state.items[this.state.currentIndex];
        const prevIndex = this.state.currentIndex - 1 < 0 ? this.itemsCount - 1 : this.state.currentIndex - 1;
        const nextIndex = (this.state.currentIndex + 1) % this.itemsCount;
        const prevImage = this.state.items[prevIndex].imageUrl;
        const nextImage = this.state.items[nextIndex].imageUrl;
        return(
            <div className={`sub-banner ${this.state.changing ? "sub-banner--changing" : ""}`}>
                <Wrapper>
                    <div className={`sub-banner__container`}>
                        <div 
                            className="sub-banner__button"
                            onClick={this.goPrev}>
                            <SubBannerButton 
                                left
                                imageUrl={prevImage}/>
                        </div>
                        <div className="sub-banner__image">
                            <SubBannerImage
                                imageUrl={selectedItem.imageUrl}/>
                        </div>
                        <div className="sub-banner__content">
                            <SubBannerContent
                                title={selectedItem.title}
                                subTitle={selectedItem.subTitle}
                                buttonTitle={selectedItem.buttonTitle}/>
                        </div>
                        <div 
                            className="sub-banner__button"
                            onClick={this.goNext}>
                            <SubBannerButton
                                imageUrl={nextImage}/>
                        </div>
                    </div>
                    <div className="sub-banner__pagination">
                        <div className="sub-banner__pagination__nothing"></div>
                        <div className="sub-banner__pagination__dots">
                            <SubBannerPagination
                                itemsCount={this.state.items.length}
                                currentIndex={this.state.currentIndex}
                                onClick={this.handlePaginationClick.bind(this)}/>
                        </div>
                    </div>
                </Wrapper>
            </div>
        )
    }
}
SubBanner.defaultProps = {
    intervalDelay: 7000,
    items: [
        {
            title: "TRAVEL BAGS",
            subtitle: "This sounded a very good reason, and Alice was quite pleased to know it. 'I never thought of that before!' she said.",
            buttonTitle: "В магазин",
            imageUrl: "img/img2.jpg",
        },
        {
            title: "Как повязать шарф",
            subtitle: "This sounded a very good reason, and Alice was quite pleased to know it. 'I never thought of that before!' she said.",
            buttonTitle: "В блог",
            imageUrl: "img/img3.jpg",
        },
        {
            title: "Предзаказ, скидка",
            subtitle: "This sounded a very good reason, and Alice was quite pleased to know it. 'I never thought of that before!' she said.",
            buttonTitle: "К акциям",
            imageUrl: "img/img4.jpg",
        },
        {
            title: "Аксесуары",
            subtitle: "This sounded a very good reason, and Alice was quite pleased to know it. 'I never thought of that before!' she said.",
            buttonTitle: "К акциям",
            imageUrl: "img/img5.jpg",
        },
    ]
}

export default SubBanner;