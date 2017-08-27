import React from 'react';

import './loading-block.less';

import Paper        from 'material-ui/Paper';
import FlatButton   from 'material-ui/FlatButton';
import LazyLoader   from '../lazy-loader';

const LoadingBlock = (props) => {
    return(
        <div className="loading-block">
            {
                props.loading
                ?
                <LazyLoader
                    text={props.title}
                    size={10}/>
                :
                <FlatButton 
                    label={errorMessage}
                    onClick={props.onClick}/>
            }
        </div>
    )
}
LoadingBlock.defaultProps = {
    title: "",
    loading: true,
    error: false,
    errorMessage: "",
    onClick: () => {},
}

const ErrorBlock = (props) => {
    return(
        <div className="error-block">
            {props.text}
        </div>
    )
}
ErrorBlock.defaultProps = {
    text: "Ошибка",
}

const LoadStatusBlock = (props) => {
    return(
        <div>
            {
                  props.loading ? <LoadingBlock />
                : props.error ? <ErrorBlock />
                : <ErrorBlock />
            }
        </div>
    )
}
LoadStatusBlock.defaultProps = {
    loading: true,
    error: false,
}

export default LoadStatusBlock;
