import React from 'react';

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


import {ProductBlock} from '../catalog/RecenlyViewed.jsx';
import {ItemGridHorisontal, ItemGridVertical} from '../utility/Utility__ItemGrid.jsx';
import Utility__ImageContainer  from '../utility/Utility__ImageContainer.jsx';

import Paper                    from 'material-ui/Paper';

const style = {
    button: {
        width: 26,
        height: 30,
        padding: 3,
    }
}

const ProductCardImageBlockView = (props) => {
	return(
		<div className="product-card-image-container">
			<div className="product-card-image-container__main">
				<Utility__ImageContainer/>
			</div>
			<div className="product-card-image-container__galery" ref={props.galeryRef} >
				{
					props.directionRow 
					? <ItemGridHorisontal />
					: <ItemGridVertical />

				}
			</div>
		</div>
	)
}
ProductCardImageBlockView.defaultProps = {
	directionRow: true,
	galeryRef: null,
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

class ProductCardView extends React.Component {

    constructor(props, context) {
        super(props, context);

		this.state = {
			info: {
				title: "Палантин Marck Shagal"
			},
			row: true,
		}

		this.handleResize = this.handleResize.bind(this);
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

		const {info} = this.state;

        return(
			<div className="product-card">
				<div className="product-card__container">
					<div className="product-card__container__header">
						<span className="product-card-title">{info.title}</span>
					</div>
					<div className="product-card__container__body">
						<ProductCardImageBlockView
							galeryRef={imb => this.imageBlock = imb}
							directionRow={this.state.row}/>

						<div className="product-card__product-info-container">
							<div className="product-card__product-title">
								<div className="product-card__product-title__title-block">
									<span className="product-card-title">{info.title}</span>
								</div>
								<div className="product-card__product-title__review-block">
									<Utility__RaitingBox currentValue={3.5} />
									<ArrowDropDown color={"#777"} />
									<span className="product-card__product-title__review-block__review">8 отзывов</span>
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
										<ColorPicker itemSize={28} itemGap={5}/>
									</div>
								</div>

								{/*Блок с ценой*/}
								<div className="product-card__product-info__pricing-block">
									<Utility__Currency size={"xlarge"} value={1200} saleValue={1000} accent />
								</div>

								{/*Блок с выбором количества и кнопкой в корзину*/}
								<div className="product-card__product-info__cart-block">
									<ProductCardQuantity value={1} minValue={1} maxValue={20} />
									<div className="product-card-addToCart">
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
			</div> 
        );
    }
}

const ProductCard = (props) => {
	return(
		<Paper zDepth={1} style={{padding: '40px 10px', position: 'relative'}}>
			<ProductCardView />
		</Paper>
	)
}

export default ProductCard;