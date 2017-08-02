import React from 'react';

import './content-grid.less';

import {Wrapper} from '../../utility/Utility__Css.jsx';

const FiltersGridView = (props) => {
    return(
        <div className="content-grid__filters-grid">
            1
        </div>
    )
}

const ContentGrid = (props) => {
    return(
        <div className="content-grid">
            <Wrapper>
                <div className="content-grid__container">
                    <div className="content-grid__container__left-section">
                        {props.leftSection}
                    </div>
                    <div className="content-grid__container__delim"></div>
                    <div className="content-grid__container__middle-section">
                        {props.middleSection}
                    </div>
                    <div className="content-grid__container__delim"></div>
                    <div className="content-grid__container__additional-section">
                        {props.additionalSection}
                    </div>
                </div>
            </Wrapper>
        </div>
    )
}
ContentGrid.defaultProps = {
    leftSection: null,
    middleSection: null,
    additionalSection: null,
}

export default ContentGrid;