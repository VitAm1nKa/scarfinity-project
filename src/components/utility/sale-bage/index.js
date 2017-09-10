import React from 'react';

import './sale-bage.less';

import SaleCircle from '../svg/sale-circle';

var getSaleSize = (saleSize) => {
    switch(saleSize) {
        case 10: return { text: "-10%", sale: 10 }
        case 20: return { text: "-20%", sale: 20 }
        case 30: return { text: "-30%", sale: 30 }
        case 40: return { text: "-40%", sale: 40 }
        case 50: return { text: "-50%", sale: 50 }
        case 60: return { text: "-60%", sale: 60 }
        case 70: return { text: "-70%", sale: 70 }
        case 80: return { text: "-80%", sale: 80 }
        default: return { text: "-10%", sale: 10 }
    }
}

const SaleBage = (props) => {
    const saleStyle = getSaleSize(props.saleSize);
    return(
        <div 
            className="sale-bage"
            style={{
                width: props.size,
                height: props.size,
            }}>
            <div className="sale-bage__svg">
                <SaleCircle
                    width='100%'
                    height='100%'
                    sale={saleStyle.sale}/>
            </div>
            <span className="sale-bage__text">{saleStyle.text}</span>
        </div>
    )
}
SaleBage.defaultProps = {
    size: 50,
    saleSize: 30,
}

export default SaleBage;