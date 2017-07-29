import React from 'react';

import './check-box.less';

import IconButton           from 'material-ui/IconButton';
import CheckBoxIcon         from 'material-ui/svg-icons/Toggle/check-box';
import CheckBoxOutlineBlank from 'material-ui/svg-icons/Toggle/check-box-outline-blank';

//  Colors ------------------------
    var colors = {
        checked:    '#1bb869',
        unchecked:  '#aaaaaa',
    }
//  -------------------------------

//  Styles ------------------------
    var styles = {
        iconButton: {
            width: 36,
            height: 36,
            padding: 4,
        },
        icon: {
            width: 22,
            height: 22,
        }
    }
//  -------------------------------

const CheckBoxView = (props) => {
    return(
        <div className="check-box">
            <IconButton
                style={styles.iconButton}
                iconStyle={styles.icon}
                onClick={props.onClick}>
                    {
                        props.checked
                        ? <CheckBoxIcon color={colors.checked} />
                        : <CheckBoxOutlineBlank color={colors.unchecked} />
                    }
            </IconButton>
            <div 
                className={`check-box__title ${props.checked && "check-box__title--checked"}`}
                onClick={props.onClick}
                >{props.title}</div>
            <div 
                className="check-box__subtitle"
                >{props.subtitle.length && `(${props.subtitle})`}</div>
        </div>  
    )
}
CheckBoxView.defaultProps = {
    title: "",
    subtitle: "",
    checked: false,
    onClick: () => {},
}

export class CheckBox extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            checked: false,
            disabled: false,
        }

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        if(!this.state.disabled) {
            this.setState({checked: !this.state.checked});
        }
    }

    render() {
        return(
            <CheckBoxView 
                title="Зима-лето" 
                subtitle="156" 
                checked={this.state.checked}
                disabled={this.state.disabled}
                onClick={this.handleClick} />
        )
    }
}

const CheckBoxListView = (props) => {
    return(
        <div className="check-box-list">
            <div 
                className="check-box-list__container"
                onScroll={props.onScroll}
                style={{
                    height: props.listHeight,
                }}>
                    {
                        props.items &&
                        props.items.map((item, index) =>
                            <div 
                                className="check-box-list__container__item"
                                key={index}
                                >{item}</div>
                        )
                    }
            </div>
                <div className="check-box-list__scroll-bar">
                <div 
                    className="check-box-list__scroll-bar__bar"
                    style={{
                        top: `${props.scrollBarOffset}%`,
                        height: `${props.scrollBarHeight}px`,
                    }}></div>
            </div>
        </div>
    )
}
CheckBoxListView.defaultProps = {
    items: null,
    listHeight: 0,
    scrollBarHeight: 0,
    scrollBarOffset: 0,
    onScroll: () => {},
}

export class CheckBoxListView__Shell extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            items: props.children,
            maxItemsCount: props.maxItemsCount,
            itemCount: props.children ? props.children.length : 0,
            scrollOffet: 0,
            itemHeight: props.itemHeight,
        }

        this.scrollBarHeight = this.scrollBarHeight();
        this.listHeight = this.listHeight();

        this.handleScroll = this.handleScroll.bind(this);
    }

    handleScroll(event) {
        let scrollOffet = Math.round(event.target.scrollTop / (this.state.itemCount * this.state.itemHeight) * 100);
        this.setState({scrollOffet: scrollOffet});
    }

    listHeight() {
        return Math.min(this.state.itemCount, this.state.maxItemsCount) * this.state.itemHeight;
    }

    scrollBarHeight() {
        if(this.state.itemCount > 0) {
            console.log("->>", Math.round(Math.min(this.state.maxItemsCount / this.state.itemCount, 1) * this.listHeight()));
            return Math.round(Math.min(this.state.maxItemsCount / this.state.itemCount, 1) * this.listHeight());
        }

        return 0;
    }

    render() {
        return(
            <CheckBoxListView
                items={this.state.items}
                listHeight={this.listHeight}
                scrollBarHeight={this.scrollBarHeight}
                scrollBarOffset={this.state.scrollOffet}
                onScroll={this.handleScroll}/>
        )
    }
}
CheckBoxListView__Shell.defaultProps = {
    maxItemsCount: 6,
    itemHeight: 40,
}

export class CheckBoxList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            items: props.items,
            maxItemsCount: props.maxItemsCount,
            itemHeight: props.itemHeight,
        }
    }

    render() {
        return(
            <CheckBoxListView__Shell
                maxItemsCount={this.state.maxItemsCount}
                itemHeight={this.state.itemHeight}>
                {
                    this.state.items &&
                    this.state.items.map((item, index) =>
                        <CheckBox key={index}/>
                    )
                }
            </CheckBoxListView__Shell>
        )
    }
}
CheckBoxList.defaultProps = {
    items: [
        { title: "", subtitle: "", checked: false, disabled: false },
        { title: "", subtitle: "", checked: false, disabled: false },
        { title: "", subtitle: "", checked: false, disabled: false },
        { title: "", subtitle: "", checked: false, disabled: false },
        { title: "", subtitle: "", checked: false, disabled: false },
        { title: "", subtitle: "", checked: false, disabled: false },
    ],
    maxItemsCount: 5,
    itemHeight: styles.iconButton.height,
}

export default CheckBoxList;