import React from 'react';

import './tree-navigation.less';

import Paper from 'material-ui/Paper';

const ChevronLeft = (props) => {
    return(
        <svg 
            viewBox="0 0 100 340"
            {...props.style}
            style={{
                display: 'inline-block',
                userSelect: 'none',
                fill: props.color,
                fillRule: 'evenodd',
                width: props.width,
                height: props.width * 3.4,
            }}>
            <path d="M100,170L10,0H0L90,170,0,340H10Z"/>
        </svg>
    )
}
ChevronLeft.defaultProps = {
    color: '#d7d7d7',
    width: 50,
}

const TreeNavigationItem = (props) => {
    return(
        <div className="tree-navigation-item">
            <span className="tree-navigation-item__title">{props.title}</span>
            {
                !props.last &&
                <ChevronLeft width={10}/>
            }
        </div>
    )
}
TreeNavigationItem.defaultProps = {
    title: "Scarfinity",
    last: false,
}

const TreeNavigation = (props) => {
    return(
        <Paper style={{overflow: 'hidden'}} zDepth={1}>
            <div className="tree-navigation">
                {
                    props.items &&
                    props.items.map((item, index) =>
                        <TreeNavigationItem
                            key={index}
                            title={item}
                            last={index == props.items.length - 1}/>
                    )
                }
            </div>
        </Paper >
    )
}
TreeNavigation.defaultProps = {
    items: ["Scarfinity", "Женщинам", "Шарфы"],
}

export default TreeNavigation;