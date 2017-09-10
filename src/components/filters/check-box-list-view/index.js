import React from 'react';

import CheckBoxList         from '../../utility/check-box';
import FilterContainerView  from '../filter-block';

const FilterSeasonSelectView = (props) => {
    return(
        <FilterContainerView
            title={props.title}
            buttonTitle={props.buttonTitle}
            buttonAction={props.buttonAction}>
                <CheckBoxList />
        </FilterContainerView>
    )
}
FilterSeasonSelectView.defaultProps = {
    title: "Сезон",
    buttonTitle: "сброс",
    buttonAction: () => {},
}

export default FilterSeasonSelectView;