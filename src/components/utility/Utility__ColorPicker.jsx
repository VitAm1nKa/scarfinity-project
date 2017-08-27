import React from 'react';

import './utility-color-picker.less';
import Adjust from 'material-ui/svg-icons/image/adjust';
import Done from 'material-ui/svg-icons/action/done';
import RadioButtonChecked from 'material-ui/svg-icons/toggle/radio-button-checked';
import RadioButtonUnchecked from 'material-ui/svg-icons/toggle/radio-button-unchecked';

const ColorPickerIcon = (props) => {
    return(
        <svg
            style={{
                transition: 'all 0.3s ease',
            }}
            xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 300 300">
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

// const colorStyle = function(colorId, size = 32) {
    
//     const prepareStyle = (size, backColor, fontColor) => {
//         return {
//             main: {
//                 width: size,
//                 height: size,
//             },
//             popup: {
//                 color: fontColor,
//                 backgroundColor: backColor,
//             },
//             icon: {
//                 backgroundColor: backColor,
//                 width: size,
//                 height: size,
//                 child: {
//                     color: fontColor,
//                     width: size,
//                     height: size,
//                 }
//             }
//         }
//     }
    
//     switch (colorId) {
//         case 0: return prepareStyle(size, "#86AF49", "#fefefe");
//         case 1: return prepareStyle(size, "#90a7d0", "#fefefe");
//         case 2: return prepareStyle(size, "#ef5c6e", "#fefefe");
//         default: return prepareStyle(size, "#fefefe", "#aaa");
//     }
// }

const colorStyle = function(colorId) {
    switch (colorId) {
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

export class ColorPickerItem extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            selected: false,
            unselectable: false,
        }

        this.colorId = 0;
        this.size = 28;
        this.onSelectChange = () => {return true};

        if(props.selected != null) {
            this.state.selected = props.selected;
        }

        if(props.onSelectChange) {
            this.onSelectChange = props.onSelectChange;
        }

        if(props.colorId) {
            this.colorId = props.colorId;
        }

        if(props.size) {
            this.size = props.size;
        }

        if(props.unselectable != null) {
            this.state.unselectable = props.unselectable;
        }

        this.style = colorStyle(this.colorId);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        const {selected, unselectable} = this.state;
        if(!unselectable) {
            if(this.onSelectChange(!selected)) {
                this.setState({selected: !selected});
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.selected != null) {
            this.setState({selected: nextProps.selected});
        }
    }

    render() {
        const {selected, unselectable} = this.state;
        const className = `color-picker-item ${selected ? "color-picker-item--selected" : ""} ${unselectable ? "color-picker-item--unselectable" : ""}`;

        return (
            <div 
                className={className}>
                <div 
                    className="color-picker-item__container"
                    onClick={this.handleClick}>
                    {/* <span className="color-picker-item__popup" style={this.style.popup}>красный</span> */}
                    <ColorPickerIcon
                        inside={this.style.inside}
                        outside={this.style.outside}
                        icon={selected ? this.style.icon : this.style.inside}/>
                </div>
            </div>
        );
    }
}

export class ColorPicker extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            multiSelect: props.multiselect,
            items: this.getItems(props.colors),
            selectedIndex: this.getIndices(props.selectedIndex),
            unselectable: props.unselectable,
            itemSize: props.itemSize,
            itemGap: props.itemGap,
            long: props.long,
        }

        this.style = {
            main: {
                margin: `0px ${-this.state.itemGap}px`,
            }
        }

        this.handleSelectChange = this.handleSelectChange.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({selectedIndex: this.getIndices(nextProps.selectedIndex)});
    }

    getIndices(indices) {
        if(indices) {
            return indices.split(",").map(value => parseInt(value));
        }

        return [];
    }

    getItems(colors) {
        if(colors) {
            return colors.split(",").map(value => ({colorId: parseInt(value)}));
        }

        return [];
    }

    changeSelectedIndex(index, selected, multiSelect) {
        let {selectedIndex} = this.state;

        if(!multiSelect) return [index];

        if(!selected) selectedIndex.splice(selectedIndex.indexOf(index), 1);
        else selectedIndex = [...selectedIndex, index];

        return selectedIndex;
    }

    handleSelectChange(index, selected) {
        let {selectedIndex, multiSelect} = this.state;

        if(!multiSelect && selectedIndex.indexOf(index) >= 0) return false;
        this.setState({selectedIndex: this.changeSelectedIndex(index, selected, multiSelect)}, () => {
            console.log(this.state.selectedIndex);
        });

        return true;
    }

    render() {
        const {items, selectedIndex, unselectable} = this.state;

        return(
            <div className={`color-picker ${this.state.long ? "color-picker--long" : ""}`} style={this.style.main}>
                {
                    items.map((item, index) => 
                        <ColorPickerItem 
                            key={index} 
                            selected={selectedIndex.indexOf(index) != -1 && !unselectable ? true : false} 
                            colorId={item.colorId} 
                            size={this.state.itemSize}
                            unselectable={unselectable}
                            onSelectChange={(selected) => {return this.handleSelectChange(index, selected)}} />
                    )
                }
            </div>
        )
    }
}
ColorPicker.defaultProps = {
    multiselect: false,
    unselectable: false,
    itemSize: 24,
    itemGap: 5,
    selectedIndex: "",
    colors: "",
    long: false,
}