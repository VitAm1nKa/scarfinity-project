import React from 'react';

import './price-ticket.less';

import Utility__Currency from '../Utility__Currency.jsx';

export const PriceTicket = (props) => {
    return(
        <div className="price-ticket">
            <div className="price-ticket__left"></div>
            <div className="price-ticket__content">  
                {
                    props.saleValue > 0 &&
                    <Utility__Currency
                        value={props.saleValue}
                        fontSize={13}
                        glyphFull />
                }
                {
                    props.saleValue > 0 &&
                    <div className="price-ticket__content__delim"></div>
                }
                <Utility__Currency
                    value={props.value}
                    fontSize={15}
                    accent />  
            </div>
            <div className="price-ticket__right"></div>
        </div>
    )
}
PriceTicket.defaultProps = {
    value: 1250,
    saleValue: -1,
}

export default PriceTicket;