import React from 'react';

import './price-range-widget.less';

import Utility__Currency from './Utility__Currency.jsx';
import ArrowForward from 'material-ui/svg-icons/Navigation/arrow-forward';
import ArrowBack from 'material-ui/svg-icons/Navigation/arrow-back';
import SwapHoriz from 'material-ui/svg-icons/action/swap-horiz';

// Slider components
const PriceRangeSliderPill = (props) => {
    return(
        <div 
            style={{
                position: 'absolute',
                pointerEvents: 'none',
                top: (props.parentHeight - props.height) / 2,
                bottom: (props.parentHeight - props.height) / 2,
                left: props.parentHeight / 2,
                right: props.parentHeight / 2,
                border: '1px solid #ccc',
                background: `linear-gradient(90deg, transparent ${props.leftValue}%, ${props.color} ${props.leftValue}%, ${props.color} ${props.rightValue}%, transparent ${props.rightValue}%)`,
                borderRadius: props.height / 2,
            }}
        ></div>
    )
}
PriceRangeSliderPill.defaultProps = {
    height: 10,
    parentHeight: 0,
    leftValue: 0,
    rightValue: 90,
    color: '#d76f31',
}

const PriceRangeSliderRound = (props) => {
    return(
        <div 
            style={{
                position: 'absolute',
                pointerEvents: 'none',
                width: props.parentHeight,
                height: props.parentHeight,
                top: 0,
                left: `calc(${props.valuePosition}% - ${props.parentHeight * props.valuePosition / 100}px)`,
                borderRadius: 50,
                background: '#fefefe',
                boxShadow: `rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.20) 0px 1px 2px`,
            }}>
                <div style={{
                    position: 'absolute',
                    pointerEvents: 'none',
                    width: props.parentHeight / 3,
                    height: props.parentHeight / 3,
                    top: props.parentHeight / 3,
                    left: props.parentHeight / 3,
                    borderRadius: 50,
                    background: '#d76f31',
                    boxShadow: `inset rgba(0, 0, 0, 0.24) 0px 1px 2px`,
                }}></div>
            </div>
    )
}
PriceRangeSliderRound.defaultProps = {
    parentHeight: 0,
    valuePosition: 100,
}

const PriceRangeSlider = (props) => {
    return(
        <div 
            style={{
                position: 'relative',
                height: props.height,
                cursor: 'pointer',
                userFocus: 'none',
            }}
            onMouseDown={props.onMouseDown}
            onTouchStart={props.onTouchStart}
            ref={props.sliderRef}
        >{props.children}</div>
    )
}
PriceRangeSlider.defaultProps = {
    height: 40,
    sliderRef: null,
    onMouseDown: () => {},
    onTouchStart: () => {},
}

