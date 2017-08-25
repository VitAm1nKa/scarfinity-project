import React from 'react';
import {Route, Redirect, Switch} from 'react-router';
import { Link } from 'react-router-dom'

import './product-card.less';

import {Grid, Row, Container, Col}  from '../../components/utility/grid';
import ProductCard                  from '../../components/catalog/ProductCard.jsx';
import ReviewAndOtherSection        from '../../components/review/ReviewAndOtherSection.jsx';
import CatalogSection               from '../../components/catalog/catalog-section';
import RecenlyViewed__Shell         from '../../components/catalog/RecenlyViewed.jsx';


const Page__ProductCard = (props) => {
    return(
        <div className="page__product-card-grid">
            <ProductCard />
            <ReviewAndOtherSection />
            <CatalogSection />
        </div>
    )
}

export default Page__ProductCard;