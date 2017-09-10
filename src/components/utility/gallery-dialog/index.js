import React from 'react';

import './gallery-dialog.less';

import Dialog from 'material-ui/Dialog';

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
        width: '90%',
        maxWidth: 1024,
    },
}

const GalleryDialog = (props) => {
    return(
        <Dialog
            paperClassName="pop-view-transparent"
            overlayStyle={style.overlay}
            contentStyle={style.content}
            bodyStyle={style.body}
            modal={false}
            open={props.open}
            onRequestClose={props.onRequestClose}
            >
                {props.children}
        </Dialog>
    )
}
GalleryDialog.defaultProps = {
    open: false,
    onRequestClose: () => {},
}

export default GalleryDialog;