import React from 'react';
import {Link} from 'react-router-dom'

import './product-card.less';

import Utility__RaitingBox from '../utility/Utility__RaitingBox.jsx';
import ChevronLeft from 'material-ui/svg-icons/navigation/chevron-left';
import ChevronRight from 'material-ui/svg-icons/navigation/chevron-right';
import IconButton from 'material-ui/IconButton';
import {ColorPicker, ColorPickerItem} from '../utility/Utility__ColorPicker.jsx';
import Utility__Currency from '../utility/Utility__Currency.jsx';
import RaisedButton from 'material-ui/RaisedButton';
import {red, red_d, red_l, addToCart} from '../basic/SRaisedButton.js';
import ShoppingCart from 'material-ui/svg-icons/action/shopping-cart';
import Add from 'material-ui/svg-icons/content/add';
import Remove from 'material-ui/svg-icons/content/remove';
import Favorite from 'material-ui/svg-icons/action/favorite';
import FavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import ArrowDropDown from 'material-ui/svg-icons/navigation/arrow-drop-down';
import FlatButton from 'material-ui/FlatButton';

import ImageGallery from '../../components/utility/image-gallery-view';

import {ProductBlock} from '../catalog/RecenlyViewed.jsx';
import {ItemGridHorisontal, ItemGridVertical} from '../utility/Utility__ItemGrid.jsx';
import Utility__ImageContainer  from '../utility/Utility__ImageContainer.jsx';
import LazyLoader		from '../utility/lazy-loader';

import Paper                    from 'material-ui/Paper';

// Data --------------------
import {connect} 			from 'react-redux';
import {getProduct} 		from '../../redux/actions/products.js';
import {addItem} 			from '../../redux/actions/cart.js';
import { parse } 			from 'qs';

// Libs --------------------
import {count__reviews}		from '../../lib/currying';

const style = {
    button: {
        width: 26,
        height: 30,
        padding: 3,
    }
}

class ProductCardImageBlockView extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			imageData: props.imageData,
			selectedIndex: 0,
			directionRow: props.directionRow,
			galeryRef: props.galeryRef,
			location: props.location,
			zGallery: this.checkOpenGallery(props.location),
		}

		this.checkOpenGallery(this.state.location);

		this.handleIndexChange = this.handleIndexChange.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		this.state.zGallery = this.checkOpenGallery(nextProps.location);
		this.setState(nextProps);
	}

	handleIndexChange(index) {
		console.log(index);
		this.setState({
			selectedIndex: index,
		});
	}

	checkOpenGallery(location) {
		if(location) {
			const query = parse(location.search.substr(1));
			if(query.z) {
				return true;
			}
		}

		return false;
	}

	render() {
		console.log(this.state.location, this.state.selectedIndex);
		return(
			<div className="product-card-image-container">
				<div className="product-card-image-container__main">
					{
						this.state.imageData && this.state.location &&
						<Link to={`${this.state.location.pathname}?z=${this.state.selectedIndex}`}>
							<Utility__ImageContainer
								imageUrl={this.state.imageData.list[this.state.selectedIndex].main} />
						</Link>
					}
				</div>
				{
					this.state.imageData.list && this.state.imageData.list.length > 0 &&
					<div 
						className="product-card-image-container__galery"
						ref={this.state.galeryRef}
						>
						{
							this.state.directionRow 
							? <ItemGridHorisontal
								selectedIndex={this.state.selectedIndex}
								items={this.state.imageData.list}
								onIndexChange={this.handleIndexChange}/>
							: <ItemGridVertical
								selectedIndex={this.state.selectedIndex}
								items={this.state.imageData.list}
								onIndexChange={this.handleIndexChange}/>

						}
					</div>
				}
				{
					this.state.zGallery && this.state.location &&
					<ImageGallery
						images={this.state.imageData.list}
						location={this.state.location}
						currentIndex={this.state.selectedIndex}/>
				}
			</div>
		)
	}
}
ProductCardImageBlockView.defaultProps = {
	directionRow: true,
	galeryRef: null,
	imageData: null,
	location: null,
}

