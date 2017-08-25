import React from 'react';

import './cart__header-navigation.less';

import FlatButton from 'material-ui/FlatButton';

import Cart__ProductSection from './Cart__ProductSection.jsx';
import Utitlity__SelectBox from '../utility/Utility__SelectBox.jsx';
import Utility__AutocompleteBox from '../utility/Utility__AutocompleteBox.jsx';
import Utility__RaitingBox from '../utility/Utility__RaitingBox.jsx';
import Review from '../review/Review.jsx';
import ReviewAndOtherSection from '../review/ReviewAndOtherSection.jsx';
import ProductCard from '../catalog/ProductCard.jsx';
import CatalogGrid from '../catalog/CatalogGrid.jsx';
import Mobile__HeaderNavigation from '../navigation/Mobile__HeaderNavigation.jsx';
import OfferGrid from '../other/Offer.jsx';
import RecenlyViewed__Shell from '../catalog/RecenlyViewed.jsx';
import {RecenlyViewedBlock, ProductBlock} from '../catalog/RecenlyViewed.jsx';
// import Footer from '../navigation/Footer.jsx';


class CartHeaderNavigation extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            navTitles: [ "Корзина заказов", "Доставка", "Способ оплаты" ],
            step: 0,
            items: [],
        }

        this.renderState = [
            { s1: "active active--state-1", s2: "state-1", s3: "", s4: "", s5: "" },
            { s1: "complete", s2: "state-2", s3: "active active--state-2", s4: "state-3", s5: "" },
            { s1: "complete", s2: "", s3: "complete", s4: "state-4", s5: "active active--state-3" }
        ];

        this.handleClick = this.handleClick.bind(this);
        this.handleClick1 = this.handleClick1.bind(this);

        this.reviewsData = [
            {
                id: 1,
                title: "Первый",
                user: {
                    name: "Михаил Силантьев",
                    avatar: "https://avatars0.githubusercontent.com/u/18670623?v=3&s=460",
                },
                rating: 4,
                useful: {
                    yes: 2,
                    no: 10,
                },
                content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim cupiditate deserunt ea. Eaque, excepturi corporis in hic suscipit autem, unde est dolor odit cupiditate ipsa eius amet alias velit. Autem.",
                date: "01.07.2017",
            },
            {
                id: 1,
                title: "Первый",
                user: {
                    name: "Михаил Силантьев",
                    avatar: "https://its-possible.ru/stars/symmetry/01anne-hathaway.jpg",
                },
                rating: 4,
                useful: {
                    yes: 4,
                    no: 10,
                },
                content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim cupiditate deserunt ea. Eaque, excepturi corporis in hic suscipit autem, unde est dolor odit cupiditate ipsa eius amet alias velit. Autem.",
                date: "01.07.2017",
            },
            {
                id: 1,
                title: "Первый",
                user: {
                    name: "Михаил Силантьев",
                    avatar: "http://helpster.ru/pic/beauty/pic/64126/com/1737956.jpg",
                },
                rating: 4,
                useful: {
                    yes: 2,
                    no: 2,
                },
                content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim cupiditate deserunt ea. Eaque, excepturi corporis in hic suscipit autem, unde est dolor odit cupiditate ipsa eius amet alias velit. Autem.",
                date: "01.07.2017",
            },
            {
                id: 1,
                title: "Первый",
                user: {
                    name: "Михаил Силантьев",
                    avatar: "http://www.fresher.ru/manager_content/02-2016/kak-by-vyglyadeli-zvyozdy-gollivuda-esli-by-ix-lica-byli-simmetrichnymi/20.jpg",
                },
                rating: 4,
                useful: {
                    yes: 2,
                    no: 11,
                },
                content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim cupiditate deserunt ea. Eaque, excepturi corporis in hic suscipit autem, unde est dolor odit cupiditate ipsa eius amet alias velit. Autem.",
                date: "01.07.2017",
            },
            {
                id: 1,
                title: "Первый",
                user: {
                    name: "Михаил Силантьев",
                    avatar: "https://images4.cosmopolitan.ru/upload/img_cache/f2f/f2f5ec08823253c5035e2637a9780e8c_fitted_740x700.jpg",
                },
                rating: 4,
                useful: {
                    yes: 2,
                    no: 10,
                },
                content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim cupiditate deserunt ea. Eaque, excepturi corporis in hic suscipit autem, unde est dolor odit cupiditate ipsa eius amet alias velit. Autem.",
                date: "01.07.2017",
            },
            {
                id: 1,
                title: "Первый",
                user: {
                    name: "Михаил Силантьев",
                    avatar: "http://www.kotilda.ru/uploads/pics/032.jpg",
                },
                rating: 4,
                useful: {
                    yes: 2,
                    no: 10,
                },
                content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim cupiditate deserunt ea. Eaque, excepturi corporis in hic suscipit autem, unde est dolor odit cupiditate ipsa eius amet alias velit. Autem.",
                date: "01.07.2017",
            },
            {
                id: 1,
                title: "Первый",
                user: {
                    name: "Михаил Силантьев",
                    avatar: "http://www.infoniac.ru/upload/iblock/348/34893da6e6cea19df2e31dd9b42fba66.jpg",
                },
                rating: 4,
                useful: {
                    yes: 2,
                    no: 10,
                },
                content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim cupiditate deserunt ea. Eaque, excepturi corporis in hic suscipit autem, unde est dolor odit cupiditate ipsa eius amet alias velit. Autem.",
                date: "01.07.2017",
            },
            {
                id: 1,
                title: "Первый",
                user: {
                    name: "Михаил Силантьев",
                    avatar: "http://img-fotki.yandex.ru/get/3414/smartmen-ru.0/0_91e6_dad5e211_L.jpg",
                },
                rating: 4,
                useful: {
                    yes: 2,
                    no: 10,
                },
                content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim cupiditate deserunt ea. Eaque, excepturi corporis in hic suscipit autem, unde est dolor odit cupiditate ipsa eius amet alias velit. Autem.",
                date: "01.07.2017",
            }
        ];
	}

    handleClick() {
        let { step } = this.state;
        if(step < 2)
            this.setState({ step: step + 1 });
        else 
            this.setState({ step: 0 });
    }

    handleClick1() {
        // console.log(this.child.validate());
        // console.log(this.child1.validate());
        let a = [];
        let t = this.getRandomArbitrary(0, 12);
        for(let i = 0; i < t; i++) {
            a = [...a, ""];
        }

        console.log(a, t);

        this.setState({items: a});
    }

    getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }

    render() {

        let state = this.state;
        let render = this.renderState[state.step];

        return (
            <div>
                <div className="cart__header-navigation">
                    <div className={`cart__header-navigation__navigation-item ${render.s1}`} data-index="1">
                        {state.navTitles[0]}
                    </div>
                    <div className={`cart__header-navigation__navigation-item__delim ${render.s2}`}></div>
                    <div className={`cart__header-navigation__navigation-item ${render.s3}`} data-index="2">
                        {state.navTitles[1]}
                    </div>
                    <div className={`cart__header-navigation__navigation-item__delim ${render.s4}`}></div>
                    <div className={`cart__header-navigation__navigation-item ${render.s5}`} data-index="3">
                        {state.navTitles[2]}
                    </div>
                </div>

                <FlatButton label="Secondary" secondary={true} onTouchTap={this.handleClick}/>

                <div>
                    <Cart__ProductSection />
                </div>

                {/*<Mobile__HeaderNavigation />*/}
                {/* <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt dolor, delectus nesciunt impedit. Commodi eligendi voluptate nulla nobis numquam dignissimos reiciendis quaerat, possimus perspiciatis dolores sunt at consectetur quia beatae!
                </p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt dolor, delectus nesciunt impedit. Commodi eligendi voluptate nulla nobis numquam dignissimos reiciendis quaerat, possimus perspiciatis dolores sunt at consectetur quia beatae!
                </p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt dolor, delectus nesciunt impedit. Commodi eligendi voluptate nulla nobis numquam dignissimos reiciendis quaerat, possimus perspiciatis dolores sunt at consectetur quia beatae!
                </p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt dolor, delectus nesciunt impedit. Commodi eligendi voluptate nulla nobis numquam dignissimos reiciendis quaerat, possimus perspiciatis dolores sunt at consectetur quia beatae!
                </p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt dolor, delectus nesciunt impedit. Commodi eligendi voluptate nulla nobis numquam dignissimos reiciendis quaerat, possimus perspiciatis dolores sunt at consectetur quia beatae!
                </p> */}

                {/* <RecenlyViewed__Shell /> */}
                {/* <ProductBlock />

                <div>
                    <ProductCard />
                </div> */}

                <RecenlyViewedBlock />

                <OfferGrid />

                {/* <Footer /> */}

                {/*<div>
                    <FlatButton label="Secondary" secondary={true} onTouchTap={this.handleClick1}/>
                    <CatalogGrid items={this.state.items} />
                </div>

                <div>
                    <ProductCard />
                </div>

                <div>
                    <ReviewAndOtherSection reviewsData={this.reviewsData}/>
                </div>

                <div>
                    <Utility__RaitingBox currentValue={2.5}/>
                </div>

                <div style={{border: "1px solid #ccc", background: "#fefefe"}}>
                    <Review />
                </div>

                <div>
                    <FlatButton label="Validate" secondary={true} onTouchTap={this.handleClick1}/>
                </div>

                <div>
                    <Utility__AutocompleteBox 
                        defaultSection={"Недавние значения"}
                        defaultOptions={["Новосибирск", "Кемерово", "Омск"]}
                        options={["новосибирск", "москва", "новоросийск", "морянка"]}
                        errorTitle="Город не выбран"
                        sectionTitle="Выбор города"
                        doValidate={ref => (this.child = ref)} />
                </div>

                <div>
                    <Utitlity__SelectBox 
                        options={["Новосибирск","Москва","Санкт-Петербург", "Красноярск","Сочи"]}
                        selectedId={0}
                        placeholderTitle="Выберите город"
                        sectionTitle="Выбор города"
                        errorTitle="Город не выбран"
                        noElementsTitle="Нет элементов"
                        doValidate={ref => (this.child1 = ref)} />
                </div>*/}

            </div>
        );

    }
}

export default CartHeaderNavigation;