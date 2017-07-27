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



const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));
// const history = syncHistoryWithStore(hashHistory, store);

const filterTracks = (tracks, searhTrackTitle = '') => {
    return tracks.filter(track => track.title.includes(searhTrackTitle));
}

// Develop container
const DevelopContainer = (props) => {
    return(
        <div style={{background: "#eaeaea"}}>
            <DevelopFiltersContainer>
                <FilterPriceRange />
                <FilterColorPicker />
                <FilterRatingSelect />
            </DevelopFiltersContainer>
        </div>
    )
}

// Components  -----------------------------------
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