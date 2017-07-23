import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

import ActionFlightTakeoff from 'material-ui/svg-icons/action/flight-takeoff';
import ActionAndroid from 'material-ui/svg-icons/action/android';

import './basic-components-page.less';

import {green, green_l, icon_back, icon_forward, addReviewBack} from './SRaisedButton.js';


class BasicComponentsPage extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return(
            <div className="basic-components-page">
                <div><RaisedButton label="Купить" {...green} /></div>
                <div>
                </div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <RaisedButton label="Buy this" {...green} icon={icon_back} />
                <RaisedButton label="Buy this" {...green} icon={icon_forward} labelPosition="before" />
                <RaisedButton label="Назад к отзывам" {...addReviewBack} />
            </div>
        );
    }
}

export default BasicComponentsPage;