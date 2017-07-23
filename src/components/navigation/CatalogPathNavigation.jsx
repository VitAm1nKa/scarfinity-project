import React from 'react';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import IconAdd from 'material-ui/svg-icons/content/add';
import IconRemove from 'material-ui/svg-icons/content/remove';
import IconButton from 'material-ui/IconButton';
import Slider from 'material-ui/Slider';

import './CatalogPathNavigation.less';

let style = {
    icon: {
        width: 18,
        height: 18,
    },
    button: {
        width: 36,
        height: 36,
        padding: 8,
    },
    slider: {
        marginTop: 0,
        marginBottom: 0,
    }
}

class CatalogPathNavogation extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            currentValue: 1,
        }

        this.handleAddQuantity = this.handleAddQuantity.bind(this);
        this.handleRemoveQuantity = this.handleRemoveQuantity.bind(this);
	}

    handleAddQuantity() {
        let {currentValue} = this.state;

        this.setState({currentValue: currentValue + 1});
    }

    handleRemoveQuantity() {
        let {currentValue} = this.state;

        if(currentValue > 1) {
            this.setState({currentValue: currentValue - 1});
        }
    }

    getRenderState() {

        let {currentValue} = this.state;
        var isMinusButton = false;
        if(currentValue > 1) {
            isMinusButton = true;
        }

        return {
            isMinusButton: isMinusButton,
        }
    }

    render() {

        let {currentValue} = this.state;
        let {isMinusButton} = this.getRenderState();

        return (
            <Paper zDepth={1} >
                <div>
                    <div className="catalog-utility__steper">
                        <div className="catalog-utility__steper__container">
                            <IconButton  style={style.button} iconStyle={style.icon} onTouchTap={this.handleRemoveQuantity} disabled={!isMinusButton} >
                                <IconRemove />
                            </IconButton>
                            <span className="label">{currentValue}</span>
                            <IconButton  style={style.button} iconStyle={style.icon} onTouchTap={this.handleAddQuantity} >
                                <IconAdd />
                            </IconButton>
                        </div>
                    </div>
                    <div className="slider">
                        <div className="i1">
                            <Slider sliderStyle={style.slider} />
                        </div>
                        <div className="i2">
                            <Slider sliderStyle={style.slider} />
                        </div>
                    </div>
                    <h1>234</h1>
                </div>
            </Paper>
        );
    }
}

export default CatalogPathNavogation;