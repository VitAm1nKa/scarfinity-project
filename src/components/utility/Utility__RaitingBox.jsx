import React from 'react';

import './utility__rating-box.less';

import IconButton from 'material-ui/IconButton';
import Star from 'material-ui/svg-icons/toggle/star';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import StarHalf from 'material-ui/svg-icons/toggle/star-half';

class Utility__RaitingBox extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            currentValue: [1, 1, 0.5, 0, 0],
            changeable: false,
        }

        const {currentValue, changeable} = props;

        this.state.currentValue = this.prepareArray(currentValue);
        this.tmpValue = this.state.currentValue;

        this.style = {
            icon: {
                color: "#f6b63a",
                fill: "#f6b63a",
                width: 24,
                height: 24,
            }
        }

        if(changeable != null && typeof(changeable) === 'boolean') {
            this.state.changeable = changeable;
        }

        if(props.iconSize) {
            this.style.icon.width = props.iconSize;
            this.style.icon.height = props.iconSize;
        }

        this.handleHover = this.handleHover.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
    }

    componentWillReceiveProps(props) {
        const {currentValue} = props;
        console.log(props);

        this.setState({
            currentValue: this.prepareArray(currentValue),
        });
    }

    prepareArray(currentValue) {
        if(currentValue !== null && typeof(currentValue) === 'number' && currentValue >= 0  && currentValue <= 5) {
            let tmp = [];
            for(let i = 1; i <= 5; i++) {
                tmp = [...tmp, (i <= currentValue) ? 1 : 1 - i + currentValue ];
            }

            return tmp;
        }

        return [0, 0, 0, 0, 0];
    }

    handleHover(index) {
        this.setState({currentValue: this.prepareArray(index + 1)});
    }

    handleClick(index) {
        this.tmpValue = this.state.currentValue;
    }

    handleMouseLeave() {
        this.setState({currentValue: this.tmpValue});
    }

    actionObject(index) {
        if(this.state.changeable) {
            return {
                key: index,
                style: this.style.icon,
                onMouseEnter: () => this.handleHover(index),
                onClick: () => this.handleClick(index),
            }
        }

        return {
            key: index,
            style: this.style.icon
        }
    }

    render() {

        const { currentValue, changeable } = this.state;

        return(
            <div className={`utility__rating-box ${changeable ? "utility__rating-box--changeable" : ""}`} onMouseLeave={this.handleMouseLeave}>
                {
                    currentValue.map((value, index) => {
                        switch(value) {
                            case 1: return <Star {...this.actionObject(index)} />
                            case 0.5: return <StarHalf {...this.actionObject(index)} />
                            default: return <StarBorder {...this.actionObject(index)} />
                        }
                    })
                }
            </div>
        );
    }
}

export default Utility__RaitingBox;