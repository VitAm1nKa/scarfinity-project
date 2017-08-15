import React from 'react';

import './banner.less';

import FiberManualRecord    from 'material-ui/svg-icons/av/fiber-manual-record';
import ArrowForward         from 'material-ui/svg-icons/navigation/arrow-forward';
import ChevronLeft          from 'material-ui/svg-icons/navigation/chevron-left';
import ChevronRight         from 'material-ui/svg-icons/navigation/chevron-right';
import Paper                from 'material-ui/Paper';

let bannerWebWorker = new Worker('./bannerWebWorker.js');

var iconStyle = {
    circle: {
        width: 10,
        height: 10,
        flex: '0 0 20px',
    },
    arrow: {
        width: 16,
        height: 16,
        flex: '0 0 20px',
    },
    pagination: {
        width: 24,
        height: 24,
    }
    
}

var slideBarItem = [
    { color: "#bf4f79" },
    { color: "#ef8742" },
    { color: "#9cbf3e" },
    { color: "#2799c9" },
]

// Scale bar -------------------------------------------
class ScaleBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            scaleWidth: 0,
            backgroundPosiotion: 0,
            first: props.first,
        }

        this.onResize = this.onResize.bind(this);
    }

    componentWillMount() {
        window.addEventListener('resize', this.onResize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.onResize);
    }

    componentDidMount() {
        this.calculateWidth(this.container.offsetWidth);
    }

    onResize(e) {
        this.calculateWidth(this.container.offsetWidth);
    }

    calculateWidth(containerWidth) {
        const width = Math.floor((containerWidth - 10) / 5) * 5;
        const cWidth = width - (width % 10) + 1;
        this.setState({
            scaleWidth: width + 1,
            backgroundPosiotion: (containerWidth - width) / 2,
        });
    }

    render() {
        return(
            <div
                className={"banner-scale-item"}
                ref={cont => this.container = cont}
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    backgroundPosition: `-${this.state.first ? 2 : 0}px 0px`,
                }}>
                <div
                    className={"banner-scale-item__scale"}
                    style={{
                        height: 20,
                        width: this.state.scaleWidth,
                        backgroundPosition: `0px 0px`,
                    }}></div>
            </div>
        )
    }
}
ScaleBar.defaultProps = {
    first: false,
}

const ScaleBarContainer = (props) => {
    return(
        <div className="banner-scale-container">
            {
                Array.apply(null, Array(props.count)).map((item, index) =>
                    <ScaleBar
                        key={index}
                        first={index == 0} />
                )
            }
        </div>
    )
}
ScaleBarContainer.defaultProps = {
    count: 4,
}
// -----------------------------------------------------

const BannerItem = (props) => {
    let state = "";
    if(props.preFocus) state = "banner-item-simple__content--pre-focus";
    if(props.active) state = "";
    if(props.afterFocus) state = "banner-item-simple__content--after-focus";
    return(
        <div className="banner-item-simple">
            <div className={`banner-item-simple__content ${state}`}>
                <span className="banner-item-simple__content__primary">{props.primary}</span>
                <span className="banner-item-simple__content__secondary">{props.secondary}</span>
                <span className="banner-item-simple__content__subtitle">{props.subtitle}</span>
                <div className="banner-item-simple__content__button">
                    <button className="banner-button banner-button--third">
                        <span className="banner-button__text">{props.buttonTitle}</span>
                    </button>
                </div>
            </div>
            <div className="banner-item-simple__image">
                
            </div>
        </div>
    )
}
BannerItem.defaultProps = {
    primary: "Harder, Better,",
    secondary: "Faster, stronger.",
    subtitle: "Why, sometimes I've believed as many as six impossible things before breakfast.",
    buttonTitle: "Купить",
    preFocus: true,
    active: false,
    afterFocus: false,
}

