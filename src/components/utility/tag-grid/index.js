import React from 'react';

import './tag-grid.less';

var tagColors = [
    "#bf4f79",
    "#ef8742",
    "#9cbf3e",
    "#8869ca",
    "#2799c9",
    "#f6b63a",
    "#e05543",
    "#1bb869",
];

export const TagView = (props) => {
    return(
        <div
            className="tag"
            onClick={props.onClick}>
                <span 
                    className="tag__label"
                    style={{
                        background: props.color,
                    }}
                >{props.label}</span>
        </div>
    )
}
TagView.defaultProps = {
    label: "сумки",
    color: "#bf4f79",
    onClick: () => {},
}

export const TagGrid = (props) => {
    return(
        <div className="tag-grid">
            {
                props.tags &&
                props.tags.map((value, index) =>
                    <TagView
                        key={index}
                        label={value}
                        color={tagColors[index % tagColors.length]}
                        onClick={() => this.props.onClick(index)} />
                )
            }
        </div>
    )
}
TagGrid.defaultProps = {
    tags: null,
    onClick: () => {},
}

export default TagGrid;

