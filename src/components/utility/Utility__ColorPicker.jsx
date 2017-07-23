import React from 'react';

import './utility-color-picker.less';
import Adjust from 'material-ui/svg-icons/image/adjust';
import Done from 'material-ui/svg-icons/action/done';
import RadioButtonChecked from 'material-ui/svg-icons/toggle/radio-button-checked';
import RadioButtonUnchecked from 'material-ui/svg-icons/toggle/radio-button-unchecked';

const colorStyle = function(colorId, size = 32) {
    
    const prepareStyle = (size, backColor, fontColor) => {
        return {
            main: {
                width: size,
                height: size,
            },
            popup: {
                color: fontColor,
                backgroundColor: backColor,
            },
            icon: {
                backgroundColor: backColor,
                width: size,
                height: size,
                child: {
                    color: fontColor,
                    width: size,
                    height: size,
                }
            }
        }
    }
    
    switch (colorId) {
        case 0: return prepareStyle(size, "#86AF49", "#fefefe");
        case 1: return prepareStyle(size, "#90a7d0", "#fefefe");
        case 2: return prepareStyle(size, "#ef5c6e", "#fefefe");
        default: return prepareStyle(size, "#fefefe", "#aaa");
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

        this.style = colorStyle(this.colorId, this.size);

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
                className={className} 
                style={this.style.main}>
                <div className="color-picker-item__container">
                    <span className="color-picker-item__popup" style={this.style.popup}>красный</span>
                    <div 
                        className="color-picker-item__icon" 
                        onClick={this.handleClick}
                        style={this.style.icon}>
                            {
                                selected ?
                                    <Adjust style={this.style.icon.child}/> :
                                    <RadioButtonUnchecked style={this.style.icon.child}/>
                            }
                        </div>
                </div>
            </div>
        );
    }
}

export class ColorPicker extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            multiSelect: false,
            items: [
                { colorId: 1 },
                { colorId: 2 },
                { colorId: 3 },
                { colorId: 4 },
                { colorId: 0 },
                { colorId: 6 },
            ],
            selectedIndex: [0],
            unselectable: false,
        }

        this.itemSize = 24;
        this.itemGap = 5;

        if(props.itemSize != null) {
            this.itemSize = props.itemSize;
        }

        if(props.itemGap != null) {
            this.itemGap = props.itemGap;
        }

        if(props.multiselect != null) {
            this.state.multiSelect = props.multiselect;
        }

        if(props.unselectable != null) {
            this.state.unselectable = props.unselectable;
        }

        this.style = {
            main: {
                margin: `0px ${-this.itemGap}px`,
            }
        }

        this.handleSelectChange = this.handleSelectChange.bind(this);
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
            <div className="color-picker" style={this.style.main}>
                {
                    items.map((item, index) => 
                        <ColorPickerItem 
                            key={index} 
                            selected={selectedIndex.indexOf(index) != -1 && !unselectable ? true : false} 
                            colorId={item.colorId} 
                            size={this.itemSize}
                            unselectable={unselectable}
                            onSelectChange={(selected) => {return this.handleSelectChange(index, selected)}} />
                    )
                }
            </div>
        )
    }
}