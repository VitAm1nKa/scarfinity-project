import React                    from 'react';
import {connect}                from 'react-redux';
import {Link}                   from 'react-router-dom';

import                               './product-card-preview.less';

import ChevroneLeft             from 'material-ui/svg-icons/navigation/chevron-left';
import ChevroneRight            from 'material-ui/svg-icons/navigation/chevron-right';
import LazyLoader               from '../lazy-loader';

import ProductCard              from '../../product/product-card';
import {ProductCardWrapDefault} from '../../product/product-card/product-card-wrapper';     

var style = {
    icon: {
        width: 30,
        height: 30,
    }
}

const ProductGalleryContainerFooter = (props) => {
    return(
        <div className="product-gallery-container-footer">
            {
                !props.loading 
                ?
                <div className="product-gallery-container-footer__container">
                    <span className="product-gallery-container-footer__container__accent">{props.title}</span>
                    <span>{`Фото № ${Number(props.currentIndex) + 1} из ${props.count}`}</span>
                </div>
                :
                <LazyLoader size={5} />
            }
        </div>
    )
}
ProductGalleryContainerFooter.defaultProps = {
    loading: true,
    title: "",
    currentIndex: -1,
    count: -1,
}

const ProductGalleryButton = (props) => {
    return(
        <div 
            className={`product-gallery-button`}>
            <Link to={props.link}>
                <div
                    className={`product-gallery-button__container product-gallery-button__container${props.right ? "--right" : "--left"}`}>
                        <div className="product-gallery-button__container__icon">
                            {
                                props.right
                                ? <ChevroneRight style={style.icon} />
                                : <ChevroneLeft  style={style.icon} />
                            }
                        </div>
                        <div className="product-gallery-button__container__content">
                            {
                                props.imageSrc &&
                                <img src={props.imageSrc} />
                            }
                        </div>
                </div>
            </Link>
        </div>
    )
}
ProductGalleryButton.defaultProps = {
    right: false,
    imageSrc: false,
    link: null,
    onClick: () => {},
}

const ProductGalleryContainer = (props) => {
    return(
        <div className="product-gallery-container">
            <ProductCardWrapDefault>
                <ProductCard
                    productId={props.productId}
                    location={props.location}
                    history={props.history}/>
            </ProductCardWrapDefault>
            <ProductGalleryContainerFooter
                currentIndex={props.currentIndex}
                count={props.count}
                title={props.title}
                loading={false}/>
        </div>
    )
}
ProductGalleryContainer.defaultProps = {
    currentIndex: -1,
    count: -1,
    title: "",
}

const ProductGallery = (props) => {
    return(
        <div className="product-gallery">
            <ProductGalleryButton
                imageSrc={props.imageUrl.prev}
                link={props.link.prev}/>
            <ProductGalleryContainer
                currentIndex={props.currentIndex}
                count={props.count}
                title={props.title}
                productId={props.productId}
                location={props.location}
                history={props.history}/>
            <ProductGalleryButton
                imageSrc={props.imageUrl.next}
                link={props.link.next}
                right/>
        </div>
    )
}

const mstp = (state, ownProps) => {
    console.log(state, ownProps);
    const currentIndex = state.products.findIndex(x => x.id == ownProps.productId);
    const count = state.products.length;
    const prevIndex = (currentIndex + count - 1) % count;
    const nextIndex = (currentIndex + 1) % count;

    return Object.assign({}, ownProps, {
        title: ownProps.title,
        currentIndex: currentIndex,
        count: count,
        productId: ownProps.productId,
        imageUrl: {
            prev: state.products[prevIndex] && state.products[prevIndex].images.preview,
            next: state.products[nextIndex] && state.products[nextIndex].images.preview,
        },
        link: {
            prev: "", //ownProps.subQuery(images[prevIndex].id),
            next: "", //ownProps.subQuery(images[nextIndex].id),
        }
    });
}

const mdtp = (dispatch) => {
    return {
        
    }
}

export default connect(mstp, mdtp)(ProductGallery);