const BannerMenuItem = (props) => {
    const indexString = `0${props.index + 1}`;
    return(
        <div
            className="banner-menu-item"
            data-index={indexString}>
                <div className={`banner-menu-item__title banner-menu-item__title--style${indexString} ${props.active ? `banner-menu-item__title--active${indexString}` : ""}`}>
                    {
                        props.active
                        ? <ArrowForward style={iconStyle.arrow} />
                        : <FiberManualRecord style={iconStyle.circle} />
                    }
                    <span className="banner-menu-item__title__text">{props.title}</span>
                </div>
                <span className="banner-menu-item__subtitle">{props.subtitle}</span>
        </div>
    )
}
BannerMenuItem.defaultProps = {
    title: "",
    subtitle: "",
    index: 0,
    active: false,
}

const BannerMenu = (props) => {
    return(
        <div className="banner-menu">
            {
                props.items &&
                props.items.map((item, index) =>
                    <BannerMenuItem
                        key={index}
                        index={index}
                        title={item.title}
                        subtitle={item.subtitle}
                        active={props.activeIndex === index}/>
                )
            }
        </div>
    )
}
BannerMenu.defaultProps = {
    items: [
        {title: "Первое", subtitle: "уккуце"},
        {title: "Второе", subtitle: "укеук ц"},
        {title: "Третье", subtitle: "цукеуцке к"},
        {title: "Четвертое", subtitle: "еуке цукеуцк к"},
    ],
    activeIndex: -1,
}

// Slide bar -------------------------------------------
class BannerSlideBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            slideIndex: props.slideIndex,
            slides: props.slides,
        }

        this.slides = Array.apply(null, Array(props.slides)).map((item, index) => (
            {
                color: slideBarItem[index].color,
            }
        ));

        this.changeIndex = this.changeIndex.bind(this);
    }

    componentWillReceiveProps(props) {
        if(this.state.slideIndex !== props.slideIndex) {
            this.changeIndex(props.slideIndex);
        }
    }

    changeIndex(index) {
        this.setState({
            slideIndex: index,
        });
    }

    getState(index, slideIndex) {
        if(slideIndex < 0)
            return "empty";

        if(index < slideIndex) 
            return "fill";

        if(index == slideIndex)
            return "fillup";

        if(index > slideIndex)
            return "empty";

        return "empty";
    }

    render() {
        return(
            <div className="banner-slide">
                {
                    this.slides &&
                    this.slides.map((slide, index) =>
                        <BannerSlideBarItem
                            key={index}
                            color={slide.color}
                            state={this.getState(index, this.state.slideIndex)} />
                    )
                }
            </div>
        )
    }
}
BannerSlideBar.defaultProps = {
    slideIndex: -1,
    slides: 4,
}

const BannerSlideBarItem = (props) => {
    let style = {
        transform: 'scale3d(1, 1, 1)',
    };
    switch(props.state) {
        case "empty": style = {
            transform: 'scale3d(1, 1, 1)',
            opacity: 1,
        }; break;
        case "fillup": style = {
            transform: 'scale3d(0, 1, 1)',
            transitionProperty: 'transform',
            transitionDuration: `${1000 * props.animationDuration}ms`,
            transitionTimingFunction: 'linear',
        }; break;
        case "filldown": style = {
            transform: 'scale3d(1, 1, 1)',
            transitionProperty: 'transform',
            transitionDuration: `${1000 * props.animationDuration}ms`,
            transitionTimingFunction: 'linear',
        }; break;
        case "fill": style = {
            transform: 'scale3d(1, 1, 1)',
            opacity: 0,
        }; break;
    }

    return(
        <div 
            className="banner-slide-item"
            style={{
                backgroundColor: props.color,
            }}>
            <div 
                className="banner-slide-item__white"
                style={style}
                ></div>
        </div>
    )
}
BannerSlideBarItem.defaultProps = {
    state: "empty",
    color: "#fff",
    animationDuration: 5,
}
// -----------------------------------------------------

const BannerNavigation = (props) => {
    return(
        <div className="banner__menu">
            <BannerSlideBar 
                slideIndex={props.index} />
            <ScaleBarContainer />
            <BannerMenu
                activeIndex={props.index} />
        </div>
    )
}
BannerNavigation.defaultProps = {
    index: -1,
}