class ProductCardGalery extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            currentIndex: 0,
            itemsCount: 6,
            items: ["", "", "", "", "", ""],
			itemsInRow: 5,
			lastIndex: 5,
        }

        const {onIndexChange, items} = this.props;

        if(items) {
            this.state.items = items;
            this.state.itemsCount = items.count;
        }

        if(onIndexChange) {
            this.onIndexChange = onIndexChange;
        }

        this.handleNextClick = this.handleNextClick.bind(this);
        this.handlePrevClick = this.handlePrevClick.bind(this);
        this.handleItemClick = this.handleItemClick.bind(this);
	}

    handlePrevClick() {
        let {currentIndex, lastIndex} = this.state;
        if(--lastIndex >= 0) this.changeIndex(currentIndex - 1, lastIndex);
    }

    handleNextClick() {
        let {currentIndex, lastIndex, itemsCount} = this.state;
        if(++lastIndex <= itemsCount) this.changeIndex(currentIndex + 1, lastIndex);
    }

    handleItemClick(index) {
		this.changeIndex(index);
		console.log(index);
    }

    changeIndex(index, lastIndex = null) {
        if(index != null) {
			lastIndex = lastIndex != null ? lastIndex : this.state.lastIndex;
            this.setState({currentIndex: index, lastIndex: lastIndex});
        }

        if(this.onIndexChange) {
            this.onIndexChange(index);
        }
    }

    render() {
        const {currentIndex, itemsCount, items, itemsInRow, lastIndex} = this.state;

		const offset = itemsCount > itemsInRow ? lastIndex - itemsInRow : 0;

        return(
            <div className="product-card-galery">
                <div className="product-card-galery__button">
                    <IconButton 
                        style={style.button} 
                        onClick={this.handlePrevClick} 
                        disabled={lastIndex <= itemsInRow ? true : false}>
                        <ChevronLeft />
                    </IconButton>
                </div>
                <div className={`product-card-galery__container product-card-galery__container--pos${currentIndex - offset}`}>
                    <div className={`product-card-galery__container__wrapper product-card-galery__container__wrapper--pos${offset}`}>
                        {
                            items.map((item, index) => 
                                <div key={index} className="product-card-galery__item" onClick={() => { this.handleItemClick(index) }}>
									{/*<img src={item} />*/}
								</div>
                            )
                        }
                    </div>
                </div>
                <div className="product-card-galery__button">
                    <IconButton 
                        style={style.button} 
                        onClick={this.handleNextClick}
                        disabled={lastIndex == itemsCount ? true : false}>
                        <ChevronRight />
                    </IconButton>
                </div>
            </div>
        );
    }
}

class ProductCardQuantity extends React.Component {
    constructor(props, context) {
        super(props, context);

		this.state = {
			quantity: 1,
			maxValue: 10,
			minValue: 1,
			inProcess: false,
		}

		this.style = {
			button: {
				width: 22, 
				height: 22, 
				padding: 3,
			},
			icon: {
				width: 16, 
				height: 16, 
				color: "#777",
			}
		}

		this.onChangeValue = (value, callback) => {
			callback(true);
		}

		if(props.onChangeValue != null) {
			this.onChangeValue = props.onChangeValue;
		}

		if(props.value != null) {
			this.state.value = props.value;
		}

		if(props.minValue != null) {
			this.state.minValue = props.minValue;
			if(this.state.value < this.state.minValue) {
				this.state.value = this.state.minValue;
			}
		}

		if(props.maxValue != null) {
			this.state.maxValue = props.maxValue;
			if(this.state.value > this.state.maxValue) {
				this.state.value = this.state.maxValue;
			}
		}

		this.handleAdd = this.handleAdd.bind(this);
		this.handleRemove = this.handleRemove.bind(this);
	}

	handleAdd() {
		const {quantity} = this.state;
		this.changeVlaue(quantity + 1);
	}

	handleRemove() {
		const {quantity} = this.state;
		this.changeVlaue(quantity - 1);
	}

	changeVlaue(value) {
		this.setState({inProcess: true}, () => {
			if(this.onChangeValue(value, (available) => {
				if(available) {
					this.state.quantity = value;
				}

				this.setState({inProcess: false});
			}));
		});
	}

	render() {
		const {quantity, minValue, maxValue, inProcess} = this.state;

		return(
			<div className={`product-card-quantity ${inProcess ? "product-card-quantity--in-process": ""}`}>
				<span className="product-card-quantity__value">{quantity}</span>
				<div className="product-card-quantity__control">
					<div className="product-card-quantity__control__item">
						<IconButton 
							iconStyle={this.style.icon} 
							style={this.style.button}
							disabled={quantity == maxValue}
							onClick={this.handleAdd} >
							<Add />
						</IconButton>
					</div>
					<div className="product-card-quantity__control__item">
						<IconButton 
							iconStyle={this.style.icon} 
							style={this.style.button} 
							disabled={quantity == minValue}
							onClick={this.handleRemove} >
							<Remove />
						</IconButton>
					</div>
				</div>
				<div className="product-card-quantity__process-block">
					<div className="product-card-quantity__process-block__spinner"></div>
				</div>
			</div>
		);
	}
}

class ProductCardFavorite extends React.Component {
    constructor(props, context) {
        super(props, context);

		this.state = {
			inFavorite: false,
		}

		this.style = {
			button: {
				width: 32,
				height: 32,
				padding: 4,
			},
			icon: {
				width: 22,
				height: 22,
				color: "#999",
			},
			iconSelected: {
				width: 22,
				height: 22,
				color: "#e05543",
			}
		}

		this.onFavoriteChange = (state, callback) => {
			if(callback) {
				callback(state);
			}
		}

		if(props.inFavorite != null) {
			this.state.inFavorite = props.inFavorite;
		}

		this.handleClick = this.handleClick.bind(this);
	}

