import React from 'react';
import IconButton from 'material-ui/IconButton';
import CheckCircle from 'material-ui/svg-icons/action/check-circle';

import './ColorSelect.less';

class ColorSelect extends React.Component {

    constructor(props, context) {
        super(props, context);
	}

    render() {
        return (
            <div className="color__color-container">
                <div className="color__color-select s26 p-15-0343 rnd-white"></div>
                <div className="color__color-select s26 p-15-3919 rnd-white"></div>
                <div className="color__color-select s26 p-17-1744 rnd-white"></div>
                <div className="color__color-select s26 p-15-0343 rnd-white"></div>
            </div>
        );
    }
}

export default ColorSelect;

