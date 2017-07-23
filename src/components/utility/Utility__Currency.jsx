import React from 'react';

import './utility__currency.less';

class Utility__Currency extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            value: 0,
            saleValue: -1,
            currencyGlyph: "₽",
            changing: false,
        }

        this.styleData = {
            size: "utility__currency--small",
            accent: "",
            unmutable: false,
            test: false,
        }

        let { value, saleValue, currencyType, size, accent, unmutable, test } = props;

        if(saleValue && typeof(saleValue) === 'number') {
            if(saleValue > 0) {
                this.state.saleValue = saleValue;
            }
        }

        if(value && typeof(value) === 'number') {
            if(value > 0) {
                this.state.value = value;
            } else {
                this.state.value = 0;
                this.state.saleValue = -1;
            }
        } else {
            this.state.saleValue = -1;
        }

        if(currencyType && typeof(currencyType) === 'string') {
            let curr = "₽";
            switch(currencyType) {
                case "rub": curr = "₽"; break;
                case "usd": curr = "$"; break;
                case "eur": curr = "€"; break;
            }
        }

        if(size && typeof(size) === 'string') {
            switch(size) {
                case "small": this.styleData.size = "utility__currency--small"; break;
                case "medium": this.styleData.size = "utility__currency--medium"; break;
                case "large": this.styleData.size = "utility__currency--large"; break;
                case "xlarge": this.styleData.size = "utility__currency--xlarge"; break;
                case "xxlarge": this.styleData.size = "utility__currency--xxlarge"; break;
                case "xxxlarge": this.styleData.size = "utility__currency--xxxlarge"; break;
            }
        }

        if(accent && typeof(accent) === 'boolean') {
            if(accent) {
                this.styleData.accent = "utility__currency--accent";
            }
        }

        if(unmutable && typeof(unmutable) === 'boolean') {
            this.styleData.unmutable = unmutable;
        }

        if(test) {
            this.styleData.test = test;
        }
    }

    componentWillReceiveProps(data) {
        this.changeValue(data);
        if(this.styleData.test) { console.log(data);}
    }

    changeValue({value}) {
        if(!this.styleData.unmutable) {
            if(value != null && typeof(value) === 'number') {
                if(value >= 0) {
                    let oldValue = this.state.value;
                    if(oldValue != value) {
                        let tickValue = (value - oldValue) / 30.0;
                        let iteration = 1;
                        let interval = setInterval(() => {
                            this.setState({ value: oldValue + Math.floor(iteration++ * tickValue) });
                            if(iteration > 30) {
                                clearInterval(interval);
                            }
                        }, 10);
                    }
                }
            }
        }
    }

    render() {

        const { value, saleValue, changing } = this.state;
        const { size, accent } = this.styleData;

        return (
            <div className={`utility__currency ${size} ${accent}`}>
                <div className="utility__currency__currency">₽</div>
                <div className={`utility__currency__value ${changing ? "utility__currency__value--changing": "" }`}>{value}</div>
                { saleValue !== -1 ? <div className="utility__currency__sale-value">{saleValue}</div> : "" }
            </div>
        );
    }
}

export default Utility__Currency;