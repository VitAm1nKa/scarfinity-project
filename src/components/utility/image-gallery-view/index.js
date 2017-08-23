import React        from 'react';
import {parse}      from 'qs';
import {Link}       from 'react-router-dom';

import './image-gallery-view.less';

import Dialog                       from 'material-ui/Dialog';
import ChevroneLeft                 from 'material-ui/svg-icons/navigation/chevron-left';
import ChevroneRight                from 'material-ui/svg-icons/navigation/chevron-right';
import LazyLoader                   from '../lazy-loader';

var imagesAPI = [
    {url: "https://cdn.pixabay.com/photo/2013/10/15/09/20/flower-195897_150.jpg", name: "photo-12345"},
    {url: "https://cdn.pixabay.com/photo/2013/10/16/16/59/yellow-rose-196393_150.jpg", name: "photo-12346"},
    {url: "https://cdn.pixabay.com/photo/2015/03/26/18/52/spring-693286_150.jpg", name: "photo-12347"},
    {url: "https://cdn.pixabay.com/photo/2016/05/01/18/29/gerbera-1365459_150.jpg", name: "photo-12348"},
    {url: "https://cdn.pixabay.com/photo/2014/01/18/11/09/flower-247409_150.jpg", name: "photo-12349"},
];

var style = {
    overlay: {
        background: 'rgba(60, 85, 105, 0.9)',
    },
    body: {
        overflow: 'initial',
        maxHeight: 'none',
        minHeight: 300,
        padding: 0,
    },
    content: {
        width: '75%',
        maxWidth: 768,
    },
    icon: {
        width: 30,
        height: 30,
    }
}

class ImageGalleryImageContainer extends React.Component {
    constructor(props) {
        super(props);

        // console.log("Image container =>", props);

        this.state = {
            loading: false,
            success: true,
            error: false,

            imageId: props.imageId,
            imageSrc: props.imageUrl,
        }
    }

    componentDidMount() {
        // this.fetchImage();
    }

    componentWillReceiveProps(props) {
        // this.setState({
        //     imageId: props.imageId,
        // }, () => {
        //     this.fetchImage(images[this.state.imageId]);
        // })
        // console.log("KKK =>", props);
        this.setState({
            imageSrc: props.imageUrl,
        });
    }

    shouldComponentUpdate(nextProps, nextState) {
        return true;
    }

    fetchImage() {
        let imageId = this.state.imageId;
        let timeout = setTimeout(() => {
            this.dowloadImage("https://cdn.pixabay.com/photo/2013/10/15/09/20/flower-195897_150.jpg", response => {
                // console.log(response);
                switch(response.type) {
                    case "SUCCESS": {
                        this.setState({
                            loading: false,
                            success: true,
                            error: false,
                            imageSrc: response.data.url,
                        });
                    }; break;
                    case "ERROR__LOAD": {
                        this.setState({
                            loading: false,
                            success: false,
                            error: true,
                            imageSrc: null,
                        });
                    }; break;
                    case "ERROR__NOURL": {
                        this.setState({
                            loading: false,
                            success: false,
                            error: true,
                            imageSrc: null,
                        });
                    }; break;
                }
            });
            clearTimeout(timeout);
        }, 1000);
    }

    dowloadImage(imageUrl, callback) {
        // console.log("start downloading");
        if(imageUrl != "") {
            fetch(imageUrl)
            .then(response => response.blob())
            .then(blob => {
                let objectURL = URL.createObjectURL(blob);
                if(callback)
                    callback({
                        type: "SUCCESS",
                        message: "",
                        data: {
                            url: objectURL,
                        }
                    });
            }).catch(error => {
                if(callback)
                    callback({
                        type: "ERROR__LOAD",
                        message: error,
                    });
            });
        } else {
            if(callback) {
                callback({
                    type: "ERROR__NOURL",
                    message: "No image url!",
                });
            }
        }
    }

    getRenderState() {
        if(this.state.loading) {
            return(
                <div className="image-gallery-image-container__status-frame">
                    <LazyLoader />
                </div>
            )
        }

        if(this.state.success) {
            return(
                <div className="image-gallery-image-container__image-frame">
                    <img src={this.state.imageSrc} />
                </div>
            )
        }

        // By default return error
        return(
            <div className="image-gallery-image-container__status-frame">
                {"Какая то ошибка!"}
            </div>
        )
    }

    render() {
        // console.log("Render");
        return(
            <div className="image-gallery-image-container">
                {
                    this.getRenderState()
                }
            </div>
        )
    }
}
ImageGalleryImageContainer.defaultProps = {
    imageUrl: "",
    imageId: -1,
}

const ImageGalleryContainerFooter = (props) => {
    // console.log("Footer props =>", props);
    return(
        <div className="image-gallery-container-footer">
            {
                !props.loading 
                ?
                <div className="image-gallery-container-footer__container">
                    <span className="image-gallery-container-footer__container__accent">{props.title}</span>
                    <span>{`Фото № ${props.currentIndex + 1} из ${props.count}`}</span>
                </div>
                :
                <LazyLoader size={5} />
            }
        </div>
    )
}
ImageGalleryContainerFooter.defaultProps = {
    loading: true,
    title: "",
    currentIndex: -1,
    count: -1,
}

