import React from 'react';

import './color-picker.less';

const ColorPickerIcon = (props) => {
    return(
        <svg
            style={{
                transition: 'all 0.3s ease',
            }}
            xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 300 300">
            <circle
                style={{
                    fill: props.outside,
                }}
                cx="150" cy="150" r="140"/>
            <circle
                style={{
                    fill: props.inside,
                }}
                cx="150" cy="150" r="126"/>
            <path
                style={{
                    fill: props.icon,
                    transition: 'fill 0.2s ease',
                }}
                d="M206.243,132.531l-57.184,56.931-6.075,6.037a8.618,8.618,0,0,1-12.148,0l-6.075-6.037L94.389,159.209a8.538,8.538,0,0,1,0-12.1l6.075-6.037a8.62,8.62,0,0,1,12.149,0l24.3,24.193,51.111-50.885a8.591,8.591,0,0,1,12.148,0l6.075,6.041A8.549,8.549,0,0,1,206.243,132.531Z"/>
        </svg>
    )
}
ColorPickerIcon.defaultProps = {
    outside: "red",
    inside: "blue",
    icon: "green",
}

const colorStyle = function(colorId) {
    switch (Number(colorId)) {
        case 0: return {outside: "#1bb869", inside: "#1bb869", icon: "#ffffff"};
        case 1: return {outside: "#9cbf3e", inside: "#9cbf3e", icon: "#ffffff"};
        case 2: return {outside: "#f6b63a", inside: "#f6b63a", icon: "#ffffff"};
        case 3: return {outside: "#ef8742", inside: "#ef8742", icon: "#ffffff"};
        case 4: return {outside: "#e05543", inside: "#e05543", icon: "#ffffff"};
        case 5: return {outside: "#bf4f79", inside: "#bf4f79", icon: "#ffffff"};
        case 6: return {outside: "#8869ca", inside: "#8869ca", icon: "#ffffff"};
        case 7: return {outside: "#2799c9", inside: "#2799c9", icon: "#ffffff"};
        case 8: return {outside: "#303030", inside: "#303030", icon: "#ffffff"};
        default: return {outside: "#aaaaaa", inside: "#ffffff", icon: "#aaaaaa"};
    }
}

const colorStyleNewFormat = (colorCode) => {
    const hue = colorCode.substring(0, 1);
    const bright = colorCode.substring(1, 2);

    switch(hue) {
        case '0': return {outside: "#e05543", inside: "#e05543", icon: "#ffffff"};
        case '1': return {outside: "#ef8742", inside: "#ef8742", icon: "#ffffff"};
        case '2': return {outside: "#f6b63a", inside: "#f6b63a", icon: "#ffffff"};
        case '3': return {outside: "#9cbf3e", inside: "#9cbf3e", icon: "#ffffff"};
        case '5': return {outside: "#1bb869", inside: "#1bb869", icon: "#ffffff"};
        case '7': return {outside: "#2799c9", inside: "#2799c9", icon: "#ffffff"};
        case '9': return {outside: "#8869ca", inside: "#8869ca", icon: "#ffffff"};
        case 'a': return {outside: "#bf4f79", inside: "#bf4f79", icon: "#ffffff"};
        case 'f': {
            if(bright < 5) return {outside: "#303030", inside: "#303030", icon: "#ffffff"};
            if(bright >= 5) return {outside: "#aaaaaa", inside: "#ffffff", icon: "#aaaaaa"};
        }
        default: return {outside: "#aaaaaa", inside: "#ffffff", icon: "#aaaaaa"};
    }
}

const ColorPickerItem = (props) => {
    const style = colorStyleNewFormat(props.colorId);
    return (
        <span onClick={props.onClick}>
            <ColorPickerIcon
                inside={style.inside}
                outside={style.outside}
                icon={props.selected ? style.icon : style.inside} />
        </span>
    )
}

class ColorPicker extends React.Component {
    constructor(props) {
        super(props);

        this.state = Object.assign({}, props, {
            selectedIndices: [],
        });
    }

    handleClick(colorId, selected) {
        if(!this.state.unselectable) {
            if(this.state.multiselect) {
                if(selected) {
                    const index = this.state.selectedIndices.indexOf(colorId);
                    this.state.selectedIndices = this.state.selectedIndices.filter(x => x != colorId);
                } else {
                    this.state.selectedIndices = [...this.state.selectedIndices, colorId];
                }
            } else {
                if(!selected) {
                    this.state.selectedIndices = [...[], colorId];
                }
            }

            this.forceUpdate(() => {
                if(this.state.onSelectedChange != null)
                    this.state.onSelectedChange(this.state.selectedIndices);
            })
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState(nextProps);
    }

    render() {
        return(
            <div className="color-picker1">
                {
                    this.state.colors &&
                    this.state.colors.map((item, index) => {
                        const selected = this.state.selectedIndices.includes(item);
                        return(
                            <div
                                key={index}
                                className="color-picker1__item">
                                    <ColorPickerItem
                                        selected={selected}
                                        colorId={item}
                                        unselectable={this.state.unselectable} 
                                        onClick={() => {this.handleClick(item, selected)}} />
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}
ColorPicker.defaultProps = {
    multiselect: false,
    unselectable: false,
    colors: null,
    long: false,
}

export const ColorPickerAdvance = (props) => {
    return(
        <div className="color-picker1">
            {
                props.colors &&
                props.colors.map((item, index) =>
                    <div
                        key={index}
                        className="color-picker1__item">
                            <ColorPickerItem
                                selected={item == props.selectedColor}
                                colorId={item}
                                onClick={() => {if(item != props.selectedColor) props.onClick(item)}} />
                    </div>
                )
            }
        </div>
    )
}

export default ColorPicker;