class PriceRangeSliderController extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            values: props.values,
            mouseDown: false,
            height: props.height,
        }

        this.clientX = 0;
        this.sliderOffsetPosirion = 0;

        this.onValueChange = props.onValueChange;

        // mouse
        this.handleSliderMouseDown = this.handleSliderMouseDown.bind(this);
        this.handleSliderMouseUp = this.handleSliderMouseUp.bind(this);
        this.handleSliderMouseMove = this.handleSliderMouseMove.bind(this);

        // touch
        this.handleSliderTouchStart = this.handleSliderTouchStart.bind(this);
        this.handleSliderTouchMove = this.handleSliderTouchMove.bind(this);
        this.handleSliderTouchEnd = this.handleSliderTouchEnd.bind(this);
        this.handleSliderTouchCancel = this.handleSliderTouchCancel.bind(this);
    }

    // utility, sort state values
    sort(a, b) {
        const keyA = a.diff;
        const keyB = b.diff;

        if(keyA < keyB) return -1;
        if(keyA > keyB) return 1;
        return 0;
    }

    getValue() {
        let {width} = this.sliderRef.getBoundingClientRect();
        let {values} = this.state;

        let offsetX = this.clientX - this.sliderOffsetPosirion;

        const sliderOffset = this.state.height / 2;
        const sliderWorkWidth = width - this.state.height;
        const percent = Math.round((Math.max(Math.min(offsetX, width - sliderOffset), sliderOffset) - sliderOffset) / sliderWorkWidth * 100);

        let index = values.indexOf(
            values.map(value => ({value: value, diff: Math.abs(percent - value)}))
                  .sort(this.sort)[0].value);
        values[index] = percent;
        
        return values;
    }

    setStateAction(stateData) {
        this.setState(stateData, this.onValueChange(this.state.values));
    }

    // global mouse heandler
    componentWillMount() {
        window.addEventListener("mousemove", this.handleSliderMouseMove);
        window.addEventListener("mouseup", this.handleSliderMouseUp);
        window.addEventListener("pointercancel", this.handleSliderMouseUp);
        window.addEventListener("pointerup", this.handleSliderMouseUp);

        // touches
        window.addEventListener("touchmove", this.handleSliderTouchMove);
        window.addEventListener("touchend", this.handleSliderTouchEnd);
        window.addEventListener("touchcancel", this.handleSliderTouchCancel);
    }

    componentWillUnmount() {
        window.removeEventListener("mousemove", this.handleSliderMouseMove);
        window.removeEventListener("mouseup", this.handleSliderMouseUp);
        window.removeEventListener("pointercancel", this.handleSliderMouseUp);
        window.removeEventListener("pointerup", this.handleSliderMouseUp);

        // touches
        window.removeEventListener("touchmove", this.handleSliderTouchMove);
        window.removeEventListener("touchend", this.handleSliderTouchEnd);
        window.removeEventListener("touchcancel", this.handleSliderTouchCancel);
    }

    // mouse handlers
    handleSliderMouseDown(event) {
        this.clientX = event.nativeEvent.clientX;
        this.sliderOffsetPosirion = this.clientX - event.nativeEvent.offsetX;

        this.setStateAction({values: this.getValue(), mouseDown: true});
    }

    handleSliderMouseMove(event) {
        if(this.state.mouseDown) {
            this.clientX = event.clientX;
            this.setStateAction({values: this.getValue()});
        }
    }

    handleSliderMouseUp(event) {
        if(this.state.mouseDown)
            this.setStateAction({values: this.getValue(event), mouseDown: false});
        
    }

    // touch handlers
    handleSliderTouchStart(event) {
        this.clientX = event.touches[0].clientX;
        this.sliderOffsetPosirion = event.target.getBoundingClientRect().left
        this.setStateAction({values: this.getValue(), mouseDown: true});
    }

    handleSliderTouchMove(event) {
        if(this.state.mouseDown) {
            this.clientX = event.touches[0].clientX;
            this.setStateAction({values: this.getValue()});
        }
    }

    handleSliderTouchEnd() {
        if(this.state.mouseDown)
            this.setStateAction({values: this.getValue(), mouseDown: false});
    }

    handleSliderTouchCancel() {
        if(this.state.mouseDown)
            this.setStateAction({values: this.getValue(event), mouseDown: false});
    }
    
    render() {
        return(
            <PriceRangeSlider
                height={this.state.height}
                sliderRef={slider => this.sliderRef = slider}
                onMouseDown={this.handleSliderMouseDown}
                onTouchStart={this.handleSliderTouchStart}>
                <PriceRangeSliderPill 
                    leftValue={this.state.values[0]} 
                    rightValue={this.state.values[1]}
                    parentHeight={this.state.height}/>
                    {
                        this.state.values.map((value, index) =>
                            <PriceRangeSliderRound key={index} valuePosition={value} parentHeight={this.state.height}/>
                        )
                    }
            </PriceRangeSlider>
        )
    }
}
PriceRangeSliderController.defaultProps = {
    values: [10, 90],
    height: 24,
    onValueChange: () => {},
}

// PriceRange input
const PriceRangeInput = (props) => {
    return(
        <div className="price-range-input">
            <Utility__Currency value={props.value} noanimation/>
        </div>
    )
}
PriceRangeInput.defaultProps = {
    value: 700,
}

const PriceRangeWidgetView = (props) => {
    return(
        <div style={{background: "#fefefe"}}>
            <div className="price-range-widget">
                <div className="price-range-widget__slider">
                    <PriceRangeSliderController onValueChange={props.onValueChange} values={props.values} />
                </div>
                <div className="price-range-widget__body" style={{paddingLeft: 12, paddingRight: 12}}>
                    <PriceRangeInput value={props.inputValues[0]} />
                    <SwapHoriz color="#ccc" />
                    <PriceRangeInput value={props.inputValues[1]} />
                </div>
            </div>
        </div>
    )
}
PriceRangeWidgetView.defaultProps = {
    values: [10, 90],
    onValueChange: () => {},
    inputValues: [0, 0],
}

// Export classes
class PriceRangeWidget extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            values: [0, 100],
            minValue: 500,
            maxValue: 10000,
        }

        this.handleValueChange = this.handleValueChange.bind(this);
    }

    handleValueChange(values) {
        this.setState({values});
    }

    getValues(values) {
        const {minValue, maxValue} = this.state;
        const valuePerPoint = (maxValue - minValue) / 100
        return (values.map(value => value * valuePerPoint + minValue));
    }

    render() {
        return(
            <PriceRangeWidgetView
                values={this.state.values}
                inputValues={this.getValues(this.state.values)}
                onValueChange={this.handleValueChange} />
        )
    }
}

export default PriceRangeWidget;