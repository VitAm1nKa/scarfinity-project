import React from 'react';

import './offer.less';

import Paper        from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';

const getAnnounceType = (type) => {
    switch(type) {
        case "hot": return { style: { color: "#ee8944" }, title: "Горячее" }; break;
        case "new": return { style: { color: "#8767c8" }, title: "Новинка" }; break;
        case "sale": return { style: { color: "#9cbf3d" }, title: "Скидка" }; break;
        default: return { style: { color: "#999" }, title: "Предложение" }; break;
    }
}

const Offer = (props) => {
    const announceData = getAnnounceType(props.announceType);
    return(
        <div className="offer-block">
            <div className="offer-block-image-container">
                <img src={props.imageUrl} />
            </div>
            <div className="offer-block-description">
                <span className="offer-block-description__announce" style={announceData.style}>{`${announceData.title}!`}</span>
                <span className="offer-block-description__title">{props.title}</span>
                <p className="offer-block-description__description">{props.description}</p>
                <div className="offer-block-description__button">
                    <span>{props.buttonTitle}</span>
                </div>
            </div>
		</div>
    )
}
Offer.defaultProps = {
    announceType: "",
    title: "",
    description: "",
    buttonTitle: "",
    imageUrl: "",
}

const OfferGrid = (props) => {
    return(
        <div className="offer-grid">
            {
                props.offers.map((value, index) =>
                    <div key={index} className="offer-grid__item">
                        <Paper zDepth={1} style={{padding: 15}}>
                            <Offer 
                                announceType={value.announceType}
                                title={value.title}
                                description={value.description}
                                buttonTitle={value.buttonTitle}
                                imageUrl={value.imageUrl}/>
                        </Paper>
                    </div>
                )
            }
        </div>
    )
}
OfferGrid.defaultProps = {
    offers: [
        {
            announceType: "new",
            title: "Шарф хомут кашемир",
            description: "Только этой осенью, купи один и получи второй в подарок",
            buttonTitle: "Купить",
            imageUrl: "img/scarf-2.jpg",
        },
        {
            announceType: "sale",
            title: "Шарф хомут кашемир",
            description: "Только этой осенью, купи один и получи в подарок",
            buttonTitle: "Купить",
            imageUrl: "img/scarf-2.jpg",
        },
        {
            announceType: "hot",
            title: "Шарф хомут кашемир",
            description: "Только этой осенью, и получи второй в подарок",
            buttonTitle: "Купить",
            imageUrl: "img/scarf-2.jpg",
        },
        
    ],
}


export default OfferGrid;