import React from 'react';

import './main-menu.less';

import {Row, Container, Col} from '../../utility/grid';

// Icon test
const CartIcon = (props) => {
    return(
        <svg 
            viewBox="0 0 200 200"
            {...props.style}
            style={{
                display: 'inline-block',
                userSelect: 'none',
                fill: props.color,
                fillRule: 'evenodd',
                width: props.width,
                height: props.height,
            }}>>
            <path d="M43,176L24,102c-1.125-5.906-8-8-8-8-6,0-6-15,0-15H184c6,0,6,15,0,15,0,0-7,2.063-8,8l-19,74s-2,8-6,8H49C45,184,43,176,43,176Zm19-21H86c10,0,10,13,0,13H62C52,168,52,155,62,155Zm52,0h26c8.15,0,7.994,13,0,13H114C104,168,104,155,114,155ZM54,139a7.017,7.017,0,1,1,0-14H86a7.017,7.017,0,1,1,0,14H54Zm60,0a7.017,7.017,0,1,1,0-14h32a7.017,7.017,0,1,1,0,14H114ZM44,108c-10,0-10-15,0-15H86c10,0,10,15,0,15C86,108.462,41.479,108,44,108Zm70,0c-10,0-10-15,0-15h42c10,0,10,15,0,15H114ZM79,18c8-8,17.861,2.139,10,10L49,68c-7.4,7.4-17.538-2.462-10-10Zm70,50c8,8,17.861-2.139,10-10L119,18c-7.4-7.4-17.538,2.462-10,10Z"/>
        </svg>
    )
}
CartIcon.defaultProps = {
    color: '#fff',
    width: 22,
    height: 22,
}

const MainMenu = (props) => {
    return(
        <div className="greed-head__navigation__nav-block">
			<div className="greed-head__navigation__nav-block__container greeds__wrap">
				<div className="greed-head__navigation__nav-block__container__navigation">
					<div className="greed-head__navigation__item">
						<span>Женщинам</span>
						<div className="greed-head__navigation__float-info-menu">
							<div className="greed-head__navigation__float-info-menu__container">
								<div className="greed-head__navigation__float-info-menu__product-recomended">
									<div className="images-preview s180">
										<div className="images-preview__container">
											<img src="images/scarf-6.jpg" />
											    <div className="images-preview__container__popup-block">
											</div>
										</div>
									</div>
									<div className="greed-head__navigation__float-info-menu__product-recomended__content">
										<span className="bages__offer-status xs sale">Скидка!</span>
										<span className="titles__offer-product-title m">Шарф Хомут кашемир</span>
										<span className="titles__offer-pricing">
											<span className="titles__offer-pricing__value">800</span>
											<span className="titles__offer-pricing__sale">1200</span>
										</span>
										<a href="#" className="buttons__offer-product-add-to-cart">В КОРЗИНУ</a>
									</div>
								</div>
								<div className="lists__simple fb35 grow">
									<div className="lists__simple__container">
										<div className="lists__simple__container__title">
											<span className="titles__offer-product-title l">Категории</span>
										</div>
										<div className="lists__simple__container__content">
											<div className="lists__simple__container__content__item">
												<a href="#" className="titles__list-item s a">Шарф lorem</a>
											</div>
											<div className="lists__simple__container__content__item">
												<a href="#" className="titles__list-item s a">Шарф lorem</a>
											</div>
											<div className="lists__simple__container__content__item">
												<a href="#" className="titles__list-item s a">Шарф lorem</a>
											</div>
											<div className="lists__simple__container__content__item">
												<a href="#" className="titles__list-item s a">Шарф lorem</a>
											</div>
											<div className="lists__simple__container__content__item">
												<a href="#" className="titles__list-item s a">Шарф lorem</a>
											</div>
											<div className="lists__simple__container__content__item">
												<a href="#" className="titles__list-item s a">Шарф lorem</a>
											</div>
											<div className="lists__simple__container__content__item">
												<a href="#" className="titles__list-item s a">Шарф lorem</a>
											</div>
											<div className="lists__simple__container__content__item">
												<a href="#" className="titles__list-item s a">Шарф lorem</a>
											</div>
										</div>
									</div>
								</div>
								<div className="lists__simple fb20 column">
									<div className="lists__simple__container">
										<div className="lists__simple__container__title">
											<span className="titles__offer-product-title l">Коллекции</span>
										</div>
										<div className="lists__simple__container__content">
											<div className="lists__simple__container__content__item">
												<a href="#" className="titles__list-item s a">Шарф lorem</a>
											</div>
											<div className="lists__simple__container__content__item">
												<a href="#" className="titles__list-item s a">Шарф lorem</a>
											</div>
											<div className="lists__simple__container__content__item">
												<a href="#" className="titles__list-item s a">Шарф lorem</a>
											</div>
											<div className="lists__simple__container__content__item">
												<a href="#" className="titles__list-item s a">Шарф lorem</a>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="greed-head__navigation__item">
						<a href="#">Мужчинам</a>
					</div>
					<div className="greed-head__navigation__item">
						<a href="#">Детям</a>
					</div>
					<div className="greed-head__navigation__item">
						<a href="#">Зонты</a>
					</div>
					<div className="greed-head__navigation__item">
						<a href="#">Акции</a>
					</div>
					<div className="greed-head__navigation__item">
						<a href="#">Инофрмация</a>
					</div>
				</div>
				<div className="greed-head__navigation__delim"></div>
				<div className="greed-head__navigation__nav-block__container__cart">
					<div className="cart__top-menu">
						<div className="cart__top-menu__container">
							<span className="cart__top-menu__container__icon"></span>
							<span className="cart__top-menu__container__value">Ваша корзина</span>
							<span className="cart__top-menu__container__status">пустая</span>
						</div>
					</div>
					<div className="greed-head__navigation__float-cart-block">
						<div className="greed-head__navigation__float-cart-block__container">
							<div className="greed-head__navigation__float-cart-block__cart-block">
								<div className="cart__popup__product-card">
									<div className="cart__popup__product-card__image">
										<img src="images/scarf-3.jpg" />
									</div>
									<div className="cart__popup__product-card__text">
										<div className="titles__offer-product-title m nomargin">Паланти кашемир</div>
										<div className="titles__offer-pricing-count bold">
											<div className="titles__offer-pricing-count__count">2</div>
											<div className="titles__offer-pricing-count__value">140</div>
										</div>
									</div>
									<div className="cart__popup__product-card__button">
										<a href="#" className="buttons__delete-button"></a>
									</div>
								</div>
							</div>
							<div className="greed-head__navigation__float-cart-block__cart-block">
								<div className="cart__popup__product-card">
									<div className="cart__popup__product-card__image">
										<img src="images/scarf-3.jpg" />
									</div>
									<div className="cart__popup__product-card__text">
										<div className="titles__offer-product-title m nomargin">Паланти кашемир</div>
										<div className="titles__offer-pricing-count bold">
											<div className="titles__offer-pricing-count__count">2</div>
											<div className="titles__offer-pricing-count__value">140</div>
										</div>
									</div>
									<div className="cart__popup__product-card__button">
										<a href="#" className="buttons__delete-button"></a>
									</div>
								</div>
							</div>
							<div className="greed-head__navigation__float-cart-block__cart-block" id="block1">
								<div className="cart__popup__product-card">
									<div className="cart__popup__product-card__image">
										<img src="images/scarf-3.jpg" />
									</div>
									<div className="cart__popup__product-card__text">
										<div className="titles__offer-product-title m nomargin">Паланти кашемир</div>
										<div className="titles__offer-pricing-count bold">
											<div className="titles__offer-pricing-count__count">2</div>
											<div className="titles__offer-pricing-count__value">140</div>
										</div>
									</div>
									<div className="cart__popup__product-card__button">
										<a href="#" className="buttons__delete-button"></a>
									</div>
								</div>
							</div>
							<div className="mobile__cart__bottom-section" id="float-cart__bottom-section">
								<div className="mobile__cart__bottom-section__subtotal">
									<div className="titles__offer-product-title xl nomargin">Подитог:</div>
								</div>
								<div className="mobile__cart__bottom-section__value">
									<div className="titles__offer-pricing bold xl">
										<div className="titles__offer-pricing__value">280</div>
									</div>
								</div>
								<div className="mobile__cart__bottom-section__button">
									<a href="#" className="buttons__cummon-button">Расчитать</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
    )
}

