import React from 'react';

import './mobile__header-navigation.less';

import Utility__ImageContainer  from '../utility/Utility__ImageContainer.jsx'; 
import Utility__Currency        from '../utility/Utility__Currency.jsx';
import IconButton               from 'material-ui/IconButton';
import Cancel                   from 'material-ui/svg-icons/navigation/cancel';
import ExpandLess               from 'material-ui/svg-icons/navigation/expand-less';
import RaisedButton             from 'material-ui/RaisedButton';
import {green}                  from '../basic/SRaisedButton.js';


import menuDataJSON from '../../develop/menuMap.json';

const MenuSubMenu = (props) => {
    const estimateContainerMaxHeight = props.items.length * 60;
    return(
        <div 
            className="mobile__nav__menu-list__sub-container" 
            style={{maxHeight: props.isOpen ? estimateContainerMaxHeight : 0, opacity: props.isOpen ? 1 : 0}}>
            {
                props.items.map((value, index) => 
                    <MenuItem 
                        key={index}
                        itemStyle={{paddingLeft: 40}}
                        isActive={props.selectedIndex == index} 
                        title={value.title} 
                        onItemClick={()=>{props.onItemClick(index)}} />
                ) 
            }
        </div>
    );
}
MenuSubMenu.defaultProps = {
    items: [],
    isOpen: false,
    selectedIndex: -1,
    onItemClick: () => {}
}

const MenuItem = (props) => {
    return(
        <div className={`mobile__nav__menu-list__item  ${props.isActive && "mobile__nav__menu-list__item--active"} ${props.isOpen && "mobile__nav__menu-list__item--open"}`}>
            {
                props.children && 
                <div className="mobile__nav__menu-list__item__icon">
                    <ExpandLess
                        style={{
                            transform: `rotate3d(0, 0, 1, ${props.isOpen ? 180 : 0}deg)`,
                            color: `rgba(255, 255, 255, ${props.isOpen ? 0.95 : 0.5})`,
                        }}/>
                </div>
            }
            <span
                className="mobile__nav__button"
                style={props.itemStyle}
                onClick={props.onItemClick}
                >{props.title}</span>
            {props.children}            
        </div>
    );
}
MenuItem.defaultProps = {
    isActive: false,
    isOpen: false,
    title: "",
    itemStyle: {},
    onItemClick: () => {}
}

const Menu = (props) => {
    return(
        <div className="mobile__nav__menu-list">
            <div className="mobile__nav__menu-list__container">
                {
                    props.menuData.data.map((value, index) =>
                        <MenuItem 
                            key={index}
                            isActive={props.menuData.selectedIndex == index}
                            isOpen={props.menuData.openIndex == index}
                            title={value.title} 
                            onItemClick={()=>{props.menuData.onItemClick(index)}}>
                            {
                                value.list.length > 0 &&
                                <MenuSubMenu 
                                    items={value.list}
                                    isOpen={props.menuData.openIndex == index}
                                    selectedIndex={(props.menuData.selectedIndex == index) ? props.menuData.selectedSubIndex : -1} 
                                    onItemClick={(subIndex) => {props.menuData.onSubItemClick(index, subIndex)}} />
                            }
                        </MenuItem>
                    )
                }
            </div>
        </div>
    );
}
Menu.defaultProps = {
    menuData: {
        data: [],
        openIndex: -1,
        selectedIndex: -1,
        selectedSubIndex: -1,
        onItemClick: () => {},
        onSubItemClick: () => {},
    }
}

// Utility components --------------------------------------
const HamburgerIconButton = (props) => {
    return(
        <div 
            className={`mobile__hamburger-button ${props.toggle && "mobile__hamburger-button--active"}`}
            onClick={props.onButtonClick} >
                <span></span>
                <span></span>
                <span></span>
        </div>
    )
}
HamburgerIconButton.defaultProps = {
    toggle: false,
    onButtonClick: () => {},
}

