import React from 'react';

import FilterContainerView  from '../filter-block';
import TagGrid              from '../../utility/tag-grid';

const FilterTagGrid = (props) => {
    return(
        <FilterContainerView
            title={props.title}
            buttonTitle={props.buttonTitle}
            buttonAction={props.buttonAction}>
                <TagGrid
                    tags={props.tags}
                    onClick={props.onTagClick}/>
        </FilterContainerView>
    )
}
FilterTagGrid.defaultProps = {
    title: "Популярные теги",
    buttonTitle: "все",
    buttonAction: () => {},
    tags: ["сумки", "платки", "красный", "новинка", "шарф-хомут", " просто тег"],
    onTagClick: () => {},
}

export default FilterTagGrid;