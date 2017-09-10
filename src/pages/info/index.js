import React                        from 'react';
import {Route, Redirect, Switch}    from 'react-router';
import {Link}                       from 'react-router-dom'
import {connect}                    from 'react-redux';
import qs 			                from 'qs';

import {getProduct}                 from '../../redux/actions/products';                 

import {ProductCardWrapDefault}     from '../../components/product/product-card/product-card-wrapper';
import ProductCard                  from '../../components/product/product-card';
import ProductCardCatalog           from '../../components/product/catalog';

const Page__Info = (props) => {
    return(
        <div>
            <Test {...props} />
        </div>
    )
}

const Test1 = (props) => {
    return(
        <div>
            <ProductCardWrapDefault>
                <ProductCard
                    productId={props.productId}
                    colorCode={props.colorCode}
                    location={props.location}
                    history={props.history}
                    selfLoad/>
            </ProductCardWrapDefault>
            <ProductCardCatalog
                productId={props.productId}
                colorCode={props.colorCode}
                location={props.location}
                history={props.history}/>
        </div>
    )
}

const mstp = (state, ownProps) => {
    const productId = 23; // Брать из пути
    const colorCode = qs.parse(ownProps.location.search, {ignoreQueryPrefix: true}).c;

    return {
        history: ownProps.history,
        location: ownProps.location,
        selfLoad: ownProps.selfLoad,
        productId,
        colorCode,
    }
}

const mdtp = (dispatch) => {
    return {

    }
}

const Test = connect(mstp, mdtp)(Test1);

export default Page__Info;