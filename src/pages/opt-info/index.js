import React                        from 'react';
import {Route, Redirect, Switch}    from 'react-router';
import {Link}                       from 'react-router-dom'
import {connect}                    from 'react-redux';
import qs 			                from 'qs';

import {getProduct}                 from '../../redux/actions/products';                 

import CatalogGrid                  from '../../components/catalog/catalog-grid';

const Opt__Info = (props) => {
    console.log(props);
    return(
        <ul>
            <li>
                <h3>{props.match.params.id}</h3>
            </li>
        </ul>
    )
}

export default Opt__Info;