import React from 'react';

import {Wrapper} from '../utility/Utility__Css.jsx';

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

const BottomBlock = (props) => {
    return(
        <div>
            <div className="bottom-logo"></div>
            <div className="bottom-copyright">{props.copyrightTitle}</div>
        </div>
    )
}
BottomBlock.defaultProps = {
    copyrightTitle: "",
}

const Footer = (props) => {
    return(
        <footer>
            <Wrapper>
                <FooterGreed items={props.menuItems} />
            </Wrapper>
            <BottomBlock copyrightTitle={props.copyrightTitle} />
        </footer>
    )
}
Footer.defaultProps = {
    menuItems: [
        {title: "Каталог", list: ["Женщинам", "Мужчинам", "Детям", "Скидки", "Акции"]},
        {title: "Аккаунт", list: ["Мужчинам", "Детям", "Акции"]},
        {title: "О компании", list: ["Женщинам", "Мужчинам", "Скидки", "Акции"]},
        {title: "Контакты", list: ["Женщинам", "Мужчинам", "Детям", "Скидки", "Акции"]},
    ],
    copyrightTitle: "© 2017 Scarfinity. Все права защищены.",
}

export default Footer;