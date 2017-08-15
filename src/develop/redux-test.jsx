import React from 'react';
import {Provider, connect} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import {Router, Route, Redirect, Switch} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';
import {HashRouter} from 'react-router-dom';

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import ActionInfo from 'material-ui/svg-icons/action/info';
import FlatButton from 'material-ui/FlatButton';

import reducer from './reducers'

import {getTracks} from './actions/tracks';


import PriceRangeWidget from '../components/utility/PriceRangeWidget.jsx';
import DevelopFiltersContainer from '../components/filters/filters-container';
import FilterPriceRange from '../components/filters/price-range';
import FilterColorPicker from '../components/filters/color-picker';
import FilterRatingSelect from '../components/filters/rating-select';
import FilterTagGrid from '../components/filters/tag-grid';
import FilterSeasonSelectView from '../components/filters/check-box-list-view';
import FilterPopularItems from '../components/filters/popular-items';

// Catalog
import ProductCardCatalogView from '../components/utility/product-card-catalog';
import PriceTicket from '../components/utility/price-ticket';
import CatalogGrid from '../components/catalog/CatalogGrid.jsx';

// Main
import ContentGrid from '../components/utility/content-grid';
import {ProductCardsGridView, FiltersGrid} from '../components/catalog/catalog-grid';

// Navigation
import TreeNavigation from '../components/navigation/tree-navigation';
import TopMenu from '../components/navigation/top-menu';
import MainMenu from '../components/navigation/main-menu';

// Banner
import {Wrapper} from '../components/utility/Utility__Css.jsx';
import Banner from '../components/utility/banner';



// Icon test
const CartIcon = (props) => {
    return(
        <svg 
            viewBox="0 0 200 200"
            {...props.style}
            style={{
                display: 'inline-block',
                userSelect: 'none',
                fill: props.color,
                fillRule: 'evenodd',
                width: props.width,
                height: props.height,
            }}>>
            <path d="M43,176L24,102c-1.125-5.906-8-8-8-8-6,0-6-15,0-15H184c6,0,6,15,0,15,0,0-7,2.063-8,8l-19,74s-2,8-6,8H49C45,184,43,176,43,176Zm19-21H86c10,0,10,13,0,13H62C52,168,52,155,62,155Zm52,0h26c8.15,0,7.994,13,0,13H114C104,168,104,155,114,155ZM54,139a7.017,7.017,0,1,1,0-14H86a7.017,7.017,0,1,1,0,14H54Zm60,0a7.017,7.017,0,1,1,0-14h32a7.017,7.017,0,1,1,0,14H114ZM44,108c-10,0-10-15,0-15H86c10,0,10,15,0,15C86,108.462,41.479,108,44,108Zm70,0c-10,0-10-15,0-15h42c10,0,10,15,0,15H114ZM79,18c8-8,17.861,2.139,10,10L49,68c-7.4,7.4-17.538-2.462-10-10Zm70,50c8,8,17.861-2.139,10-10L119,18c-7.4-7.4-17.538,2.462-10,10Z"/>
        </svg>
    )
}
CartIcon.defaultProps = {
    color: '#fff',
    width: 22,
    height: 22,
}





const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));
// const history = syncHistoryWithStore(hashHistory, store);

const filterTracks = (tracks, searhTrackTitle = '') => {
    return tracks.filter(track => track.title.includes(searhTrackTitle));
}

                // leftSection={connect(
                //     state => ({
                //         testStore: state.colors
                //     }),
                //     dispatch => ({})
                //     (
                //         props => {
                //             return(
                //                 <FiltersGrid />
                //             )
                //         }
                //     )
                // )}

// Develop container
const DevelopContainer = (props) => {
    return(
        <div style={{background: "#eaeaea"}}>
            <TopMenu />
            <MainMenu />
            <Wrapper>
                <Banner />
            </Wrapper>
            <ContentGrid
                leftSection={<Connect__FiltersGrid />}
                middleSection={<ProductCardsGridView />}
                treeNavigation={<TreeNavigation />}/>
            <CatalogGrid /> 
            <DevelopFiltersContainer>
                <FilterPriceRange />
                <FilterColorPicker />
                <FilterRatingSelect />
                <FilterPopularItems />
                <FilterTagGrid />
                <FilterSeasonSelectView />
                <ProductCardCatalogView /> 
                <div></div>
                <div></div>
            </DevelopFiltersContainer>
            <PriceTicket /> 
            <CartIcon color={"#000"} height={120} width={120}/>
        </div>
    )
}