	handleClick() {
		const {inFavorite} = this.state;
		this.setState({inFavorite: !inFavorite}, () => {
			this.onFavoriteChange(!inFavorite, (favoriteState) => {
				if(this.state.inFavorite != favoriteState) {
					this.setState({inFavorite: favoriteState});
				}
			})
		})
	}

	render() {

		const {inFavorite} = this.state;

		return(
			<div className="product-card-favorite">
				<span className="product-card-favorite__label">В избранное</span>
				<IconButton 
					style={this.style.button} 
					iconStyle={inFavorite ? this.style.iconSelected : this.style.icon}
					onClick={this.handleClick} >
					{inFavorite ? <Favorite /> : <FavoriteBorder />}
				</IconButton>
			</div>
		);
	}
}

const mstp__ProductCardView = (state, ownProps) => {
	return {

	}
}

const mdtp__ProductCardView = (dispatch) => {
	return {
		addProductToCart: (product) => dispatch(addItem(product)),
	}
}

class ProductCardView extends React.Component {
    constructor(props, context) {
		super(props, context);

		this.state = Object.assign({}, props, {
			row: true,
		});

		this.handleResize = this.handleResize.bind(this);
	}

	handleAddProductToCart() {
		console.log("Try to add to cart", this.state);
		const {productInfo} = this.state;
		this.state.addProductToCart({
			productId: productInfo.id,
			title: productInfo.title,
			quantity: 1,
			cost: productInfo.price.cost,
			color: "",
		});
	}

	handleResize() {
		this.prepareDirection();
	}

	prepareDirection() {
		const {width, height} = this.imageBlock.getBoundingClientRect();
		const row = width > height;
		if(this.state.row != row) {
			this.setState({row});
		}
	}

	componentWillReceiveProps(props) {
		this.setState({
			productInfo: props.productInfo,
			location: props.location,
		});
	}

	componentWillMount() {
		window.addEventListener('resize', this.handleResize, true);
	}

	componentDidMount() {
		this.prepareDirection();
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.handleResize, true);
	}

    render() {
		const {productInfo} = this.state;
		console.log(productInfo.colors);

        return(
			<div className="product-card__container">
				<div className="product-card__container__header">
					<span className="product-card-title">{productInfo.title}</span>
				</div>
				<div className="product-card__container__body">
					<ProductCardImageBlockView
						imageData={productInfo.images}
						galeryRef={imb => this.imageBlock = imb}
						directionRow={this.state.row}
						location={this.state.location}
						/>

					<div className="product-card__product-info-container">
						<div className="product-card__product-title">
							<div className="product-card__product-title__title-block">
								<span className="product-card-title">{productInfo.title}</span>
							</div>
							<div className="product-card__product-title__review-block">
								<Utility__RaitingBox currentValue={productInfo.reviews.rating} />
								<ArrowDropDown color={"#777"} />
								<span className="product-card__product-title__review-block__review">
									{`${productInfo.reviews.count} ${count__reviews(productInfo.reviews.count)}`}
								</span>
								<ProductCardFavorite />	
							</div>
						</div>
						<span className="product-card__product-info-container__delim"></span>
						<div className="product-card__product-info">

							{/*Блок с оисанием товара*/}
							<div className="product-card__product-info__short-description-block">
								<p className="product-card__product-info__short-description-block__content">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit exercitationem molestiae incidunt fugit necessitatibus cum consequuntur maxime, vero doloremque quisquam cupiditate earum nulla eos, nihil dolor distinctio veritatis deleniti est!</p>
							</div>

							{/*Блок с контейнером цветов*/}
							<div className="product-card__product-info__color-select-block">
								<div className="product-card-color">
									<span className="product-card-color__title">Цвет: </span>
									<ColorPicker
										colors={productInfo.colors.join()}
										itemSize={12} 
										itemGap={5}
										long/>
								</div>
							</div>

							{/*Блок с ценой*/}
							<div className="product-card__product-info__pricing-block">
								<Utility__Currency
									size={"xlarge"} 
									value={productInfo.price.cost} 
									saleValue={productInfo.price.sale} 
									accent />
							</div>

							{/*Блок с выбором количества и кнопкой в корзину*/}
							<div className="product-card__product-info__cart-block">
								<ProductCardQuantity value={1} minValue={1} maxValue={20} />
								<div
									className="product-card-addToCart"
									onClick={this.handleAddProductToCart.bind(this)}>
									<div className="product-card-addToCart__icon">
										<ShoppingCart color={"#fefefe"} />
									</div>
									<div className="product-card-addToCart__label"><span>Добавить в корзину</span></div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
        );
    }
}
const Connect__ProductCardView = connect(mstp__ProductCardView, mdtp__ProductCardView)(ProductCardView);

const ProductCard = (props) => {
	return(
		<Paper
			className="product-card" 
			zDepth={1}>
				{
					props.productInfo
					? 
					<Connect__ProductCardView
						productInfo={props.productInfo}
						location={props.location}/>
					: <LazyLoader />
				}
		</Paper>
	)
}

export default ProductCard;