const ShiftTitle = (props) => {
    return(
        <div className="mobile-nav-shift-container">
            {
                props.children &&
                props.children.map((value, index) => 
                    <div 
                        className="mobile-nav-shift-container__item" 
                        style={{ transform: `translate3d(0px, ${(index - props.index) * 100}%, 0px)` }} 
                        key={index}
                        >{value}</div>
                )
            }
        </div>
    )
}
ShiftTitle.defaultProps = {
    index: 0,
}

const CartIconButton = (props) => {
    return(
        <div className={`mobile-nav-cart-button ${props.toggle && "mobile-nav-cart-button--toggle"}`} onClick={props.onClick}>
            <div className="mobile-nav-cart-button__icon"></div>
            {
                props.bageValue > 0 &&
                <span className="mobile-nav-cart-button__bage">{props.bageValue}</span>
            }
        </div>
    )
}
CartIconButton.defaultProps = {
    bageValue: 0,
    toggle: false,
    onClick: () => {},
}

// Cart components ------------------------------------------
const CartCheckout = (props) => {
    return(
        <div className="mobile-cart-checkout">
            <div className="mobile-cart-checkout__subtotal">
                <span>{`${props.label}:`}</span>
                <Utility__Currency value={props.subTotal} accent size={"medium"}/>
            </div>
            <RaisedButton label={props.buttonLabel} {...green} />
        </div>
    )
}
CartCheckout.defaultProps = {
    subTotal: 23054,
    buttonLabel: "Расчитать",
    label: "Подитог",
}

const CartProductCardDescription = (props) => {
    return(
        <div className="mobile-cart-product-card-description">
            <span>{props.title}</span>
            <div className="mobile-cart-product-card-description__quantity-price">
                <span>{props.quantity}</span>
                <span style={{color: "#ccc", margin: "0px 5px"}}>&#215;</span>
                <span>{props.cost}</span>
            </div>
        </div>
    )
}
CartProductCardDescription.defaultProps = {
    title: "",
    quantity: 0,
    cost: 0,
}

const CartProductCard = (props) => {
    return(
        <div className="mobile-cart-product-card">
            <div className="mobile-cart-product-card__image">
                <Utility__ImageContainer />
            </div>
            <div className="mobile-cart-product-card__middle">
                <CartProductCardDescription
                    title={props.title}
                    quantity={props.quantity}
                    cost={props.cost}/>
            </div>
            <div className="mobile-cart-product-card__price">
                <Utility__Currency 
                    value={props.totalCost} 
                    accent /> 
            </div>
        </div>
    )
}
CartProductCard.defaultProps = {
    title: "",
    quantity: 0,
    cost: 0,
    totalCost: 0,
}

const CartItem = (props) => {
    return (
        <div className={`mobile-cart-item ${props.isHide && "mobile-cart-item--toggle"}`} onTransitionEnd={props.onHideTransitionEnd}>
            <div className="mobile-cart-item__container">
                <div 
                    className="mobile-cart-item__container__card" 
                    style={{transform: `translate3d(-${props.swipeOffset}px, 0px, 0px)`}}
                    onTransitionEnd={props.onDeleteTransitionEnd}>
                        <div 
                            className="mobile-cart-product-card" 
                            onTouchStart={props.onTouchStart}
                            onTouchEnd={props.onTouchEnd}
                            onTouchMove={props.onTouchMove}>
                                <CartProductCard
                                    title={props.title}
                                    quantity={props.quantity}
                                    cost={props.cost}
                                    totalCost={props.totalCost}/>
                        </div>
                        <div className="mobile-cart-item__container__delete">
                            <IconButton iconStyle={{color: "#fff"}} onClick={props.onItemDelete}>
                                <Cancel />
                            </IconButton>
                        </div>
                </div>
            </div>
        </div>
    )
}
CartItem.defaultProps = {
    title: "Шарф-хомут палантин",
    quantity: 3,
    cost: 900,
    totalCost: 2700,
    isHide: false,
    onItemDelete: () => {},
    swipeOffset: 0,
    onTouchStart: () => {},
    onTouchEnd: () => {},
    onTouchMove: () => {},
    onDeleteTransitionEnd: () => {},
    onHideTransitionEnd: () => {},
}

