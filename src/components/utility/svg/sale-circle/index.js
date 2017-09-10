import React from 'react';

var styles = {
    ten: {
        base: "#1bb869",
        border: "#4cc98a",
        shadow: 'rgba(0, 0, 0, 0.15)',
    },
    twenty: {
        base: "#9cbf3e",
        border: "#b3d066",
        shadow: 'rgba(0, 0, 0, 0.15)',
    },
    thirty: {
        base: "#f6b63a",
        border: "#f7c564",
        shadow: 'rgba(0, 0, 0, 0.15)',
    },
    forty: {
        base: "#ef8742",
        border: "#f49b60",
        shadow: 'rgba(0, 0, 0, 0.15)',
    },
    fifty: {
        base: "#e05543",
        border: "#e76f5f",
        shadow: 'rgba(0, 0, 0, 0.15)',
    },
    sixty: {
        base: "#bf4f79",
        border: "#c86188",
        shadow: 'rgba(0, 0, 0, 0.15)',
    },
    seventy: {
        base: "#8869ca",
        border: "#9a7ed4",
        shadow: 'rgba(0, 0, 0, 0.15)',
    },
    eighty: {
        base: "#2799c9",
        border: "#46abd6",
        shadow: 'rgba(0, 0, 0, 0.15)',
    },
}

var SaleCircle = (props) => {
    let style = styles.ten;
    switch(props.sale) {
        case 10: style = styles.ten; break;
        case 20: style = styles.twenty; break;
        case 30: style = styles.thirty; break;
        case 40: style = styles.forty; break;
        case 50: style = styles.fifty; break;
        case 60: style = styles.sixty; break;
        case 70: style = styles.seventy; break;
        case 80: style = styles.eighty; break;
    }
    return(
        <svg 
            xmlns="http://www.w3.org/2000/svg"
            width={props.width}
            height={props.height}
            {...props.style}
            viewBox="0 0 280 280">
                <path
                    style={{
                        fillRule: 'evenodd',
                        fill: style.base
                    }}
                    d="M140,10C58.457,10,10,75,10,140S60,270,140,270c75.16,0,129-60.16,129-130a134.307,134.307,0,0,0-1-15c-5.225-5.694-113-113-113-113S144.468,10,140,10Z"/>
                <path
                    style={{
                        fillRule: 'evenodd',
                        fill: style.shadow
                    }}
                    d="M156,13L267,125s-52,10-87-25C144.5,64.5,156,13,156,13Z"/>
                <path
                    style={{
                        fillRule: 'evenodd',
                        fill: style.border
                    }}
                    d="M156,13L268,125s-47,4-82-31C150.5,58.5,156,13,156,13Z"/>
        </svg>
    )
}
SaleCircle.defaultProps = {
    width: 50,
    height: 50,
    sale: 10,
    style: {},
}

export default SaleCircle;