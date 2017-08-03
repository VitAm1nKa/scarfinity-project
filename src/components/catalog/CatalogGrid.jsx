import React from 'react';

import './catalog-grid.less';

import Paper from 'material-ui/Paper';
import {CatalogProductCardDefault} from './CatalogProductCardMini.jsx';
import CatalogNavigation from '../catalogNavigation/CatalogNavigation.jsx';
import Utility__SelectBox from '../utility/Utility__SelectBox.jsx';
import ProductCardCatalogView from '../utility/product-card-catalog';

// Filters
const FiltersContainerView = (props) => {
    return(
        <div className="">
            
        </div>
    )
}


export default class CatalogGrid extends React.Component {

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

        // setTimeout(callback, 2000);

        // callback();


        // this.forceUpdate(callback);
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
                <div className="catalog-grid__navigation">
                    <div className="catalog-grid__navigation__pagination">
                        <CatalogNavigation onIndexChange={this.handleIndexChange} pagesCount={1} currentPage={1} />
                    </div>
                    <div className="catalog-grid__navigation__item">
                        <Paper zDepth={1}>
                            <Utility__SelectBox lightTheme/>
                        </Paper>
                    </div>
                    <div className="catalog-grid__navigation__middle">

                    </div>
                    <div className="catalog-grid__navigation__item">
                        <Paper zDepth={1}>
                            <Utility__SelectBox lightTheme/>
                        </Paper>
                    </div>
                </div>
                <div className="catalog-grid__container">
                    {
                        itemList.map((value, index) => 
                            <div key={index} className={`catalog-grid__container__item ${value.isItem ? "catalog-grid__container__item--active" : ""}`}>
                                {value.isItem ? <ProductCardCatalogView /> : ""}
                            </div>
                        )
                    }
                    <div className="catalog-grid__process-block"></div>
                </div>
                <div>123</div>

            </div>
        );
    }

}
