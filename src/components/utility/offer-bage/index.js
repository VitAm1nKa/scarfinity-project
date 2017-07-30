import React from 'react';

import './offer-bage.less';

const OfferBage = (props) => {
    function style() {
        if(props.hot) return {style: "offer-bage--hot", title: "Горячее!"};
        if(props.sale) return {style: "offer-bage--sale", title: "Скидка!"};
        if(props.new) return {style: "offer-bage--new", title: "Новинка!"};

        return {style: "", title: ""};;
    }

    return(
        <div 
            className={`offer-bage ${style().style}`}
            style={{
                padding: `${Math.ceil(props.size / 5)}px ${Math.ceil(props.size / 4) * 2}px`,
                borderRadius: Math.round(props.size / 6),
            }}>
                <span 
                    className="offer-bage__title"
                    style={{
                        fontSize: props.size,
                    }}>{style().title}</span>
        </div>
    )
}
OfferBage.defaultProps = {
    hot: false,
    sale: false,
    new: true,
    size: 12,
}

export default OfferBage;