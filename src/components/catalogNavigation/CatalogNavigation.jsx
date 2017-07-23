import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import KeyboardArrowLeft from 'material-ui/svg-icons/hardware/keyboard-arrow-left';
import KeyboardArrowRight from 'material-ui/svg-icons/hardware/keyboard-arrow-right';
import FontIcon from 'material-ui/FontIcon';

import {grey600, grey700} from 'material-ui/styles/colors';

import './CatalogNavigation.less';

const navButtonStyle = {
    color: grey600,
}

class CatalogNavogation extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            pagesCount: 1,
            currentPage: 1,
        };

        const {onIndexChange, pagesCount, currentPage} = props;

        if(onIndexChange) {
            this.changeIndex = onIndexChange;
        }

        if(pagesCount != null) {
            this.state.pagesCount = pagesCount;
        }

        if(currentPage != null) {
            this.state.currentPage = currentPage;
        }

        console.log(this.state);

        this.handleNext = this.handleNext.bind(this);
        this.handlePrev = this.handlePrev.bind(this);
        this.handleClick = this.handleClick.bind(this);
	}

    prevButtonIsNeed() {

        let { pagesCount, currentPage } = this.state;

        if(pagesCount <= 1) 
            return false

        if(currentPage == 1)
            return false;

        return true;
    }

    nextButtonIsNeed() {

        let { pagesCount, currentPage } = this.state;

        if(pagesCount <= 1) 
            return false

        if(currentPage == pagesCount)
            return false;

        return true;
    }

    getItemList() {
        let { currentPage, pagesCount } = this.state;

        if(pagesCount == 1) {
            return [ { value: "1", type: "current", key: "1" } ];
        }

        if(pagesCount > 1 && pagesCount <= 6) {
            var ret = [];
            for(let i = 1; i <= pagesCount; i++) {
                if(currentPage != i) {
                    ret.push( { value: i, type: "default", key: i } );
                } else {
                    ret.push( { value: i, type: "current", key: i } );
                }
            }

            return ret;
        }

        if(pagesCount > 6) {
            var ret = [];
            let leftSideValue = currentPage - 1;
            let rightSideValue = currentPage + 1;

            if(leftSideValue > 2 && rightSideValue < pagesCount - 1) {
                ret.push( { value: "1", type: "default", key: 1 } );
                ret.push( { value: "...", type: "disable", key: 2 } );
                ret.push( { value: leftSideValue, type: "default", key: leftSideValue } );
                ret.push( { value: currentPage, type: "current", key: currentPage } );
                ret.push( { value: rightSideValue, type: "default", key: rightSideValue } );
                ret.push( { value: "...", type: "disable", key: pagesCount - 1 } );
                ret.push( { value: pagesCount, type: "default", key: pagesCount } );
            }
            else if (leftSideValue <= 2) {
                for(var i = 1; i <= 4; i++) 
                    ret.push( { value: i, type: (currentPage == i) ? "current" : "default", key: i } );
                ret.push( { value: "...", type: "disable", key: 5 } );
                ret.push( { value: pagesCount, type: "default", key: pagesCount } );
            } else if(rightSideValue >= pagesCount - 2) {
                ret.push( { value: "1", type: "default", key: 1 } );
                ret.push( { value: "...", type: "disable", key: 2 } );
                for(var i = pagesCount - 3; i <= pagesCount; i++)
                    ret.push( { value: i, type: (currentPage == i) ? "current" : "default", key: i } );
            }

            return ret;

        }

        return [];
    }

    handleNext() {
        let { currentPage, pagesCount } = this.state;
        if(currentPage < pagesCount) {
            this.setState({
                currentPage: currentPage + 1,
            });

            if(this.changeIndex) {
                this.changeIndex(currentPage);
            }
        }
	}

	handlePrev() {
        let { currentPage } = this.state;
        if(currentPage > 1) {
            this.setState({
                currentPage: currentPage - 1,
            });

            if(this.changeIndex) {
                this.changeIndex(currentPage - 2);
            }
        }
	}

    handleClick(index) {
        let iIndex = parseInt(index);
        let { currentPage } = this.state;
        if(currentPage != iIndex) {
            this.setState({ currentPage: iIndex });

            if(this.changeIndex) {
                this.changeIndex(iIndex - 1);
            }
        }
    }

    renderState() {
        return {
            prevButton: this.prevButtonIsNeed(),
            nextButton: this.nextButtonIsNeed(),
            itemList: this.getItemList(),
        }
    }

    render() {

        let { prevButton, nextButton, itemList } = this.renderState();

        let r_prevButton = prevButton ? (<FlatButton 
                                            label="Назад"
                                            labelPosition="after"
                                            icon={<KeyboardArrowLeft />}
                                            style={navButtonStyle}
                                            onTouchTap={this.handlePrev}
                                        />) : null;

        let r_nextButton = nextButton ? ( <FlatButton 
                                            label="Вперед"
                                            labelPosition="before"
                                            icon={<KeyboardArrowRight />}
                                            style={navButtonStyle}
                                            onTouchTap={this.handleNext}
                                        /> ) : null;

        let r_itemList = [];

        itemList.forEach(function(element) {
            switch(element.type) {
                case "current": r_itemList.push(<li key={element.key}><FlatButton label={element.value} secondary={true} disableTouchRipple={false}/></li>); break;
                case "disable": r_itemList.push(<li key={element.key}><FlatButton label="..." disabled={true} /></li>); break;
                default: r_itemList.push(<li key={element.key}><FlatButton label={element.value} onClick={() => {this.handleClick(element.value)}} /></li>);
            }
        }, this);

		return (
            <div className="catalog-navigation">
                <div className="catalog-navigation__container">
                    <div className="catalog-navigation__container__left-side">
                        {r_prevButton}
                    </div>
                    <div className="catalog-navigation__container__middle-side">
                        <ul className="catalog-navigation__page-number-list">
                            { r_itemList }
                        </ul>
                    </div>
                    <div className="catalog-navigation__container__right-side">
                        {r_nextButton}
                    </div>
                </div>
            </div>
        );
    }

}

export default CatalogNavogation;