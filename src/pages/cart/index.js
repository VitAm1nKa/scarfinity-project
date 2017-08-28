import React from 'react';
import {Route, Redirect, Switch} from 'react-router';
import { Link } from 'react-router-dom'

import {Grid, Row, Container, Col}          from '../../components/utility/grid';
import Cart                                 from '../../components/cart';

const Page__Cart = (props) => {
    return(
        <Cart {...props} />
    )
}

export default Page__Cart;