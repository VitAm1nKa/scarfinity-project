import React from 'react';

import './utility__image-container.less';

export default class Utility__ImageContainer extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            imageUrl: "img/scarf-3.jpg",
        }

        if(props.imageUrl) {
            this.state = props.imageUrl;
        }
	}

    render() {

        const {imageUrl} = this.state;

        return(
            <div className="image-container">
                <div className="image-container__container">
                    <img src={imageUrl} />
                </div>
            </div>
        );
    }

}
