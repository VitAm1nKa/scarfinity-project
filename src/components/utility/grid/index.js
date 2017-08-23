import React from 'react';

import './grid.less';

const withStyle = (base, style) => {
    if(base !== null && base !== 'undefined' && style !== null && style !== 'undefined') {
        return Object.assign({}, base, style);
    }

    return null;
}

const col_lg = (value) => value ? `lg--${value}` : '';
const col_md = (value) => value ? `md--${value}` : '';
const col_sm = (value) => value ? `sm--${value}` : '';
const col_xs = (value) => value ? `xs--${value}` : '';
const classN = (value) => value ? value : '';

export const Col = (props) => {
    let cols = "s-grid__container__column " + ` ${col_xs(props.xs)} ${col_sm(props.sm)} ${col_md(props.md)} ${col_lg(props.lg)}`.trim();
    let className = `${cols} ${classN(props.className)}`.trim();
    return(
        <div
            className={className}
            style={withStyle(props.style, {})}
            >{props.children}</div>
    )
}

export const Container = (props) => {
    return(
        <div
            className={`s-grid__container ${classN(props.className)}`.trim()}
            style={withStyle(props.style, {})}
            >{props.children}</div>
    )
}

export const Row = (props) => {
    console.log(props);
    return(
        <div
            className={`s-grid__row ${classN(props.className)}`.trim()}
            style={withStyle(props.style, {})}
            >{props.children}</div>
    )
}

export const Grid = (props) => {
    return(
        <div 
            className={`s-grid ${classN(props.className)}`.trim()}
            style={withStyle(props.style, {})}
            >{props.children}</div>
    )
}