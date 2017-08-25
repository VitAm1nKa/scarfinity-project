import React from 'react';

import './catalog-grid.less';

import Paper from 'material-ui/Paper';
import {CatalogProductCardDefault} from './CatalogProductCardMini.jsx';
import CatalogNavigation from '../catalogNavigation/CatalogNavigation.jsx';
import Utility__SelectBox from '../utility/Utility__SelectBox.jsx';
import ProductCardCatalogView from '../utility/product-card-catalog';

import LazyLoader from '../utility/lazy-loader';

const CatalogGridAutoloadLoading = (props) => {
    return(
        <div className="catalog-grid-autoload-loading">
            {
                props.loading  
                ? <LazyLoader size={9} text={props.loadingText}/>
                : <span className="catalog-grid-autoload-loading__text">{props.completedText}</span>
            }
        </div>
    )
}
CatalogGridAutoloadLoading.defaultProps = {
    loading: true,
    loadingText: "",
    completedText: "",
}

const CatalogItemsGrid = (props) => {
    return(
        <div className={`catalog-grid ${props.loading ? "catalog-grid--in-process" : "" }`}>
            <div className="catalog-grid__container">
                {
                    props.items && 
                    props.items.map((value, index) => 
                        <ProductCardCatalogView key={index} />
                    )
                }
                <div className="catalog-grid__process-block"></div>
            </div>
        </div>
    )
}
CatalogItemsGrid.defaultProps = {
    loading: false,
    items: null,
}

export class CatalogGridAutoload extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentCount: 1,
            maxCount: 15,
            loading: false,
            loadingProcess: false,
            completed: false,
            items: [],
            autoload: null,
        }

        this.handleScroll = this.handleScroll.bind(this);
    }

    componentWillMount() {
        // addEventListener('scroll', this.handleScroll.bind(this));
    }

    componentDidMount() {
        addEventListener('scroll', this.handleScroll);
        this.prepareItems(() => {
            this.forceUpdate();
        });
    }

    componentWillUnmount() {
        removeEventListener('scroll', this.handleScroll);
    }

    handleScroll(event) {
        let loadingGap = 600;
        let bounds = this.state.autoload.getBoundingClientRect();
        let windowHeight = document.documentElement.clientHeight;

        let topVisible = bounds.top > 0 && bounds.top < windowHeight;
        let bottomVisible = bounds.bottom < windowHeight && bounds.bottom > 0;

        // start loading
        if(bounds.bottom > 0 && bounds.bottom < (windowHeight + loadingGap)) {
            this.loadMore();
        }
    }

    prepareItems(callback) {
        let newArray = (Array.apply(null, Array(1 * 12)).map(item => ({title: ""})));
        this.state.items = this.state.items.concat(newArray);
        if(callback) callback();
    }

    loadMore() {
        // check is loading needed
        if(!this.state.loading) {
            if(this.state.currentCount < this.state.maxCount) {
                this.setState({
                    loading: true,
                });
                this.prepareItems(() => {
                    this.setState({
                        currentCount: this.state.currentCount + 1,
                        loading: false,
                        completed: this.state.currentCount + 1 >= this.state.maxCount,
                    });
                });
            }
        }
    }

    render() {
        return(
            <div
                className="catalog-grid-autoload" 
                ref={autoload => this.state.autoload = autoload}>
                    <div className="catalog-grid-autoload__body">
                        {
                            <CatalogItemsGrid items={this.state.items} />
                        }
                    </div>
                    <div className="catalog-grid-autoload__footer">
                        <CatalogGridAutoloadLoading loading={!this.state.completed} completedText={"Показаны все товары в этой категории"}/>
                    </div>
            </div>
        )
    }
}

export class CatalogGrid extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            items: ["", "", "", "", "",],
            inProcess: false,
        }

        this.handleIndexChange = this.handleIndexChange.bind(this);
	}

    handleIndexChange() {

    }

    setStateInProcess(nextProps, callback) {
        if(nextProps.items != null) {
            this.state.items = nextProps.items;
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({inProcess: true}, () => {
            if(nextProps.items != null) {
                this.state.items = nextProps.items;
            }

            // setTimeout(()=>{this.setState({inProcess: false})}, 2000);
            this.setState({inProcess: false});
        });
    }

    render() {

        const {items, inProcess} = this.state;
        // const remItemCount = items.length > 6 ? 12 : 6;
        let itemList = [];
        for(let i = 0; i < 12; i++) {
            itemList = [...itemList, { 
                isItem: !(typeof items[i] === 'undefined'),
                data: items[i],
            }];
        }

        console.log(itemList);

        return(
            <div className={`catalog-grid ${inProcess ? "catalog-grid--in-process" : "" }`}>
                <div className="catalog-grid-navigation">
                    <div className="catalog-grid-navigation__item">
                        <Paper zDepth={1}>
                            <Utility__SelectBox lightTheme/>
                        </Paper>
                    </div>
                    <div className="catalog-grid-navigation__middle">

                    </div>
                    <div className="catalog-grid-navigation__item">
                        <Paper zDepth={1}>
                            <Utility__SelectBox lightTheme/>
                        </Paper>
                    </div>
                </div>

                <div className="catalog-grid__container">
                    {
                        itemList.map((value, index) => 
                            <ProductCardCatalogView key={index} />
                        )
                    }
                    <div className="catalog-grid__process-block"></div>
                </div>
                <div>123</div>

            </div>
        );
    }

}
