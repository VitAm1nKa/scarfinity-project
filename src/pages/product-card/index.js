import React from 'react';

import './product-card.less';

import {Wrapper}                from '../../components/utility/Utility__Css.jsx';
import ProductCard              from '../../components/catalog/ProductCard.jsx';
import ReviewAndOtherSection    from '../../components/review/ReviewAndOtherSection.jsx';
import CatalogSection           from '../../components/catalog/catalog-section';
import RecenlyViewed__Shell     from '../../components/catalog/RecenlyViewed.jsx';


const Page__ProductCard = (props) => {
    return(
        <Wrapper>
            <div className="page__product-card-grid">
                <div className="product-content">
                    <ProductCard />
                    <ReviewAndOtherSection />
                </div>
                <div className="recomended-block">
                    <CatalogSection />
                </div>
            </div>
        </Wrapper>
    )
}

export default Page__ProductCard;