import React from 'react';

import './recenly-viewed.less';

import Utility__ImageContainer  from '../../utility/Utility__ImageContainer.jsx';
import FilterContainerView      from '../filter-block';

const RecenlyViewedBlock = (props) => {
    return(
        <div className="filter-recenly-viewed">
            {
                props.items &&
                props.items.map((item, index) =>
                    <div 
                        className="filter-recenly-viewed__item"
                        key={index}>
                            <Utility__ImageContainer/>
                    </div>
                )
            }
        </div>
    )
}
RecenlyViewedBlock.defaultProps = {
    items: ["", "", "", "", "" ,""],
}

const RecenlyViewed = (props) => {
    return(
        <FilterContainerView
            title={props.title}
            buttonTitle={props.buttonTitle}
            buttonAction={props.buttonAction}>
                <RecenlyViewedBlock />
        </FilterContainerView>
    )
}
RecenlyViewed.defaultProps = {
    title: "Вы просматривали",
    buttonTitle: "все",
    buttonAction: () => {},
}

export default RecenlyViewed;