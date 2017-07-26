import React from 'react';

import './filter-block.less';

import Paper from 'material-ui/Paper';

export const DevelopFiltersContainer = (props) => {
    return(
        <div className="develop-filters-container">
            {props.children}
        </div>
    )
}

export const FilterContainerView = (props) => {
    return(
        <Paper style={{padding: 5, position: 'relative'}} zDepth={1}>
            <div className="filter-block">
                <div className="filter-block__header">
                    <span className="filter-block__header__title">{props.title}</span>
                    <div 
                        className="filter-block__header__reset-block"
                        onClick={props.buttonAction}
                    >{props.buttonTitle}</div>
                </div>
                <div className="filter-block__delim"></div>
                <div className="filter-block__content">
                    {props.children}
                </div>
            </div>
        </Paper>
    )
}
FilterContainerView.defaultProps = {
    title: "Имя фильра",
    buttonTitle: "bTitle",
    buttonAction: () => {},
}

// export default FilterContainerView;