const CartItemGrid = (props) => {
    return(
        <div className="mobile-cart-item-grid">
            {
                props.items.map((value, index) => 
                    <div key={value.id} className="mobile-cart-item-grid__item">
                        <CartItem__Shell 
                            isHide={false}
                            itemData={value}
                            onItemRemove={() => {props.onItemRemove(value);}} />
                    </div>
                )
            }
        </div>
    )
}
CartItemGrid.defaultProps = {
    items: [],
    onItemRemove: () => {},
}

class CartItem__Shell extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            touchStartX: 0,
            baseOffset: 0,
            swipeOffset: 0,
            isHide: props.isHide,
            itemData: props.itemData
        }

        this.onItemRemove = props.onItemRemove;

        this.handleTouchStart = this.handleTouchStart.bind(this);
        this.handleTouchMove = this.handleTouchMove.bind(this);
        this.handleTouchEnd = this.handleTouchEnd.bind(this);
        this.handleRemoveItem = this.handleRemoveItem.bind(this);
        this.handleRemoveTransitionEnd = this.handleRemoveTransitionEnd.bind(this);
        this.handleHideTransitionEnd = this.handleHideTransitionEnd.bind(this);
    }

    handleTouchStart(event) {
        this.state.touchStartX = event.touches[0].pageX;
    }

    handleTouchMove(event) {
        const {pageX} = event.touches[0];
        const {baseOffset} = this.state;
        const distance = this.state.touchStartX - pageX;
        const offset = distance + baseOffset;

        this.setState({swipeOffset: offset > 50 ? 50 : Math.max(0, offset)});
    }

    handleTouchEnd(event) {
        this.setState({
            swipeOffset: this.state.swipeOffset > 25 ? 50 : 0
        }, () => this.state.baseOffset = this.state.swipeOffset);
    }

    handleRemoveItem() {
        this.setState({swipeOffset: 0}, () => {
            this.state.isHide = true;
        });
    }

    handleRemoveTransitionEnd(event) {
        if(this.state.isHide) {
            this.forceUpdate();
        }
    }

    handleHideTransitionEnd(event) {
        if(event.propertyName === 'padding-top') {
            this.onItemRemove();
        }
    }

    render() {
        const {swipeOffset, isHide} = this.state;
        return <CartItem
                    title={this.state.itemData.title}
                    onTouchStart={this.handleTouchStart}
                    onTouchMove={this.handleTouchMove}
                    onTouchEnd={this.handleTouchEnd}
                    swipeOffset={swipeOffset}
                    isHide={isHide}
                    onItemDelete={this.handleRemoveItem}
                    onDeleteTransitionEnd={this.handleRemoveTransitionEnd}
                    onHideTransitionEnd={this.handleHideTransitionEnd}/>
    }
}
CartItem__Shell.defaultProps = {
    onItemRemove: () => {},
    isHide: false,
    itemData: {},
}

// Navigation components ------------------------------------
const LeftMenu = (props) => {
    return(
        <div 
            className={`greed-head__navigation-mobile__container__left-menu ${props.toggle && "greed-head__navigation-mobile__container__left-menu--active"}`}
            onTransitionEnd={props.onTransitionEnd}>
            <Menu menuData={props.menuData}/>
        </div>
    );
}
LeftMenu.defaultProps = {
    toggle: false,
    onTransitionEnd: () => {},
    menuData: {
        data: [],
        openIndex: -1,
        selectedIndex: -1,
        selectedSubIndex: -1,
        onItemClick: () => {},
        onSubItemClick: () => {},
    }
}

const MiddleMenu = (props) => {
    return(
        <div 
            className={`mobile-nav-middle-menu ${props.toggle && "mobile-nav-middle-menu--toggle"}`}
            onTransitionEnd={props.onTransitionEnd}>
            <Menu menuData={props.menuData}/>
        </div>
    )
}
MiddleMenu.defaultProps = {
    menuData: [],
    toggle: false,
    onTransitionEnd: () => {},
}

