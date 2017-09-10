import React from 'react';

import './promo-block.less';

import {Row, Container, Col}        from '../grid';
import Paper                        from 'material-ui/Paper';
import ChevroneRight                from 'material-ui/svg-icons/navigation/chevron-right';

var iconStyle = {
    width: 18,
    height: 18,
}

const getIcon = (promoType) => {
    const style = {
        fillRule: 'evenodd',
    }
    switch(promoType) {
        case "delivery": {
            return(
                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 300 300">
                    <path
                        style={style}
                        d="M272.5,231.912h-6.421a40.622,40.622,0,0,0-80.49,0H114.412a40.623,40.623,0,0,0-80.49,0H27.5A17.528,17.528,0,0,1,10,214.362V138.3a52.116,52.116,0,0,1,5.788-21.851l35.09-49.889c3.2-5.609,11.012-10.15,17.455-10.15H97.5A17.525,17.525,0,0,1,115,73.961v76.047H272.5a17.525,17.525,0,0,1,17.5,17.55v46.8A17.528,17.528,0,0,1,272.5,231.912ZM91.667,79.81H68.334l-35,58.491H91.667V79.81ZM272.5,138.3H144.167a17.523,17.523,0,0,1-17.5-17.548v-70.2A17.527,17.527,0,0,1,144.167,33H272.5A17.527,17.527,0,0,1,290,50.555v70.2A17.523,17.523,0,0,1,272.5,138.3ZM74.167,208.5A29.254,29.254,0,1,1,45,237.758,29.215,29.215,0,0,1,74.167,208.5Zm151.667,0a29.254,29.254,0,1,1-29.167,29.254A29.214,29.214,0,0,1,225.834,208.5Z"/>
                </svg>
            )
        }; break;
        case "gift": {
            return(
                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 300 300">
                    <path
                        style={style}
                        d="M272.5,103.216H161.667V43.052C171.714,30.4,181.715,19.186,188.316,15.39,206.388,5,228.948,10.215,238.7,27.043c7.682,13.25,5.015,29.667-5.237,41.15H272.5A17.511,17.511,0,0,1,272.5,103.216Zm-54.1-64.5c-3.264-5.626-11.963-6.707-19.431-2.419s-31.565,31.738-31.565,31.738,35.916-7.063,43.384-11.353S221.666,44.347,218.4,38.717Zm-80.068,64.5H27.5a17.511,17.511,0,0,1,0-35.023H66.533C56.282,56.71,53.615,40.294,61.3,27.043,71.053,10.215,93.613,5,111.685,15.39c6.593,3.791,16.6,15,26.649,27.647v60.179ZM101.03,36.3C93.562,32.01,84.863,33.091,81.6,38.717s0.145,13.669,7.613,17.966S132.6,68.036,132.6,68.036,108.5,40.592,101.03,36.3ZM62.5,114.891h75.834V290.007H62.5A17.507,17.507,0,0,1,45,272.492V132.4A17.508,17.508,0,0,1,62.5,114.891Zm175,0A17.509,17.509,0,0,1,255,132.4V272.492a17.508,17.508,0,0,1-17.5,17.515H161.667V114.891H237.5Z"/>
                </svg>
            )
        }; break;
        case "basket": {
            return(
                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 300 300">
                    <path
                        style={style}
                        d="M272.5,149.57h-1.609l-29.6,111.37c-2.244,9.425-12.15,17.065-22.127,17.065H80.841c-9.976,0-19.883-7.64-22.126-17.065L29.11,149.57H27.5a17.517,17.517,0,0,1,0-35.034h245A17.517,17.517,0,0,1,272.5,149.57ZM161.667,254.655h46.667a11.676,11.676,0,0,0,0-23.352H161.667v23.352Zm0-46.706H220a11.674,11.674,0,0,0,0-23.348H161.667v23.348ZM138.334,137.89h-70a11.677,11.677,0,0,0,0,23.353h70V137.89Zm0,46.711H80a11.674,11.674,0,0,0,0,23.348h58.333V184.6Zm0,46.7H91.668a11.676,11.676,0,0,0,0,23.352h46.667V231.3Zm93.334-93.413h-70v23.353h70A11.677,11.677,0,0,0,231.668,137.89ZM219.326,98.571L165.957,45.157A14.156,14.156,0,0,1,185.97,25.131l53.369,53.41A14.157,14.157,0,0,1,219.326,98.571Zm-138.651,0A14.157,14.157,0,0,1,60.662,78.542l53.369-53.41a14.156,14.156,0,0,1,20.013,20.025Z"/>
                </svg>
            )
        }; break;
    }

    return;
}

export const PromoBlock = (props) => {
    return(
        <Paper className="promo-block" zDepth={1} >
            <div className={`promo-block-icon promo-block-icon--${props.promoType}`}>
                <div className="promo-block-icon__icon">{getIcon(props.promoType)}</div>
            </div>
            <div className="promo-block-content">
                <span className="promo-block-content__title">{props.title}</span>
                <span className="promo-block-content__subtitle">{props.subtitle}</span>
            </div>
            <div className={`propmo-block-button propmo-block-button--${props.promoType}`}>
                <div className="propmo-block-button__icon">
                    <ChevroneRight style={iconStyle}/>
                </div>
                <span className="propmo-block-button__title">{props.buttonTitle}</span>
            </div>
        </Paper>
    )
}
PromoBlock.defaultProps = {
    title: "Бесплатная доставка",
    subtitle: 'And what is the use of a book," thought Alice, "without pictures or conversation?',
    buttonTitle: "Узнать больше",
    promoType: "delivery",
}

export const PromoBlockContainer = (props) => {
    return(
        <Row>
            <Container>
                <Col md={2} />
                {
                    props.items &&
                    props.items.map((item, index) =>
                        <Col key={index} md={4} stretch>
                            <PromoBlock
                                {...item}/>
                        </Col>
                    )
                }
                <Col md={2} />
            </Container>
        </Row>
    )
}
PromoBlockContainer.defaultProps = {
    items: [
        {
            title: "Скидки",
            subtitle: 'And what is the use of a book," thought Alice, "without pictures or conversation?',
            buttonTitle: "Узнать больше",
            promoType: "gift",
        },
        {
            title: "Лучшее качество",
            subtitle: 'And what is the use of a book," thought Alice, "without pictures or conversation?',
            buttonTitle: "Узнать больше",
            promoType: "basket",
        },
        {
            title: "Бесплатная доставка",
            subtitle: 'And what is the use of a book," thought Alice, "without pictures or conversation?',
            buttonTitle: "Узнать больше",
            promoType: "delivery",
        },
    ],
}

export default PromoBlockContainer;