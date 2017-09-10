import React from 'react';

import './pop-view.less';

import Dialog from 'material-ui/Dialog';

import ProductCard from '../../catalog/ProductCard.jsx';

var style = {
    overlay: {
        background: 'rgba(60, 85, 105, 0.85)',
    },
    body: {
        padding: 0,
        background: 'rgba(0, 0, 0, 0.0)',
        overflow: 'initial',
        maxHeight: 'none',
    },
    content: {
        width: '75%',
        maxWidth: 'none',
    }
}

class PopView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            open: true,
        }
    }

    handleClose() {
        console.log("Close");
        this.setState({
            open: false,
        });
    }

    handleClick() {
        this.setState({
            open: true,
        });
    }

    render() {
        return(
            <div>
                <Dialog
                    paperClassName="pop-view-transparent"
                    overlayStyle={style.overlay}
                    contentStyle={style.content}
                    bodyStyle={style.body}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose.bind(this)}
                    >
                        <div className="pop-view-container">
                            <div className="pop-view-container__button"></div>
                            <div className="pop-view-container__container">
                                <div className="pop-view-container__container__content">
                                    <ProductCard />
                                </div>
                                <div className="pop-view-container__container__footer">footer</div>
                            </div>
                            <div className="pop-view-container__button"></div>
                        </div>
                </Dialog>
                <div
                    className="button"
                    onClick={this.handleClick.bind(this)}></div>
            </div>
        )
    }
}

export default PopView;