const Cart = (props) => {
    return(
        <div 
            className={`mobile-cart ${props.toggle && "mobile-cart--toggle"}`}
            onTransitionEnd={props.onTransitionEnd}>
            <CartItemGrid items={props.items} onItemRemove={props.onItemRemove} />
            <CartCheckout />
        </div>
    )
}
Cart.defaultProps = {
    items: [],
    onItemRemove: () => {},
    toggle: false,
    onTransitionEnd: () => {},
}

const Header = (props) => {
    return(
        <div className="mobile-nav-header">
            <div className="mobile-nav-header__hamburger">
                <HamburgerIconButton 
                    toggle={props.leftToggle} 
                    onButtonClick={props.onLeftToggle} />
            </div>
            <div className="mobile-nav-header__middle" onClick={props.onMidlToggle}>
                <ShiftTitle index={props.shiftIndex}>
                    {
                        props.shiftItems.map((value, index) => 
                            <span key={index}>{value}</span>
                        )
                    }
                </ShiftTitle>
            </div>
            <div className={`mobile-nav-header__cart ${props.cartToggle && "mobile-nav-header__cart--toggle"}`}>
                <CartIconButton 
                    bageValue={props.cartBageValue} 
                    toggle={props.cartToggle} 
                    onClick={props.onCartToggle} />
            </div>
        </div>
    )
}
Header.defaultProps = {
    shiftItems: [],
    shiftIndex: 0,
    leftToggle: false,
    cartBageValue: 3,
    cartToggle: false,
    onLeftToggle: () => {},
    onMidlToggle: () => {},
    onCartToggle: () => {},
}

// Export class ---------------------------------------------
export default class Mobile__HeaderNavigation extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {

            shiftItems: ["Категория", "Scarfinity"],
            shiftIndex: 0,

            leftMenuSelectedIndex: 0,
            middleMenuOpenIndex: 0,
            middleMenuSelectedIndex: 0,
            middleMenuSelectedSubIndex: 0,

