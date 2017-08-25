import React from 'react';
import {Route, Redirect, Switch} from 'react-router';
import { Link } from 'react-router-dom'

import {Grid, Row, Container, Col}              from '../../components/utility/grid';
import CartHeaderNavigation                     from '../../components/cart/CartTest.jsx';

const Page__Cart = (props) => {
    return(
        <CartHeaderNavigation />
    )
}

export default Page__Cart;