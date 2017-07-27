import React from 'react';

import './filters-container.less';

const DevelopFiltersContainer = (props) => {
    return(
        <div className="develop-filters-container">
            {props.children}
        </div>
    )
}

export default DevelopFiltersContainer;