import React from 'react';

import './catalog-section.less';

import {ProductCardCatalogView, ProductCardCatalogViewWhite}    from '../../utility/product-card-catalog';
import {Wrapper}                                                from '../../utility/Utility__Css.jsx';
import ArrowForward                                             from 'material-ui/svg-icons/navigation/arrow-forward';
import ArrowBack                                                from 'material-ui/svg-icons/navigation/arrow-back';

var iconStyle = {
    width: 20,
    height: 20,
}

const CatalogSectionHeaderWhite = (props) => {
    return(
        <div className="catalog-section-header--white">
            <div className="catalog-section-header--white__title">Best Sellers</div>
            <div 
                className={`catalog-section-header--white__button first ${props.leftToggle ? "catalog-section-header--white__button--disabled" : ""}`}
                onClick={() => {if(!props.leftToggle) props.onLeftClick()}}>
                    <ArrowBack style={iconStyle} />
            </div>
            <div
                className={`catalog-section-header--white__button second ${props.rightToggle ? "catalog-section-header--white__button--disabled" : ""}`}
                onClick={() => {if(!props.rightToggle) props.onRightClick()}}>
                    <ArrowForward style={iconStyle} />
            </div>
        </div>
    )
}
CatalogSectionHeaderWhite.defaultProps = {
    leftToggle: true,
    rightToggle: true,
    onLeftClick: () => {},
    onRightClick: () => {},
}

const CatalogSectionHeader = (props) => {
    return(
        <div className="catalog-section-header">
            <div 
                className={`catalog-section-header__button ${props.leftToggle ? "catalog-section-header__button--disabled" : ""}`}
                onClick={() => {if(!props.leftToggle) props.onLeftClick()}}>
                    <ArrowBack style={iconStyle} />
            </div>
            <div className="catalog-section-header__spacer"></div>
            <div className="catalog-section-header__title">Best Sellers</div>
            <div className="catalog-section-header__spacer"></div>
            <div 
                className={`catalog-section-header__button ${props.rightToggle ? "catalog-section-header__button--disabled" : ""}`}
                onClick={() => {if(!props.rightToggle) props.onRightClick()}}>
                    <ArrowForward style={iconStyle} />
            </div>
        </div>
    )
}
CatalogSectionHeader.defaultProps = {
    leftToggle: true,
    rightToggle: true,
    onLeftClick: () => {},
    onRightClick: () => {},
}

const CatalogSectionHeaderConnect = (props) => {
    return(
          props.whiteStyle
        ? <CatalogSectionHeaderWhite {...props.data}/> 
        : <CatalogSectionHeader {...props.data} />
    )
}
CatalogSectionHeader.defaultProps = {
    whiteStyle: false,
    data: {},
}

const ProductCardCatalogConnect = (props) => {
    return(
           props.whiteStyle
        ? <ProductCardCatalogViewWhite {...props.data} />
        : <ProductCardCatalogView {...props.data} />
    )
}
ProductCardCatalogConnect.defaultProps = {
    whiteStyle: false,
    data: {},
}