            leftMenuToggle: false,
            middleMenuToggle: false,
            cartMenuToggle: false,
            isNeedToForce: false,
            cartItems: [{id: 1, title: "scarf1"}, {id: 2, title: "scarf2"} ,{id: 3, title: "scarf3"} ,{id: 4, title: "scarf4"}],
        }

        this.handleLeftMenuItemClick = this.handleLeftMenuItemClick.bind(this);
        this.handleMiddleMenuItemClick = this.handleMiddleMenuItemClick.bind(this);
        this.handleMiddleMenuSubItemClick = this.handleMiddleMenuSubItemClick.bind(this);

        this.handleLeftToggle = this.handleLeftToggle.bind(this);
        this.handleCartToggle = this.handleCartToggle.bind(this);
        this.handleMiddleToggle = this.handleMiddleToggle.bind(this);

        this.handleTransitionEnd = this.handleTransitionEnd.bind(this);

        this.handleCartItemRemove = this.handleCartItemRemove.bind(this);

	}

    handleCartItemRemove(index) {
        console.log("here", index);
        const {cartItems} = this.state;
        cartItems.splice(cartItems.indexOf(index), 1);
        this.setState({cartItems: cartItems});
    }


    handleLeftMenuItemClick(index) {
        this.setState({leftMenuSelectedIndex: index});
    }

    handleMiddleMenuItemClick(index) {
        this.setState({middleMenuOpenIndex: index != this.state.middleMenuOpenIndex ? index : -1});
    }

    handleMiddleMenuSubItemClick(index, subIndex) {
        this.setState({middleMenuSelectedIndex: index, middleMenuSelectedSubIndex: subIndex});
    }

    handleLeftToggle() {
        const {leftMenuToggle, middleMenuToggle, cartMenuToggle} = this.state;

        if(leftMenuToggle) {
            this.setState({leftMenuToggle: false, shiftIndex: 0});
        } else {
            if(!middleMenuToggle && !cartMenuToggle) {
                this.setState({leftMenuToggle: true, shiftIndex: 1});
            } else {
                this.setState({cartMenuToggle: false, middleMenuToggle: false},
                () => {
                    this.state.leftMenuToggle = true;
                    this.state.shiftIndex = 1;
                    this.state.isNeedToForce = true;
                });
            }
        }
    }

    handleMiddleToggle() {
        const {leftMenuToggle, middleMenuToggle, cartMenuToggle} = this.state;
        
        if(middleMenuToggle) {
            this.setState({middleMenuToggle: false});
        } else {
            if(!leftMenuToggle && !cartMenuToggle) {
                this.setState({middleMenuToggle: true});
            } else {
                this.setState({leftMenuToggle: false, cartMenuToggle: false},
                () => {
                    this.state.middleMenuToggle = true;
                    this.state.isNeedToForce = true;
                });
            }
        }
    }

    handleCartToggle() {
        const {leftMenuToggle, middleMenuToggle, cartMenuToggle} = this.state;
        
        if(cartMenuToggle) {
            this.setState({cartMenuToggle: false});
        } else {
            if(!leftMenuToggle && !middleMenuToggle) {
                this.setState({cartMenuToggle: true});
            } else {
                this.setState({leftMenuToggle: false, middleMenuToggle: false},
                () => {
                    this.state.cartMenuToggle = true;
                    this.state.isNeedToForce = true;
                });
            }
        }
    }

    handleTransitionEnd() {
        if(this.state.isNeedToForce) {
            this.forceUpdate(() => {
                this.state.isNeedToForce = false;
            });
        }
    }

    render() {
        const letfMenuData = {
            data: getMainMenu(),
            selectedIndex: this.state.leftMenuSelectedIndex,
            selectedSubIndex: this.state.leftMenuSelectedSubIndex,
            onItemClick: this.handleLeftMenuItemClick,
            onSubItemClick: this.handleLeftMenuSubItemClick,
        }

         const middleMenuData = {
            data: getSubMenu(this.state.leftMenuSelectedIndex),
            openIndex: this.state.middleMenuOpenIndex,
            selectedIndex: this.state.middleMenuSelectedIndex,
            selectedSubIndex: this.state.middleMenuSelectedSubIndex,
            onItemClick: this.handleMiddleMenuItemClick,
            onSubItemClick: this.handleMiddleMenuSubItemClick,
        }

        return(
            <section className="mobile-nav">
                <Header
                    shiftItems={this.state.shiftItems}
                    shiftIndex={this.state.shiftIndex}
                    cartBageValue={this.state.cartItems.length}
                    leftToggle={this.state.leftMenuToggle}
                    cartToggle={this.state.cartMenuToggle}
                    onLeftToggle={this.handleLeftToggle}
                    onMidlToggle={this.handleMiddleToggle}
                    onCartToggle={this.handleCartToggle}/>
                <div className="mobile-nav__content">
                    <LeftMenu
                        menuData={letfMenuData}
                        toggle={this.state.leftMenuToggle}
                        onTransitionEnd={this.handleTransitionEnd}/>
                    <MiddleMenu 
                        menuData={middleMenuData}
                        toggle={this.state.middleMenuToggle}
                        onTransitionEnd={this.handleTransitionEnd} />
                    <Cart
                        items={this.state.cartItems}
                        onItemRemove={this.handleCartItemRemove} 
                        toggle={this.state.cartMenuToggle}
                        onTransitionEnd={this.handleTransitionEnd}/>
                </div>
            </section>
        );
    }
}

const getMainMenu = () => {
    return(menuDataJSON.items.map((value) => ({
        title: value.title,
        list: [],
    })))
}

const getSubMenu = (index) => {
    const makeSubMenu = (array) => {
        if(typeof(array) !== 'undefined' && array.length > 0) {
            return array.map((value) => ({
                title: value.title,
                list: makeSubMenu(value.items)
            }));
        }

        return [];
    }

    return makeSubMenu(menuDataJSON.items[index].items);
}