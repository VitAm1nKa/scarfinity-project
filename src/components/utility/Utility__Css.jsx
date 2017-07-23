import React from 'react';

import './utility__css.less';

export const Wrapper = (props) => {
    return (
        <div className="grids__wrap">
            {props.children}
        </div>
    )
}