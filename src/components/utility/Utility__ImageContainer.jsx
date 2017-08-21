import React from 'react';

import './utility__image-container.less';

const Utility__ImageContainer = (props) => {
    return(
        <div className="image-container">
            <div className="image-container__container">
                <img src={props.imageUrl} />
            </div>
        </div>
    );
}
Utility__ImageContainer.defaultProps = {
    imageUrl: "img/scarf-3.jpg",
}

export default Utility__ImageContainer;
