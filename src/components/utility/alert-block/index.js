import React from 'react';

import './alert-block.less';

const AlertBlock = (props) => {
    const types = {
        default: text => <span className="alert-block-text">{text}</span>,
        errorInput: text => <span className="alert-block-text">Ошбка ввода в поле <b>{text}</b></span>,
        errorInputEmpty: text => <span className="alert-block-text">Заполните поле <b>{text}</b></span>,
        errorSelect: text => <span className="alert-block-text">Выберите <b>{text}</b></span>,
        warning: text => <span className="alert-block-text"><b>Предупреждение! </b>{text}</span>,
    }
    return(
        <div className={`alert-block alert-block--${props.type}`}>
            <div
                className="alert-block__container"
                onClick={props.onClick}>
                    {types[props.textType](props.text)}
            </div>
        </div>
    )
}
AlertBlock.defaultProps = {
    type: "default",
    textType: "default",
    text: "Вы не ввели поле Фимилия",
    onClick: () => {},
}

class AlertBlockContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = Object.assign({}, props, {
            items: props.items && props.items.map((item, index) => Object.assign({}, item, {index}))
        });
    }

    componentWillReceiveProps(nextProps) {
        this.setState(Object.assign({}, nextProps, {
            items: nextProps.items && nextProps.items.map((item, index) => Object.assign({}, item, {index}))
        }));
    }

    handleClick(index) {
        console.log(index);
        this.setState({
            items: this.state.items.filter(x => x.index !== index),
        });
    }

    render() {
        return(
            <div className="alert-block-container">
                {
                    this.state.items &&
                    this.state.items.map((item) =>
                        <AlertBlock key={item.index} {...item} onClick={() => this.handleClick(item.index)}/>
                    )
                }
            </div>
        )
    }
}
AlertBlockContainer.defaultProps = {
    items: [
        {
            type: "error",
            textType: "errorInputEmpty",
            text: "Фамилия",
        },
        {
            type: "success",
            text: `Введите поле <b>Фамилия</b>`,
        }
    ],
}

export default AlertBlockContainer;