const ImageGalleryButton = (props) => {
    const content = () => {
        return(
            <div
                className={`image-gallery-button__container image-gallery-button__container${props.right ? "--right" : "--left"}`}>
                    <div className="image-gallery-button__container__icon">
                        {
                            props.right
                            ? <ChevroneRight style={style.icon} />
                            : <ChevroneLeft  style={style.icon} />
                        }
                    </div>
                    <div className="image-gallery-button__container__content">
                        {
                            props.imageSrc &&
                            <img src={props.imageSrc} />
                        }
                    </div>
            </div>
        )
    }
    return(
            <div 
                className={`image-gallery-button`}
                onClick={props.onClick}>
                {
                    props.link
                    ?
                    <Link to={props.link}>
                        {content()}
                    </Link>
                    :
                    content()
                }
            </div>
    )
}
ImageGalleryButton.defaultProps = {
    right: false,
    imageSrc: false,
    link: null,
    onClick: () => {},
}

const ImageGalleryContainer = (props) => {
    return(
        <div className="image-gallery-container">
            <ImageGalleryImageContainer
                imageUrl={props.imageUrl}/>
            <ImageGalleryContainerFooter
                currentIndex={props.currentIndex}
                count={props.count}
                title={props.title}
                loading={false}/>
        </div>
    )
}
ImageGalleryContainer.defaultProps = {
    currentIndex: -1,
    count: -1,
    title: "",
    imageUrl: null,
}

class ImageGalleryView extends React.Component {
    constructor(props) {
        super(props);

        // console.log("Main props =>", props);

        this.state = {
            images: props.images,
            currentIndex: props.currentIndex,
            title: props.title,
            path: props.path,
            count: 0,
            location: props.location,
        }

        let z = parse(props.location.search.substr(1)).z;

        let find = this.state.images.find(x => x.name === z);
        let currentIndex = this.state.images.indexOf(find);

        this.state.currentIndex = currentIndex;

        if(this.state.images)
            this.state.count = this.state.images.length;

        // console.log("Location", this.state.location);

        this.prevIndex = (current, count) => (current + count - 1) % count;
        this.nextIndex = (current, count) => (current + 1) % count;
    }

    componentWillReceiveProps(nextProps) {
        console.log("Next =>", nextProps.location.search, this.state.location.search);
        if(nextProps.location.search !== this.state.location.search) {
            console.log("!@#@@$!#$@!#%@#%$");
            let z = parse(nextProps.location.search.substr(1)).z;
            let find = this.state.images.find(x => x.name === z);
            let currentIndex = this.state.images.indexOf(find);
            this.setState({
                currentIndex: currentIndex,
                location: nextProps.location,
            });
        }
    }

    getImageUrl() {
        if(this.state.images) {
            return this.state.images[this.state.currentIndex].url;
        }

        return null;
    }

    handleNextClick() {
        // this.setState({
        //     currentIndex: this.nextIndex(this.state.currentIndex, this.state.count),
        // });
    }

    handlePrevClick() {
        // this.setState({
        //     currentIndex: this.prevIndex(this.state.currentIndex, this.state.count),
        // });
    }

    render() {
        const prevIndex = this.prevIndex(this.state.currentIndex, this.state.count);
        const nextIndex = this.nextIndex(this.state.currentIndex, this.state.count);
        // console.log("Indecies =>", prevIndex, nextIndex);
        let leftImageSrc = imagesAPI[prevIndex].url;
        let rightImageSrc = imagesAPI[nextIndex].url;
        let currentImage = imagesAPI[this.state.currentIndex].url;
        let nextLocation = this.state.location.pathname + `?z=${this.state.images[nextIndex].name}`;
        let prevLocation = this.state.location.pathname + `?z=${this.state.images[prevIndex].name}`;
        // console.log("New locations", prevLocation, nextLocation);
        // console.log("current", currentImage);
        return(
            <div className="image-gallery">
                <ImageGalleryButton
                    imageSrc={leftImageSrc}
                    link={prevLocation}
                    onClick={this.handlePrevClick.bind(this)}/>
                <ImageGalleryContainer
                    currentIndex={this.state.currentIndex}
                    count={this.state.count}
                    title={this.state.title}
                    imageUrl={currentImage}/>
                <ImageGalleryButton
                    imageSrc={rightImageSrc}
                    link={nextLocation}
                    onClick={this.handleNextClick.bind(this)}
                    right/>
            </div>
        )
    }
}
ImageGalleryView.defaultProps = {
    images: null,
    currentIndex: -1,
    title: "",
    location: null,
}

class ImageGallery extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dialogOpen: true,

            images: props.images,
            currentIndex: props.currentIndex,
            title: props.title,
            location: props.location,
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            location: nextProps.location,
        });
    }

    render() {
        return(
            <Dialog
                paperClassName="pop-view-transparent"
                overlayStyle={style.overlay}
                contentStyle={style.content}
                bodyStyle={style.body}
                modal={false}
                open={this.state.dialogOpen}
                >
                    <ImageGalleryView
                        images={this.state.images}
                        currentIndex={this.state.currentIndex}
                        title={this.state.title}
                        location={this.state.location}/>
            </Dialog>
        )
    }
}
ImageGallery.defaultProps = {
    images: [
        {name: "photo-12345"},
        {name: "photo-12346"},
        {name: "photo-12347"},
        {name: "photo-12348"},
        {name: "photo-12349"},
    ],
    currentIndex: 0,
    title: "Галерея изображений",
    location: null,
}

export default ImageGallery;