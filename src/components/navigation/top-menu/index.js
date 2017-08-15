import React from 'react';

import './top-menu.less';

import {Wrapper} from '../../utility/Utility__Css.jsx';
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
        <div className="top-menu">
            <Wrapper>
                <div className="top-menu__container">
                    <div className="top-menu__container__logo">
                        SCARFINITY
                    </div>
                    <div className="top-menu__container__sign">
                        <TopMenuSign />
                    </div>
                    <div className="top-menu__container__search">
                        <AutocompleteBox />
                    </div>
                </div>
            </Wrapper>
        </div>
    )
}

export default TopMenu;