class BannerConatiner extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            banners: props.banners,
            bannerIndex: props.bannerIndex,
            prepare: false,
            show: false,
            prepareIndex: -1,
            releaseIndex: -1,
            showIndex: -1,
        }

        this.bannersLenth = (this.state.banners) ? this.state.banners.length : 0;

        this.goNext = this.goNext.bind(this);
        this.goPrev = this.goPrev.bind(this);
        this.goToIndex = this.goToIndex.bind(this);
    }

    goNext() {
        const nextIndex = (this.state.bannerIndex + 1) % this.bannersLenth;
        console.log("nextIndex=", nextIndex, this.state.bannerIndex);
        this.goToIndex(nextIndex);
    }

    goPrev() {
        const prevIndex = this.state.bannerIndex - 1;
        this.goToIndex(prevIndex >= 0 ? prevIndex : this.bannersLenth - 1);
    }

    goToIndex(index) {
        let prepareIndex = index;
        let showIndex = index;
        let releaseIndex = this.state.bannerIndex;
        this.setState({
            prepareIndex,
            releaseIndex,
        }, () => {

            this.state.prepareIndex = -1;
            this.state.releaseIndex = -1;

            let timeout = setTimeout(() => {
                this.setState({
                    showIndex,
                    bannerIndex: showIndex,
                }, () => {
                    this.state.showIndex = -1;
                    clearTimeout(timeout);
                });
            }, 1000);
        });
    }

    onClick() {
        this.goPrev();
    }

    render() {
        return(
            <div className="banner-container">
                {
                    this.state.banners.map((banner, index) => {
                        return(
                            <div 
                                className={`banner-container__item ${index === this.state.bannerIndex ? "banner-container__item--active" : ""}`}
                                onClick={this.onClick.bind(this)}
                                key={index}>
                                    <BannerItem
                                        primary={`Harder, ${index} Better,`}
                                        preFocus={this.state.prepareIndex === index}
                                        active={this.state.showIndex === index}
                                        afterFocus={this.state.releaseIndex === index}/>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}
BannerConatiner.defaultProps = {
    banners: ["", "", "", ""],
    bannerIndex: 0,
    state: "iddle",
}

class Banner extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            navigationIndex: 0,
        }

        this.banner = null;
    }

    componentDidMount() {
        // Add web worker
        if(typeof(Worker) !== 'undefined') {
            if(typeof(this.worker) == 'undefined') {
                console.log("Here");
                // this.worker = new bannerWebWorker();
                // this.worker.onmessage = this.onWebWorker;
                bannerWebWorker.onmessage = this.onWebWorker;
            }
        } else {
            console.error("Web worker no support...");
        }
            
            // if(true) {
            //     let intervalIndex = 0;
            //     let timeout = setTimeout(() => {
            //         this.interval = setInterval(() => {
            //             intervalIndex = (intervalIndex + 1) % 20;
            //             console.log(intervalIndex);

            //             if((intervalIndex + 1) % 5 === 0) {
            //                 this.banner.goNext();
            //             }

            //             if(intervalIndex % 5 === 0) {
            //                 this.setState({
            //                     navigationIndex: intervalIndex / 5,
            //                 })
            //             }
            //         }, 1000);
            //         clearTimeout(timeout);
            //     }, 1000);
            // }
    }

    onWebWorker(event) {
        console.log("Worker message", event);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        return(
            <Paper style={{margin: '15px 0px', overflow: 'hidden'}}>
                <div className="banner">
                    <div className="banner__content">
                        <div className="banner__content__side">
                            <ChevronLeft style={iconStyle.pagination} />
                        </div>
                        <div className="banner-content">
                            <div className="banner-content__container">
                                <BannerConatiner ref={banner => {if(this.banner == null) this.banner = banner}}/>
                            </div>
                        </div>
                        <div className="banner__content__side">
                            <ChevronRight style={iconStyle.pagination} />
                        </div>
                    </div>
                    <BannerNavigation
                        index={this.state.navigationIndex}/>
                </div>
            </Paper>
        )
    }
}

const Scale = (props) => {
    return(
        <div>
            <BannerNavigation />
            <BannerSlideBar />
            <div className="test"></div>
        <div>
            <Banner />
            {/* <div className="banner-scale"></div> */}
            <div className="banner-slide-bar"></div>
            {/* <div className="test"></div> */}
            <div className="test-test"></div>
            <BannerMenu />
        </div>
        </div>
    )
}


export default Banner;