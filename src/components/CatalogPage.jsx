import React from 'react';
import CatalogNavigation from './catalogNavigation/CatalogNavigation.jsx';
import CatalogProductCardMini from './catalog/CatalogProductCardMini.jsx';

import './CatalogPage.less';


class CatalogPage extends React.Component {

    constructor(props, context) {
        super(props, context);
	}

    render() {
        return (
            <div className="greeds__wrap">
                <div className="catalog-page">
                    <div className="catalog-page__top-section">
                        <CatalogNavigation />
                    </div>
                    <div className="catalog-page__middle-section">
                        <div className="catalog-page__middle-section__left-side"></div>
                        <div className="catalog-page__middle-section__content-side">
                            <div className="catalog-page__middle-section__content-side__container">
                                <CatalogProductCardMini />
                                <CatalogProductCardMini />
                                <CatalogProductCardMini />
                                <CatalogProductCardMini />
                                <CatalogProductCardMini />
                                <CatalogProductCardMini />
                                <CatalogProductCardMini />
                                <CatalogProductCardMini />
                                <CatalogProductCardMini />
                            </div>
                        </div>
                    </div>
                    <div className="catalog-page__bottom-section">
                        <CatalogNavigation />
                    </div>
                </div>
            </div>
        );
    }
}

export default CatalogPage;