import React from 'react';
import {Route, Redirect, Switch} from 'react-router';
import { Link } from 'react-router-dom'

import {Grid, Row, Container, Col}  from '../../components/utility/grid';

import TreeNavigation               from '../../components/navigation/tree-navigation';

import Site__LeftSection            from '../left-section';
import Site__MiddleSection          from '../middle-section';

const SiteContainer = (props) => {
    console.log("LOLOL =>", props);
    return(
        <Grid>
            <Row>
                <Container>
                    <Col lg={3} md={3}>
                        <Site__LeftSection {...props} />
                    </Col>
                    <Col lg={12} md={12}>
                        <Site__MiddleSection />
                    </Col>
                    <Col lg={1} md={1} className="item">Right</Col>
                </Container>
            </Row>
        </Grid>
    )
}

export default SiteContainer;