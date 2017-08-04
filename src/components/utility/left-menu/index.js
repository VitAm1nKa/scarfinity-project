import React from 'react';

import './left-menu.less';

import Paper                from 'material-ui/Paper';
import KeyboardArrowUp      from 'material-ui/svg-icons/hardware/keyboard-arrow-up';
import KeyboardArrowDown    from 'material-ui/svg-icons/hardware/keyboard-arrow-down';

export const LeftMenuExpandItem = (props) => {
    return(
        <div className="left-menu-test-container">
            <Paper zDepth={1} style={{overflow: 'hidden'}}>
                <div className="left-menu">
                    <div className="left-menu-item">
                        <span className="left-menu-item__title">Женщинам</span>
                        <KeyboardArrowDown />
                    </div>
                    <div className="left-menu-expand">
                        <span className="left-menu-expand-item">Шарфы</span>
                        <span className="left-menu-expand-item left-menu-expand-item--selected">Витаминка</span>
                        <span className="left-menu-expand-item">Косынко </span>
                        <span className="left-menu-expand-item">Палантин</span>
                    </div>
                    <div className="left-menu-item">
                        <span className="left-menu-item__title">Мужчинам</span>
                        <KeyboardArrowUp />
                    </div>
                    <div className="left-menu-item">
                        <span className="left-menu-item__title">Детям</span>
                        <KeyboardArrowUp />
                    </div>
                </div>
            </Paper>
        </div>
    )
}

const LeftMenuView = (props) => {
    return(
        <ul className="left-menu__container">
            <li className="left-menu__container__item">
                <div className="left-menu__top-level"><span className="title">Женщинам</span></div>
            </li>
            <li className="left-menu__container__expand">
                <ul className="left-menu__expand-menu">
                    <li className="left-menu__expand-menu__item">
                        <div className="left-menu__expand-menu__item__decoration simple-top"></div>
                    </li>
                    <li className="left-menu__expand-menu__item"><div className="left-menu__expand-menu__item__decoration"></div><span>Шарфы</span></li>
                    <li className="left-menu__expand-menu__item"><div className="left-menu__expand-menu__item__decoration"></div><span>Платки</span></li>
                    <li className="left-menu__expand-menu__item"><div className="left-menu__expand-menu__item__decoration"></div><span>Палантины</span></li>
                    <li className="left-menu__expand-menu__item active"><div className="left-menu__expand-menu__item__decoration"></div><span>Шапки</span></li>
                    <li className="left-menu__expand-menu__item"><div className="left-menu__expand-menu__item__decoration"></div><span>Снуды</span></li>
                    <li className="left-menu__expand-menu__item"><div className="left-menu__expand-menu__item__decoration"></div><span>Перчатки</span></li>
                    <li className="left-menu__expand-menu__item"><div className="left-menu__expand-menu__item__decoration simple-bottom"></div></li>
                </ul>
            </li>
            <li className="left-menu__container__item">
                <div className="left-menu__top-level"><span className="title">Hello!</span></div>
            </li>
            <li className="left-menu__container__item">
                <div className="left-menu__top-level"><span className="title">Hello!</span></div>
            </li>
            <li className="left-menu__container__item">
                <div className="left-menu__top-level"><span className="title">Hello!</span></div>
            </li>
        </ul>
    )
}