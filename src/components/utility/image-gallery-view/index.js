import React            from 'react';
import {connect}        from 'react-redux';
import {Link}           from 'react-router-dom';

import './image-gallery-view.less';

import ChevroneLeft     from 'material-ui/svg-icons/navigation/chevron-left';
import ChevroneRight    from 'material-ui/svg-icons/navigation/chevron-right';
import LazyLoader       from '../lazy-loader';

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
    return(
        <div className="image-gallery-container-footer">
            {
                !props.loading 
                ?
                <div className="image-gallery-container-footer__container">
                    <span className="image-gallery-container-footer__container__accent">{props.title}</span>
                    <span>{`Фото № ${Number(props.currentIndex) + 1} из ${props.count}`}</span>
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
    return(
        <div 
            className={`image-gallery-button`}>
            <Link to={props.link}>
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
            </Link>
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

const ImageGallery = (props) => {
    return(
        <div className="image-gallery">
            <ImageGalleryButton
                imageSrc={props.imageUrl.prev}
                link={props.link.prev}/>
            <ImageGalleryContainer
                currentIndex={props.currentIndex}
                count={props.count}
                title={props.title}
                imageUrl={props.imageUrl.current}/>
            <ImageGalleryButton
                imageSrc={props.imageUrl.next}
                link={props.link.next}
                right/>
        </div>
    )
}

const mstp = (state, ownProps) => {
    const images = state.products.find(x => x.id == ownProps.productId).images.list;
    const currentIndex = images.findIndex(x => x.id == ownProps.photoId);
    const count = images.length;
    const prevIndex = (currentIndex + count - 1) % count;
    const nextIndex = (currentIndex + 1) % count;

    return {
        title: ownProps.title,
        currentIndex: images.findIndex(x => x.id == ownProps.photoId),
        count: images.length,
        imageUrl: {
            current: images[currentIndex].main,
            prev: images[prevIndex].preview,
            next: images[nextIndex].preview,
        },
        link: {
            prev: ownProps.subQuery(images[prevIndex].id),
            next: ownProps.subQuery(images[nextIndex].id),
        }
    }
}

const mdtp = (dispatch) => {
    return {
        
    }
}

export default connect(mstp, mdtp)(ImageGallery);