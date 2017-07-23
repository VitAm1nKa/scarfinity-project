import React from 'react';

import './Ribbon.less';


class Ribbon extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            style: "hot",
        }

        if(props.type) {
            this.state = { style: props.type }
        }

	}

    render() {

        let {style} = this.state;
        var values = { title: "Горячее", class: "hot" }
        switch (style) {
            case "hot": values = { title: "Горячее", class: "hot" }; break;
            case "new": values = { title: "Новинка", class: "new" }; break;
            case "sale": values = { title: "Скидка", class: "sale" }; break;
        }

        console.log(values);

        return (
            <div>
                <div className={`ribbon ${values.class}`}>
                    <span className="ribbon__title">{values.title}</span>
                </div>
            </div>
        );
    }
}

export default Ribbon;