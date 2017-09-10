import React                            from 'react';
import {connect} 			            from 'react-redux';
import qs 								from 'qs';

import {addItem} 			            from '../../redux/actions/cart.js';
import {fetchProduct}					from '../../redux/actions/products.js';

const mstp = (state, ownProps) => {
	/*--------------------------------------------
		Первый слой
		На входе:
			Props: 
				productId
				colorCode
				selfLoad
			Methods: 
				onColorCodeChange ( colorCode )

		1. 	Проверяем, есть ли данный продукт 
			в стейте. Если нет, и selfLoad = true
			диспатчим экшн загрузки данного
			продукта в стейт. Передаем уравление
			второму слою.
	--------------------------------------------*/
	const {productId, selfLoad} = ownProps;
	const productInfo = state.products.find(x => x.id == productId);

	if(productInfo == null)
		return {
			__layer: 1,
			productId,
			selfLoad,
		}

	/*--------------------------------------------
		Воторой слой
		На входе:
			Props: 
				productId
				colorCode
			Methods: 
				onColorCodeChange ( colorCode )

		1. 	Срабатывает, когда данные попадают в
			стейт.
		2.	Проверяем colorCode. Если входной параметр
			был равен null, берем первое значение
			из данных продукта, из стейта.
		3.	Передаем управление тертьему(визуальному)
			слою.
	--------------------------------------------*/

	const {location, history} = ownProps;
	const colorCode = ownProps.colorCode || productInfo.subart[productInfo.baseSubart].colorCode;
	const productInfoSubArt = productInfo.subart.find(x => x.colorCode == colorCode);

	/** Main ----------------------------------------------------------------------- */
	var main = {
		title: productInfo.title,
		article: `${productInfo.article}${colorCode}`,
		shortInfo: productInfo.shortInfo,
	}

	/** Images --------------------------------------------------------------------- */
	var images = productInfoSubArt.images;

	/** Reviews -------------------------------------------------------------------- */
	var reviews = productInfo.reviews;

	/** Favorite ------------------------------------------------------------------- */
	var favorite = {
		toggle: productInfo.favorite,
	}
	
	/** Colors --------------------------------------------------------------------- */
    var colors = {
        list: productInfo.subart.map(item => item.colorCode),
        onColorCodeChange: (colorCode) => {
			if(location && history) {
				const params = qs.parse(location.search, {ignoreQueryPrefix: true});
				const link = `${location.pathname}${qs.stringify(Object.assign({}, params, {c: colorCode}), {addQueryPrefix: true})}`;
				history.push(link);
			}
		}
    }

	/** Pricing ------------------------------------------------------------------- */
	var pricing = {
		cost: productInfoSubArt.cost,
		saleCost: productInfoSubArt.saleCost,
	}

	/** Quantity ------------------------------------------------------------------ */
	var productInCartInfo = state.cart.products.find(x => x.productId);
	var quantity = {
		minValue: 1,    // productInfo.quantity.min
		maxValue: 10,   // productInfo.quantity.max
		currentQuantity: productInCartInfo == null ? 0 : productInCartInfo.quantity,
		inCart: productInCartInfo != null,
	}

	return {
		productId,
		colorCode,
		main,
		images,
		reviews,
		favorite,
		colors,
		pricing,
		quantity,
		/* Methods -----------------------------------------------------------------*/
		goToCart: () => {
			history.push('/cart');
		},
		/** Utility */
		addProductToCart: {
			productId: productId,
			subartId: productInfoSubArt.id,
		}
	}
}

const mdtp = (dispatch) => {
	return {
		fetchProduct: (productId) => {dispatch(fetchProduct(productId))},
		changeFavoriteState: () => dispatch({type: "PRODUCT__CHANGE_FAVORITE_STATE", data: null}),
		onChangeQuantity: () => dispatch({type: "PRODUCT__CHANGE_QUANTITY", data: null}),
		addProductToCart: ({productId, subartId}, quantity) => {dispatch(addItem({productId, subartId, quantity}))},
	}
}

const mp = (state, dispatch, ownProps) => {
	/* 
		Первый слой
		
		Если productInfo == null возвращаем состояние
		ожидания загрузки(лоадер).
		Если selfLoad = true, диспатчим экшн загрузки с сервера.
	*/
	if(state.__layer == 1) {
		if(state.selfLoad == true) {
			dispatch.fetchProduct(state.productId);
		}

		return {
			loading: true,
		}
	}

	/* Второй слой */
	return Object.assign({}, state, dispatch, {
		addProductToCart: (quantity) => {dispatch.addProductToCart(state.addProductToCart, quantity)},
	});
}

export default connect(mstp, mdtp, mp);