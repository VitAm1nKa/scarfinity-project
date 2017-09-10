import React from 'react';

import './top-menu.less';

import {Row, Container, Col} from '../../utility/grid';

import AutocompleteBox from '../../utility/Utility__AutocompleteBox.jsx';

const TopMenuSign = (props) => {
    return(
        <div className="top-menu-sign">
            <span className="top-menu-sign__link">Вход</span>
            <span className="top-menu-sign__delim">/</span>
            <span className="top-menu-sign__link">Регистрация</span>
        </div>
    )
}

const TopMenu = (props) => {
    return(
        <Row className="top-menu">
            <Container>
                <Col className="top-menu__container">
                    <div className="top-menu__container__logo">
                        SCARFINITY
                    </div>
                    <div className="top-menu__container__sign">
                        <TopMenuSign />
                    </div>
                    <div className="top-menu__container__search">
                        <AutocompleteBox />
                    </div>
                </Col>
            </Container>
        </Row>
    )
}

export default TopMenu;