const MainMenuNavigation = (props) => {
    return(
        <div className="main-menu-navigation">
            {
                props.items &&
                props.items.map((item, index) =>
                    <span
                        className="main-menu-navigation__item"
                        key={index}
                        >{item}</span>
                )
            }
        </div>
    )
}
MainMenuNavigation.defaultProps = {
    items: ["Женщинам", "Мужчинам", "Детям", "Зонты", "Акции", "Информация"],
}


const MainMenuNavigationCart = (props) => {
    let first = "";
    let last = "";

    if(props.count == 0) {
        first = "Ваша корзина";
        last = "пустая";
    } else {
        last = "в корзине";

        switch(props.count % 10) {
            case 0:
            case 5:
            case 6: 
            case 7:
            case 8:
            case 9: first = "товаров"; break;
            case 2:
            case 3:
            case 4: first = "товара"; break;
            case 1: first = "товар"; break;
        }

        if(props.count % 100 > 4 && props.count % 100 < 21) {
            first = "товаров";
        }
    }

    return(
        <div className="main-menu-navigation-cart">
            <CartIcon
                width={20}
                height={20}/>
            <span
                style={{
                    paddingLeft: 5,
                }}>
                {
                    props.count > 0
                    ? `${props.count} ${first}`
                    : first
                }
            </span>
            <span className="main-menu-navigation-cart__sub-title">
                &nbsp;{last}
            </span>
        </div>
    )
}
MainMenuNavigationCart.defaultProps = {
    count: 0,
}

export default (props) => {
    return(
        <Row className="main-menu">
            <Container>
                <Col className="main-menu-container">
                    <div className="main-menu-container__navigation">
                        <MainMenuNavigation />
                    </div>
					<div className="main-menu-container__delim"></div>
                    <div className="main-menu-container__cart">
                        <MainMenuNavigationCart />
                    </div>
                </Col>
            </Container>
        </Row>
    )
}