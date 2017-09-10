import React        from 'react';

import {connect}    from 'react-redux';

class Wrapper extends React.Component {
    constructor(props) {
        super(props);

        // Из пропсов должно приходить productId

        this.state = Object.assign({}, props, {
            currentIndex: -1,
            productId: 9,
        });
    }

    componentWillMount() {
        this.prepare();
    }

    componentWillReceiveProps(nextProps) {
        console.log("NEW PROPS", nextProps);
        this.setState(nextProps, () => {
            this.prepare();
        });
    }

    prepare() {
        const index = this.state.productIds.findIndex(x => x.id === this.state.productId);
        if(index != -1) {
            this.setState({
                currentIndex: index,
            })
        } else {
            console.log("ALEEEERT");
        }
    }

    goPrev() {
        console.log("PREVIEWWWW");
        this.setState({
            currentIndex: (this.state.currentIndex + this.state.productIds.length - 1) % this.state.productIds.length,
        });
    }

    goNext() {
        console.log("NEXTTTTTTT");
        this.setState({
            currentIndex: (this.state.currentIndex + 1) % this.state.productIds.length,
        });
    }

    render() {
        const productInfo = this.state.productIds[this.state.currentIndex];
        return(
            <div style={{
                padding: 40,
                textAlign: 'center',
                background: '#ffffff',
                fontSize: 14,
                color: '#303030',
                display: 'flex',
                justifyContent: 'center',
            }}>
                <div onClick={this.goPrev.bind(this)}>PREV</div>
                <span>
                    {
                        productInfo != null &&
                        productInfo.title
                    }
                </span>
                <div onClick={this.goNext.bind(this)}>NEXT</div>
            </div>
        )
    }
}

const mstp = (state, ownProps) => {
    return {
        productIds: state.products,
    }
}

export default connect(mstp)(Wrapper);