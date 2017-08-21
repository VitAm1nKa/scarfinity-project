import React from 'react';

import './product-card.less';

import {Router, Route, Redirect, Switch} from 'react-router';
import {HashRouter, Link} from 'react-router-dom';
import { parse } from 'qs';

const Tet = (props) => {
    console.log("WORK!!!!!1", props);
    return(
        <span>{props.title}</span>
    )
} 
Tet.defaultProps = {
    title: "Work",
}

class Page__ProductCard extends React.Component {
    constructor(props) {
        super(props);

        console.log(props);

        let query = parse(props.location.search.substr(1));
        // this.z = query.z;

        this.path = props.match.path;

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
        console.log(nextProps, nextState, this.state);

        if(nextState.z !== this.state.z) {
            return true;
        }

        return false;
    }

    componentWillReceiveProps(props) {
        console.log("New props");
        let query = parse(props.location.search.substr(1));
        this.setState({
            z: query.z,
        });
    }

    render() {
        console.log("Main render");
        return(
            <div className="page__product-card">
                {
                    this.state.items.map((item, index) =>
                        <div
                            key={index}
                            className="page__product-card-item"></div>     
                    )
                }
                <Tet title={this.state.z} />
            </div>
        )
    }
}

export default Page__ProductCard;