import React from 'react';

import './rating-check-box.less';

import Star                 from 'material-ui/svg-icons/toggle/star';
import RadioButtonChecked   from 'material-ui/svg-icons/toggle/radio-button-checked';
import RadioButtonUnchecked from 'material-ui/svg-icons/toggle/radio-button-unchecked';
import IconButton           from 'material-ui/IconButton';

var colors = {
    starColor: "#f6b63a",
    textColor: "#303030",
    unckecked: "#aaaaaa",
}

var iconStyle = {
    width: 20,
    height: 20,
}

const RatingCheckBoxView = (props) => {
    return(
        <div className="rating-check-box">
            <Star
                style={{
                    width: 18,
                    height: 18,
                }}
                color={colors.starColor}/>
            <IconButton
                style={{
                    width: 34,
                    height: 34,
                    padding: '4px 0px',
                }}
                iconStyle={iconStyle}
                onClick={props.onClick}>
                {
                    props.cheched 
                        ? <RadioButtonChecked color={colors.starColor} />
                        : <RadioButtonUnchecked color={colors.unckecked} />
                }
            </IconButton>
            <span 
                className="rating-check-box__label" 
                style={{color: colors.textColor}}
            >{props.label}</span>
        </div>
    )
}
RatingCheckBoxView.defaultProps = {
    label: "5",
    cheched: false,
    onClick: () => {},
}

export class RatingCheckBox extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            checked: props.cheched,
            label: props.label,
        }

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState({checked: !this.state.checked});
    }

    render() {
        return(
            <RatingCheckBoxView
                label={this.state.label}
                cheched={this.state.checked}
                onClick={this.handleClick}/>
        )
    }
}
RatingCheckBox.defaultProps = {
    label: "5",
    cheched: false,
}

export class RatinCheckBoxWidget extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            items: ["5", "4+", "3+", "2+", "1+"],
            selectedIndex: props.selectedIndex,
        }

        this.handleClick = this.handleClick.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({selectedIndex: nextProps.selectedIndex});
    }

    handleClick(index) {
        this.setState({selectedIndex: index});
    }

    render() {
        return(
            <div className="rating-check-box-widget">
                {
                    this.state.items.map((value, index) =>
                        <RatingCheckBoxView
                            key={index}
                            label={value}
                            cheched={index == this.state.selectedIndex}
                            onClick={() => this.handleClick(index)}/>
                    )
                }
            </div>
        )
    }
}
RatinCheckBoxWidget.defaultProps = {
    selectedIndex: 0,
}

export default RatinCheckBoxWidget;