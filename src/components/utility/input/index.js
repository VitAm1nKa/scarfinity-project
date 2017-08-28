import React from 'react';

import './input.less';

export const BasicInput = (props) => {
    return(
        <input
            className={`sInput__basic${
                props.success   ? " sInput__basic--success" : 
                props.error     ? " sInput__basic--error"   :
                props.search    ? " sInput__basic--search"  : ""
            }`}
            type="text"
            placeholder={props.placeholder}
            disabled={props.disabled} />
    )
}
BasicInput.defaultProps = {
    success: false,
    error: false,
    search: false,
    dispabled: false,
    placeholder: ""
}