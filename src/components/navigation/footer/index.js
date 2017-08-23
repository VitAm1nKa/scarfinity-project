import React from 'react';

import {Row, Container, Col} from '../../utility/grid';

import './footer.less';

const FooterMenu = (props) => {
    return(
        <div className="footer-menu">
            <span className="footer-menu__title">{props.title}</span>
            {
                props.list.map((value, index) => 
                    <span key={index} className="footer-menu__item">{value}</span>
                )
            }
        </div>
    )
}
FooterMenu.defaultProps = {
    title: "Вкладка",
    list: [],
}

const FooterGreed = (props) => {
    return(
        <div className="footer-grid">
            {
                props.items.map((value, index) => 
                    <div key={index} className="footer-grid__item">
                        <FooterMenu title={value.title} list={value.list}/>
                    </div>
                )
            }
        </div>
    )
}
FooterGreed.defaultProps = {
    items: [
        {title: "Каталог", list: ["", "", ""]},
        {title: "Аккаунт", list: ["", "", "", ""]},
        {title: "О компании", list: ["", ""]},
        {title: "Контакты", list: ["", "", "", ""]},
    ]
}

export const Copyright = (props) => {
    return(
        <Row>
            <Container>
                <Col>
                    <div className="bottom-logo"></div>
                    <div className="bottom-copyright">{props.copyrightTitle}</div>
                </Col>
            </Container>
        </Row>
    )
}
Copyright.defaultProps = {
    copyrightTitle: "© 2017 Scarfinity. Все права защищены.",
}

export const Footer = (props) => {
    return(
        <Row className="footer">
            <Container>
                <FooterGreed items={props.menuItems} />
            </Container>
        </Row>
    )
}
Footer.defaultProps = {
    menuItems: [
        {title: "Каталог", list: ["Женщинам", "Мужчинам", "Детям", "Скидки", "Акции"]},
        {title: "Аккаунт", list: ["Мужчинам", "Детям", "Акции"]},
        {title: "О компании", list: ["Женщинам", "Мужчинам", "Скидки", "Акции"]},
        {title: "Контакты", list: ["Женщинам", "Мужчинам", "Детям", "Скидки", "Акции"]},
    ]
}

export default Footer;