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
            imageSrc: "",
            prepare: true,
            success: false,
            error: false,
        }

        // this.onClick = props.onClick;

        let imageIndex = props.match.params.id;
        if(typeof images[imageIndex] === 'undefined') {
            // does not exist
        }
        else {
             this.fetchImage(images[imageIndex]);
        }
    }

    componentWillReceiveProps(props) {
        console.log(props);
    }

    onClick() {
        console.log("THIS CLICK");
    }

    fetchImage(imageUrl) {
        var myHeaders = new Headers({
            'Access-Control-Allow-Origin':'*',
        });

        var myInit = { method: 'GET',
                    headers: myHeaders,
                    mode: 'cors',
                    cache: 'default' };

        var myRequest = new Request(imageUrl, myInit);

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
                <Link to={`/gallery/8`} >
                    <div className="image-container__container">
                        {
                            this.state.success 
                            ? <img src={this.state.imageSrc}/>
                            : <span>Error</span> 
                        }
                    </div>
                </Link>
            </div>
        )
    }
}
ImageContainer.defaultProps = {
    imageUrl: "",
    test: "Hello",
}

class Page__PhotoGallery extends React.Component {
    constructor(props) {
        super(props);

        console.log("Main->", props);

        this.path = props.match.path;

        console.log("PHOTOGALLERY UPHERE!");

        this.getData();
    }

    getData() {
        const APIkey = '6223242-fb11c6a1e618352e1093c970f';
        const query = `https://pixabay.com/api/?${APIkey}&q=yellow+flowers&image_type=photo&pretty=true`;
    }

    handleClick() {
        console.log("Click");
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
                    <Switch>
                        <Route
                            path={`/gallery/:id`}
                            render={props => <ImageContainer onClick={this.handleClick.bind(this)} {...props} />} />
                    </Switch>
            </Dialog>
        )
    }
}

export default Page__PhotoGallery;