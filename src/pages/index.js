import React from 'react';
import {Route, Redirect, Switch} from 'react-router';
import { Link } from 'react-router-dom'

import './pages.less';

import {Grid, Row, Container, Col}          from '../components/utility/grid';

import SiteContainer                        from './site-container';

// Navigation
// import TreeNavigation from '../components/navigation/tree-navigation';
import TopMenu                              from '../components/navigation/top-menu';
import MainMenu                             from '../components/navigation/main-menu';
import {Footer, FooterLogo, Copyright}      from '../components/navigation/footer';

// Pages
import Main from './main';

const T = (props) => {
    console.log(props);
    return(
        <div>{props.title}</div>
    )
}

const Pages = (props) => {
    return(
        <Grid>
            <TopMenu />
            <MainMenu />
            <Row>
                <Container>
                    <Col md={2} className="item"><Link to="/">Main</Link></Col>
                    <Col md={2} className="item"><Link to="/product">Product</Link></Col>
                    <Col md={2} className="item"><Link to="/catalog">Catalog</Link></Col>
                    <Col md={2} className="item"><Link to="/cart">Cart</Link></Col>
                    <Col md={2} className="item"><Link to="/info">Information</Link></Col>
                    <Col md={2} className="item"><Link to="/opt">Opt</Link></Col>
                </Container>
            </Row>
            {/* Content start */}
                <Switch>
                    <Route path="/" exact component={Main}/>
                    <Route path="/" component={SiteContainer}/>
                    <Redirect to="/" />
                </Switch>
            {/* Content end */}
            <footer>
                <Footer />  
                <FooterLogo />
                <Copyright />
            </footer>
        </Grid>
    )
}

export default Pages;