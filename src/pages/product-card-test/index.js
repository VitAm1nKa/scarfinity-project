import React from 'react';

import './product-card.less';

import {Router, Route, Redirect, Switch} from 'react-router';
import {HashRouter, Link} from 'react-router-dom';
import { parse } from 'qs';

import Page__PhotoGallery from '../photo-gallery';

import LazyLoader from '../../components/utility/lazy-loader';
import ImageGallery from '../../components/utility/image-gallery-view';

const Tet = (props) => {
    console.log("WORK!!!!!1", props);
    return(
        <span>{props.title}</span>
    )
} 
Tet.defaultProps = {
    title: "Work",
}

class Page__ProductCard1 extends React.Component {
    constructor(props) {
        super(props);

        console.log(props);

        let query = parse(props.location.search.substr(1));
        // this.z = query.z;

        this.path = props.location;

        this.state = {
            items: Array.apply(null, Array(10)).map((item, index) => ({ id: index, title: `title__${index}` })),
            z: query.z,
        }
    }

    componentWillMount() {
        console.log("Will mount");
    }

    componentDidMount() {
        console.log("Did mount");
    }

    shouldComponentUpdate(nextProps, nextState) {
        // console.log(nextProps, nextState, this.state);

        if(nextState.z !== this.state.z) {
            return true;
        }

        return false;
    }

    componentWillReceiveProps(props) {
        // console.log("New props");
        let query = parse(props.location.search.substr(1));
        this.path = props.location;
        this.setState({
            z: query.z,
        });
    }

    handleClick(index) {
        // console.log(index, this.state.z);
    }

    render() {
        return(
            <div>
                <div className="page__product-card">
                    {
                        this.state.items.map((item, index) =>
                            <Link
                                key={index} 
                                to={`productcard?z=photo-123${45 + index}`}>
                                    <div
                                        key={index}
                                        className="page__product-card-item"
                                        onClick={() => {this.handleClick(index)}}></div>     
                            </Link>
                        )
                    }
                    {
                        this.state.z &&
                        <ImageGallery
                            location={this.path}
                            currentIndex={this.state.z}/>
                    }
                </div>
            </div>
        )
    }
}

export default Page__ProductCard1;