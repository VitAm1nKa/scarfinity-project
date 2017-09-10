import React            from 'react';
import {connect}        from 'react-redux';
import {Link}           from 'react-router-dom';
import qs 			    from 'qs';

import                       './catalog-grid.less';

import GalleryDialog    from '../../utility/gallery-dialog';
import ProductGallery   from '../../utility/product-card-preview';
import {getProduct}     from '../../../redux/actions/products';


const CatalogGridNavigation = (props) => {
    return(
        <div className="catalog-grid-navigation">
            <div className="catalog-grid-navigation__item">
                <Paper zDepth={1}>
                    <Utility__SelectBox lightTheme/>
                </Paper>
            </div>
            <div className="catalog-grid-navigation__middle">

            </div>
            <div className="catalog-grid-navigation__item">
                <Paper zDepth={1}>
                    <Utility__SelectBox lightTheme/>
                </Paper>
            </div>
        </div>
    )
}

const CatalogGrid = (props) => {
    console.log(props);
    return(
        <div className="catalog-grid">
            {/* <CatalogGridNavigation /> */}
            {/* <CatalogInfinityLoad /> */}
            {
                props.productInfo == null ?
                <div>Загрузка...</div> :
                <GalleryDialog 
                    open={props.galleryProductId != null}
                    onRequestClose={props.galleryClose} >
                        <ProductGallery
                            productId={props.galleryProductId}
                            location={props.location}
                            history={props.history}/>
                </GalleryDialog>
            }
        </div>
    );
}

const mstp = (state, ownProps) => {
    const params = qs.parse(ownProps.location.search, {ignoreQueryPrefix: true});
    const productInfo = state.products.find(x => x.id == params.p);

    return {
        productInfo: state.products.find(x => x.id == params.p),
        galleryProductId: params.p,
        gallerySubQuery: (productId) => `${ownProps.location.pathname}${qs.stringify(Object.assign({}, params, {p: productId}), {addQueryPrefix: true})}`,
        galleryClose: () => {
            const link = `${ownProps.location.pathname}${qs.stringify(Object.assign({}, params, {p: undefined}), {addQueryPrefix: true})}`;
            ownProps.history.push(link);
        },
    }
}

const mdtp = (dispatch) => {
    return {
        loadProduct: (productId) => {dispatch(getProduct(productId))},
    }
}

const mp = (state, dispatch, ownProps) => {
    console.log(state, dispatch, ownProps);
    // Если при загрузке, отобраджается галлерея,
    // нужно загрузить продукт в стейт
    if(state.galleryProductId != null) {
        if(state.productInfo == null) {
            dispatch.loadProduct(state.galleryProductId);
        }
    }

    return Object.assign({}, state, dispatch, ownProps);
}

export default connect(mstp, mdtp, mp)(CatalogGrid);