import React                        from 'react';
import {Route, Redirect, Switch}    from 'react-router';
import {Link}                       from 'react-router-dom'
import {connect}                    from 'react-redux';

import './product-card.less';

import {Grid, Row, Container, Col}  from '../../components/utility/grid';
import ProductCard                  from '../../components/catalog/ProductCard.jsx';
import ReviewAndOtherSection        from '../../components/review/ReviewAndOtherSection.jsx';
import CatalogSection               from '../../components/catalog/catalog-section';
import RecenlyViewed__Shell         from '../../components/catalog/RecenlyViewed.jsx';
import LoadStatusBlock              from '../../components/utility/load-status-block';

import {getProduct} 		        from '../../redux/actions/products.js';

const mstp__Page__ProductCard = (state, ownProps) => {
    console.log(ownProps);
    return {
        product: state.products.find(p => p.id === Number(ownProps.match.params.id)),
        productId: Number(ownProps.match.params.id),
    }
}

const mdtp__Page__ProductCard = (dispatch) => {
    return {
        loadData: (productId) => dispatch(getProduct(productId)),
    }
}

const Main = (props) => {
    return(
        <div className="page__product-card-grid">
            <Route
                path="/product/:id"
                render={
                    ownProps => 
                    <ProductCard
                        productInfo={props.product}
                        location={props.location}/>
                }/>
            <Route path="/product/:id" render={ownProps => <ReviewAndOtherSection reviewsInfo={props.product.reviews} />} />
        </div>
    )
}

const Page__ProductCard = ({product, productId, loadData, location}) => {
    // Диспатчим экшн загрузки данных
    if(product == null || product == undefined) loadData(productId);

    return(
        <div>
            {
                (product == null || product == undefined)
                ? <LoadStatusBlock /> 
                : <Main
                    product={product}
                    location={location}/>
            }
            <CatalogSection />
        </div>
    )
}

export default connect(mstp__Page__ProductCard, mdtp__Page__ProductCard)(Page__ProductCard);