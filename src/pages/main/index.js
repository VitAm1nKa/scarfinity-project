import React from 'react';

import './main.less';

import {Grid, Row, Container, Col} from '../../components/utility/grid';

// Navigation
// import TreeNavigation from '../components/navigation/tree-navigation';
import TopMenu                  from '../../components/navigation/top-menu';
import MainMenu                 from '../../components/navigation/main-menu';
import {Footer, Copyright}      from '../../components/navigation/footer';

const Main = (props) => {
    return(
        <Grid>
            <TopMenu />
            <MainMenu />
            {/* Content start */}

            {/* Content end */}
            <Row className="item-width">
                <Container>
                    <Col className="item">Footer</Col>
                </Container>
            </Row>
            <div className="item">Footer sub line</div>
            <Row className="item-width">
                <Container>
                    <Col className="item">Copyright</Col>
                </Container>
            </Row>
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