class CatalogSectionProducts extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            whiteStyle: props.whiteStyle,
            prepare: true,
            itemsCount: props.itemsCount,
            offset: 0,
            visibleItems: 5,
            gapWidth: 14,
            itemWidth: 0,
            itemHeight: 0,
            minItemWidth: 190,
        }

        this.paginationState = props.paginationState;

        this.moveBack = this.moveBack.bind(this);
        this.moveForvard = this.moveForvard.bind(this);
    }

    componentWillMount() {
        window.addEventListener('resize', this.onResize.bind(this));
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.onResize.bind(this));
    }

    componentDidMount() {
        this.calculateWidth();
    }

    onResize() {
        this.calculateWidth();
    }

    calculateWidth() {
        if(this.baseContainer) {
            let width = this.baseContainer.getBoundingClientRect().width;
            let visibleCount = Math.floor(width / this.state.minItemWidth);
            let gapSumWidth = this.state.gapWidth * (visibleCount - 1);
            let itemWidth = (width - gapSumWidth) / visibleCount;
            this.state.visibleItems = visibleCount;
            this.state.itemWidth = itemWidth;
            this.state.itemHeight = Math.ceil(itemWidth * 1.57);
            this.setStateExtended({
                prepare: false,
            });
        } else {
            console.error("Reference error");
        }
    }

    setStateExtended(nextState) {
        this.setState(nextState, () => {
            this.paginationCallback();
        });
    }

    moveForvard() {
        this.setStateExtended({
            offset: Math.min(this.state.offset + 1, this.state.visibleItems),
        });
    }

    moveBack() {
        this.setStateExtended({
            offset: Math.max(this.state.offset - 1, 0),
        });
    }

    paginationCallback() {
        const leftDisable = this.state.offset == 0;
        const rightDisable = this.state.offset == this.state.visibleItems;
        this.paginationState(leftDisable, rightDisable);
    }

    prepareItems(itemsCount, itemWidth = 0, gapWidth = 14, offset = 0) {
        const containerWidth = itemsCount * itemWidth + (itemsCount - 1) * gapWidth;
        this.state.offset = Math.min(offset, Math.max(this.state.itemsCount - this.state.visibleItems, 0));
        const offsetWidth = this.state.offset * (itemWidth + gapWidth);
        return(
            <div 
                className="catalog-section-products__container"
                style={{
                    width: containerWidth,
                    transform: `translate3d(-${offsetWidth}px, 0, 0)`,
                }}>
                    {
                        Array.apply(null, Array(itemsCount)).map((item, index) =>
                            <div 
                                className="catalog-section-products__container__item"
                                key={index}>
                                    <ProductCardCatalogConnect whiteStyle={this.state.whiteStyle} />
                            </div>
                        )
                    }
            </div> 
        )
    }

    render() {
        return(
            <div 
                className="catalog-section-products"
                style={{
                    height: this.state.itemHeight,
                }}
                ref={(base => this.baseContainer = base)}>
                {
                    !this.state.prepare &&
                    this.prepareItems(this.state.itemsCount, this.state.itemWidth, this.state.gapWidth, this.state.offset)
                }
            </div>
        )
    }
}
CatalogSectionProducts.defaultProps = {
    whiteStyle: false,
    itemsCount: 10,
    paginationState: () => {},
}

class CatalogSection extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            whiteStyle: props.whiteStyle,
            paginationLeftToggle: false,
            paginationRightToggle: false,
        }
    }

    handleLeftClick() {
        if(this.products) {
            this.products.moveBack();
        }
    }

    handleRightClick() {
        if(this.products) {
            this.products.moveForvard();
        }
    }

    handlePaginationState(left, right) {
        if(this.state.paginationLeftToggle != left || this.state.paginationRightToggle != right) {
            this.setState({
                paginationLeftToggle: left,
                paginationRightToggle: right,
            });
        }
    }

    render() {
        return(
            <div className={`catalog-section catalog-section${this.state.whiteStyle ? "--white": ""}`}>
                <Wrapper>
                    <div className="catalog-section__header">
                        <CatalogSectionHeaderConnect
                            whiteStyle={this.state.whiteStyle}
                            data={{
                                leftToggle: this.state.paginationLeftToggle,
                                rightToggle: this.state.paginationRightToggle,
                                onLeftClick: this.handleLeftClick.bind(this),
                                onRightClick: this.handleRightClick.bind(this),
                            }}/>
                    </div>
                    <div className="catalog-section__content">
                        <div className="catalog-section__content__container">
                            <CatalogSectionProducts
                                whiteStyle={this.state.whiteStyle}
                                ref={products => this.products = products}
                                paginationState={this.handlePaginationState.bind(this)}/>
                        </div>
                        <div className="catalog-section__content__side-section"></div>
                    </div>
                </Wrapper>
            </div>
        )
    }
}
CatalogSection.defaultProps = {
    whiteStyle: false,
}

export default CatalogSection;