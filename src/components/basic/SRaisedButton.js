import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import ChevronLeft from 'material-ui/svg-icons/navigation/chevron-left';
import ChevronRight from 'material-ui/svg-icons/navigation/chevron-right';
import ShoppingCart from 'material-ui/svg-icons/action/shopping-cart';

import './sRaised-button.less';

var buttonLabelColor  = "#ffffff";
var buttonFontSize    = '14px';

function renderStyle(backgroundColor) {
    return ({
        overlayStyle: {},
        labelColor: buttonLabelColor,
        backgroundColor: backgroundColor,
    });
}

function renderStyleSize(fontSize) {
    return ({
        buttonStyle: {
        },
        labelStyle: {
            // fontSize: fontSize,
        },
        overlayStyle: {
        }
    });
}

export const addReviewBack = {
    buttonStyle: {
        backgroundColor: "#f9f9f9"
    },
    labelStyle: {
        fontSize: buttonFontSize,
        color: '#808080',
    },
    overlayStyle: {},
    icon: <ChevronLeft style={{height: 25, marginLeft: 7, color: '#808080'}} />,
}

export const addToCart = {
    backgroundColor: "#e05543",
    labelColor: "#fefefe",
    icon: <ShoppingCart style={{height: 25, marginLeft: 7, color: '#fafafa'}} />,
}

export const green = renderStyle('#1bb869');
export const green_l = renderStyle('#37c17b');
export const green_d = renderStyle('#119f57');
export const orange = renderStyle('#ef8742');
export const orange_l = renderStyle('#f19659');
export const orange_d = renderStyle('#d76f31');
export const red = renderStyle('#e05543');
export const red_l = renderStyle('#e46a5a');
export const red_d = renderStyle('#c94230');
export const blue = renderStyle('#2799c9');
export const blue_l = renderStyle('#41a5d0');
export const blue_d = renderStyle('#1881ac');
export const lightgreen = renderStyle('#9cbf3e');
export const lightgreen_l = renderStyle('#a8c755');
export const lightgreen_d = renderStyle('#86a72e');
export const yellow = renderStyle('#f6b63a');
export const yellow_l = renderStyle('#f7bf52');
export const yellow_d = renderStyle('#dc9b2a');
export const magenta = renderStyle('#bf4f79');
export const magenta_l = renderStyle('#c76489');
export const magenta_d = renderStyle('#a54066');
export const purple = renderStyle('#8869ca');
export const purple_l = renderStyle('#967bd0');
export const purple_d = renderStyle('#7557b4');
export const normal = renderStyle('#3c5569');
export const normal_l = renderStyle('#4b6275');
export const normal_d = renderStyle('#31485b');

// button size
export const size_l = renderStyleSize(18);

// icon 

export const icon_back = <ChevronLeft style={{height: 25, marginLeft: 7}} />
export const icon_forward = <ChevronRight style={{height: 25, marginRight: 7}} />

export const icon_chevronLeft = ChevronLeft;
export const icon_chevronRight = ChevronRight;