// Components  -----------------------------------
const Connect__FiltersGrid = connect(
    state => ({
        colors: state.filters.colors,
        priceRange: state.filters.priceRange,
        rating: state.filters.rating,
        season: state.filters.season,
    }),
    dispatch => ({
        onPriceRangeChange: (action) => {
            dispatch({type: 'PRICE_RANGE__DEFAULT', action: action});
        }
    })
)
(FiltersGrid);

const FirstTest = connect(
    state => ({
        testStore: filterTracks(state.tracks, state.filterTracks),
    }),
    dispatch => ({})
)
(
    props => {
        console.log(props);
        return(
            <div>
                <Paper zDepth={1} style={{margin: 30, padding: 30}}>
                    <div style={{display: 'flex', justifyContent: "space-between", paddingBottom: 10}}>
                        <div>
                            <TextField hintText="Enter track name" ref={props.inputRef}/><br />
                            <RaisedButton 
                                label="Add track" 
                                primary={true} 
                                onClick={props.onButtonClick}/>
                        </div>
                        <div>
                            <TextField hintText="Search track" ref={props.searchInputRef}/><br />
                            <RaisedButton 
                                label="Find track" 
                                secondary={true} 
                                onClick={props.onSearchButtonClick}/>
                        </div>
                    </div>
                    <Divider />
                    <List>
                        {
                            props.testStore.map((track, index) =>
                                <ListItem
                                    key={index}
                                    primaryText={track.title} 
                                    rightIcon={<ActionInfo />}/>
                            )
                        }
                    </List>
                    <div style={{textAlign: "right"}}>
                        <FlatButton
                            label="Get tracks"
                            onClick={props.onGetTracksClick}/>
                    </div>
                </Paper>
            </div>
        )
});
FirstTest.defaultProps = {
    onButtonClick: () => {},
    onSearchButtonClick: () => {},
    onGetTracksClick: () => {},
    inputRef: null,
    searchInputRef: null,
}

const Track = connect((state, props) => {

    console.log(state);

    return { title: "Hello" }
})((props) => (
    <Paper zDepth={1} style={{margin: 30, padding: 30}}>
        {console.log(props)}
        <h1>{props.trackTitle}</h1>
    </Paper>
))
Track.defaultProps = {
    trackTitle: "No title",
}

// Export -----------------------------------------
class TestReduxWrap extends React.Component {
    constructor(props) {
        super(props);

        console.log('location', props);

        this.handleClick = this.handleClick.bind(this);
        this.handleSearchClick = this.handleSearchClick.bind(this);
        this.handleGetTracksClick = this.handleGetTracksClick.bind(this);
    }

    handleGetTracksClick() {
        store.dispatch(getTracks());
    }

    handleClick(value) {
        let inputValue = this.input.value;
        // redux work
        if(inputValue !== '') {
            this.input.value = '';
            let newTrack = {
                id: Date.now().toString(),
                title: inputValue,
            }
            store.dispatch({type: 'ADD_TRACK', payload: newTrack});
        }
    }

    handleSearchClick() {
        let inputValue = this.searchInput.value;
        store.dispatch({type: 'FIND_TRACK', payload: inputValue});
    }

    render() {
        return(
            <div>
                <FirstTest
                    onButtonClick={this.handleClick}
                    onSearchButtonClick={this.handleSearchClick}
                    onGetTracksClick={this.handleGetTracksClick}
                    // inputRef={input => this.input = input.input}
                    // searchInputRef={input => this.searchInput = input.input}
                    />
            </div>
        )
    }
}

const TestRedux = () => (
    <Provider store={store}>
        <HashRouter>
            <Switch>
                <Route exact path='/' component={TestReduxWrap} />
                <Route path='/test' component={DevelopContainer} />
                <Route exact path='/:id' component={PriceRangeWidget} />
            </Switch>
        </HashRouter>
    </Provider>
)

export default TestRedux;