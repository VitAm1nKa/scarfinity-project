import React from 'react';

import './photo-gallery.less';

import {Router, Route, Redirect, Switch} from 'react-router';
import {HashRouter, Link} from 'react-router-dom';

import Dialog from 'material-ui/Dialog';

var images = [
    "https://cdn.pixabay.com/photo/2013/10/15/09/20/flower-195897_150.jpg",
    "https://cdn.pixabay.com/photo/2013/10/16/16/59/yellow-rose-196393_150.jpg",
    "https://cdn.pixabay.com/photo/2013/10/15/09/12/flower-195893_150.jpg",
    "https://cdn.pixabay.com/photo/2014/01/18/11/09/flower-247409_150.jpg",
    "https://cdn.pixabay.com/photo/2014/10/16/13/33/sun-flower-491173_150.jpg",
    "https://cdn.pixabay.com/photo/2016/01/05/13/12/bee-1122469_150.jpg",
    "https://cdn.pixabay.com/photo/2015/03/26/18/52/spring-693286_150.jpg",
    "https://cdn.pixabay.com/photo/2014/02/24/05/11/yellow-273391_150.jpg",
    "https://cdn.pixabay.com/photo/2016/05/01/18/29/gerbera-1365459_150.jpg",
    "https://cdn.pixabay.com/photo/2013/07/05/15/15/flower-143487_150.jpg",
]

var imagesT = null;

var style = {
    overlay: {
        background: 'rgba(60, 85, 105, 0.85)',
    },
    body: {
        padding: 20,
        background: 'rgba(255, 255, 255, 0.2)',
        overflow: 'initial',
        maxHeight: 'none',
        minHeight: 300,
    },
    content: {
        width: '75%',
        maxWidth: 768,
    }
}

class ImageContainer extends React.Component {
    constructor(props) {
        super(props);

        console.log(props);

        console.log("IAMGECONTAINER UPHERE!");

        this.state = {
            imageId: props.imageId,
            imageSrc: "",
            prepare: true,
            success: false,
            error: false,
        }

        this.onClick = props.onClick;

        if(typeof images[this.state.imageId] === 'undefined') {
            // does not exist
        }
        else {
             this.fetchImage(images[this.state.imageId]);
        }
    }

    componentWillReceiveProps(props) {
        this.setState({
            imageId: props.imageId,
        }, () => {
            this.fetchImage(images[this.state.imageId]);
        })
    }

    shouldComponentUpdate(nextProps, nextState) {
        // if(nextState.imageId == this.state.imageId) {
        //     return false;
        // }

        return true;
    }

    fetchImage(imageUrl) {
        if(imageUrl != "") {
            fetch(imageUrl)
            .then(response => response.blob())
            .then(blob => {
                let objectURL = URL.createObjectURL(blob);
                this.setState({
                    imageSrc: objectURL,
                    prepare: false,
                    success: true,
                    error: false,
                });
                return;
            }).catch(error => {
                this.setState({
                    imageSrc: "",
                    prepare: false,
                    success: false,
                    error: true,
                });
                return;
            });
        }
    }

    render() {
        console.log("Render");
        return(
            <div className="image-container" onClick={this.onClick}>
                <div className="image-container__container">
                    {
                        this.state.success 
                        ? <img src={this.state.imageSrc}/>
                        : <span>Error</span> 
                    }
                </div>
            </div>
        )
    }
}
ImageContainer.defaultProps = {
    imageUrl: "",
    test: "Hello",
    imageId: -1,
}

class Page__PhotoGallery extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            items: props.items,
            currentIndex: props.currentIndex,
        }

        console.log(props);
    }

    handleClick() {
        console.log("Click");
        this.setState({
            currentIndex: (this.state.currentIndex + 1) % this.state.items.length,
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
                open={true}
                >
                    <ImageContainer
                        imageId={this.state.currentIndex}
                        onClick={this.handleClick.bind(this)} />
            </Dialog>
        )
    }
}

export default Page__PhotoGallery;