import React from 'react';
import {Route, Redirect, Switch} from 'react-router';
import { Link } from 'react-router-dom'

import './main.less';

import {Grid, Row, Container, Col}  from '../../components/utility/grid';

import Banner                       from '../../components/utility/banner';
import SubBanner                    from '../../components/utility/sub-banner'; 
import PromoBlockContainer          from '../../components/utility/promo-block';
import CatalogSection               from '../../components/catalog/catalog-section';

const Main = (props) => {
    return(
        <Grid>
            <Banner />
            <CatalogSection />
            <SubBanner />
            <PromoBlockContainer />
        </Grid>
    )
}

export default Main;

{/* <TopMenu />
<MainMenu /> */}
{/* <Row>
<Container>
    <Col lg={3} md={3} className="item">Left</Col>
    <Col lg={12} md={12} className="item">Middle</Col>
    <Col lg={1} md={1} className="item">Right</Col>
</Container>
</Row> */}