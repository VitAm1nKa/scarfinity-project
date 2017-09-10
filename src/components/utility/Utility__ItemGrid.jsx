import React                    from 'react';

import                               './utility__item-grid.less';

import Measure                  from 'react-measure'

import Utility__ImageContainer  from '../utility/Utility__ImageContainer.jsx';
import ChevronLeft              from 'material-ui/svg-icons/navigation/chevron-left';
import ChevronRight             from 'material-ui/svg-icons/navigation/chevron-right';
import ExpandLess               from 'material-ui/svg-icons/navigation/expand-less';
import ExpandMore               from 'material-ui/svg-icons/navigation/expand-more';
import IconButton               from 'material-ui/IconButton';

const style = {
    button: {
        width: 26,
        height: 30,
        padding: 3,
    }
}

//style={{paddingTop: `${100 / props.maxVisibleItems}%`}}
//`${props.items.length / props.maxVisibleItems * 100}%`

// Views  ----------------------------------------------------------------------
const ItemGridItemView = (props) => {
    return(
        <div 
            className="item-grid-item">
            <Utility__ImageContainer
                imageUrl={props.imageUrl}/>
        </div>
    )
}
ItemGridItemView.defaultProps = {
    selected: false,
    imageUrl: null,
}

const ItemGridHorisontalView = (props) => {
    const itemSize = props.itemSize;
    const itemWidth = 100 / props.items.length;
    const offset = props.offset * itemSize;
    return(
        <Measure
            bounds
            onResize={(contentRect) => {props.onResize(contentRect.bounds)}}>
            {
                ({measureRef}) =>
                    <div 
                        className="item-grid-horisontal"
                        ref={measureRef}
                        style={{height: itemSize}}>
                            <div 
                                className="item-grid-horisontal__container"
                                style={{
                                    top: 0,
                                    bottom: 0,
                                    width: `${props.items.length * itemSize}px`,
                                    transform: `translate3d(${offset > 0 ? -offset : Math.abs(offset)}px, 0,0)`,
                                }}>
                                    {
                                        props.items.map((value, index) => 
                                            <div 
                                                key={index}
                                                onClick={() => props.onItemClick(index - props.offset)}
                                                style={{width: `${itemSize}px`}}>
                                                    <ItemGridItemView
                                                        imageUrl={value.preview}/>
                                                </div>
                                        )
                                    }
                            </div>
                            <div 
                                className="item-grid-horisontal__select-block"
                                style={{
                                    width: `${itemSize - 10}px`,
                                    height: `${itemSize - 10}px`,
                                    left: 5,
                                    transform: `translate3d(${itemSize * props.selectedIndex}px, 0px, 0px)`,
                                }}
                            ></div>
                    </div>
            }
        </Measure>
    )
}
ItemGridHorisontalView.defaultProps = {
    items: [],
    itemSize: 0,
    selectedIndex: 0,
    maxVisibleItems: 1,
    offset: 0,
    gridRef: null,
    onItemClick: () => {},
    onResize: () => {},
}

const ItemGridVerticalView = (props) => {
    const itemHeight = 100 / props.items.length;
    const offset = props.offset * itemHeight;
    return(
        <Measure
            bounds
            onResize={(contentRect) => {props.onResize(contentRect.bounds)}}>
            {
                ({measureRef}) =>
                    <div 
                        className="item-grid-vertical"
                        ref={measureRef}
                        style={{width: `100%`}}>
                        <div 
                            className="item-grid-vertical__container"
                            style={{
                                top: 0,
                                bottom: 0,
                                width: `${props.itemSize}px`,
                                height: `${props.items.length * props.itemSize}px`,
                                transform: `translate3d(0, ${offset > 0 ? -offset : Math.abs(offset)}%,0)`,
                            }}>
                                {
                                    props.items.map((value, index) => 
                                        <div 
                                            key={index}
                                            onClick={() => props.onItemClick(index - props.offset)}
                                            style={{width: `${props.itemSize}px`, height: `${props.itemSize}px`}}>
                                                <ItemGridItemView
                                                    imageUrl={value.preview}/>
                                            </div>
                                    )
                                }
                            </div>
                            <div 
                                className="item-grid-vertical__select-block"
                                style={{
                                    width: `${props.itemSize - 10}px`,
                                    height: `${props.itemSize - 10}px`,
                                    top: 5,
                                    transform: `translate3d(0px, ${props.itemSize * props.selectedIndex}px, 0px)`,
                                }}
                            ></div>
                    </div>
            }
        </Measure>
    )
}
ItemGridVerticalView.defaultProps = {
    itemSize: 0,
    selectedIndex: 0,
    items: ["", "", "", ""],
    maxVisibleItems: 1,
    offset: 0,
    gridRef: null,
    onItemClick: () => {},
    onResize: () => {},
}

const ItemGridContainerHorisontalView = (props) => {
    return(
        <div className="item-grid-container-horisontal">
            <IconButton 
                className="item-grid-container-horisontal__button"
                style={style.button}
                disabled={props.leftToggle}
                onClick={props.onMoveBack}>
                    <ChevronLeft />
            </IconButton>
            <div className="item-grid-container-horisontal__grid">
                <ItemGridHorisontalController
                    items={props.items}
                    itemBasis={props.itemBasis}
                    offset={props.offset}
                    selectedIndex={props.selectedIndex}
                    onChange={props.onChange} 
                    ref={props.gridRef}
                    onIndexChange={props.onIndexChange}/>
            </div>
            <IconButton
                className="item-grid-container-horisontal__button"
                style={style.button}
                disabled={props.rightToggle}
                onClick={props.onMoveForward}>
                    <ChevronRight />
            </IconButton>
        </div>
    )
}
ItemGridContainerHorisontalView.defaultProps = {
    leftToggle: true,
    rightToggle: true,
    gridRef: null,
    onMoveForward: () => {},
    onMoveBack: () => {},
    onChange: () => {},
    items: [],
    itemBasis: 80,
    offset: 0,
    selectedIndex: 0,
    onIndexChange: () => {},
}

const ItemGridContainerVerticalView = (props) => {
    return(
        <div className="item-grid-container-vertical">
            <IconButton 
                className="item-grid-container-vertical__button"
                style={style.button}
                disabled={props.leftToggle}
                onClick={props.onMoveBack}>
                    <ExpandLess />
            </IconButton>
            <div className="item-grid-container-vertical__grid">
                   <ItemGridVerticalController
                    items={props.items}
                    itemBasis={props.itemBasis}
                    offset={props.offset}
                    selectedIndex={props.selectedIndex}
                    onChange={props.onChange} 
                    ref={props.gridRef}
                    onIndexChange={props.onIndexChange}/>   
            </div>
            <IconButton 
                className="item-grid-container-vertical__button"
                style={style.button}
                disabled={props.rightToggle}
                onClick={props.onMoveForward}>
                    <ExpandMore />
            </IconButton>
        </div>
    )
}
ItemGridContainerVerticalView.defaultProps = {
    leftToggle: true,
    rightToggle: true,
    gridRef: null,
    onMoveForward: () => {},
    onMoveBack: () => {},
    onChange: () => {},
    items: [],
    itemBasis: 80,
    offset: 0,
    selectedIndex: 0,
    onIndexChange: () => {},
}

// Smart Controllers  ------------------------------------------------------------
class ItemGridHorisontalController extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            itemsCount: 1,
            itemSize: 0,
            minItemHeight: props.itemBasis,
            items: props.items,
            selectedIndex: props.selectedIndex,
            offset: props.offset,
        }

        this.onChange = props.onChange;
        this.onIndexChange = props.onIndexChange;

        this.recalcItemsCount = this.recalcItemsCount.bind(this);
        this.handleItemClick = this.handleItemClick.bind(this);
        this.doOnChange = this.doOnChange.bind(this);
        this.move = this.move.bind(this);
    }
    
    handleItemClick(selectedIndex) {
        this.setState({selectedIndex}, () => {
            if(this.onIndexChange) this.onIndexChange(selectedIndex + this.state.offset);
        });
    }

    move(direction = 1) {
        const newOffset = this.state.offset + direction;
        const countDiff = Math.max(this.state.items.length - this.state.itemsCount, 0);
        this.setState({offset: newOffset > countDiff ? countDiff : newOffset}, this.doOnChange);
    }
    
    handleOnResize(bounds) {
        this.recalcItemsCount(bounds);
    }

    recalcItemsCount({width}, update = true) {
        const minHeight = this.state.minItemHeight;
        const itemsCount = Math.floor(width / minHeight);
        const itemSize = Math.round(width / itemsCount);
        const countDiff = this.state.items.length - itemsCount;

        this.state.itemSize = itemSize;
        this.state.itemsCount = Math.floor(width / minHeight);
        this.state.offset = this.state.offset > countDiff ? Math.max(countDiff, 0) : this.state.offset;

        if(update) this.forceUpdate(this.doOnChange);
    }

    doOnChange() {
        const offset = this.state.offset;
        const leftToggle = this.state.offset > 0;
        const rightToggle = offset + this.state.itemsCount < this.state.items.length;
        this.onChange({leftToggle, rightToggle, offset});
        if(this.onIndexChange) this.onIndexChange(this.state.selectedIndex + this.state.offset);
    }

    render() {
        return(
            <ItemGridHorisontalView
                gridRef={grid => this.grid = grid}
                items={this.state.items}
                itemSize={this.state.itemSize}
                maxVisibleItems={this.state.itemsCount}
                offset={this.state.offset}
                selectedIndex={this.state.selectedIndex}
                onItemClick={this.handleItemClick} 
                onResize={this.handleOnResize.bind(this)}/>
        )
    }
}
ItemGridHorisontalController.defaultProps = {
    itemBasis: 80,
    items: [],
    offset: 0,
    selectedIndex: 0,
    onChange: () => {},
    gridRef: null,
    onIndexChange: () => {},
}

class ItemGridVerticalController extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            itemsCount: 5,
            itemBasis: props.itemBasis,
            itemSize: 1,
            selectedIndex: 0,
            items: props.items,
            selectedIndex: props.selectedIndex,
            offset: props.offset,
        }

        this.onChange = props.onChange;
        this.onIndexChange = props.onIndexChange;

        this.recalcItemsCount = this.recalcItemsCount.bind(this);
        this.handleItemClick = this.handleItemClick.bind(this);
        this.doOnChange = this.doOnChange.bind(this);
        this.move = this.move.bind(this);
    }

    handleItemClick(selectedIndex) {
        this.setState({selectedIndex}, () => {
            if(this.onIndexChange) this.onIndexChange(selectedIndex + this.state.offset);
        });
    }

    move(direction = 1) {
        const newOffset = this.state.offset + direction;
        const countDiff = Math.max(this.state.items.length - this.state.itemsCount, 0);
        this.setState({offset: newOffset > countDiff ? countDiff : newOffset}, this.doOnChange);
    }

    doOnChange() {
        const offset = this.state.offset;
        const leftToggle = this.state.offset > 0;
        const rightToggle = offset + this.state.itemsCount < this.state.items.length;
        this.onChange({leftToggle, rightToggle, offset});
        if(this.onIndexChange) this.onIndexChange(this.state.selectedIndex + this.state.offset);
    }

    handleOnResize(bounds) {
        this.recalcItemsCount(bounds);
    }

    recalcItemsCount(bounds, update = true) {
        const itemSize = Math.round(Math.min(bounds.height / 5, bounds.width));

        const countDiff = this.state.items.length - 5;
        this.state.itemsCount = 5;
        this.state.itemSize = itemSize,
        this.state.offset = this.state.offset > countDiff ? Math.max(countDiff, 0) : this.state.offset;

        if(update) this.forceUpdate(this.doOnChange);
    }

    render() {
        return(
            <ItemGridVerticalView
                gridRef={grid => this.grid = grid}
                items={this.state.items}
                itemSize={this.state.itemSize}
                maxVisibleItems={this.state.itemsCount}
                offset={this.state.offset}
                selectedIndex={this.state.selectedIndex}
                onItemClick={this.handleItemClick}
                onResize={this.handleOnResize.bind(this)}/>
        )
    }
}
ItemGridVerticalController.defaultProps = {
    itemBasis: 80,
    onChange: () => {},
    gridRef: null,
    onIndexChange: () => {},
}

// Export components ------------------------------------------------------
export class ItemGridHorisontal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            leftToggle: false,
            rightToggle: false,
        }

        this.items = props.items;
        this.offset = props.offset;
        this.itemBasis = props.itemBasis;
        this.selectedIndex = props.selectedIndex,
        this.onIndexChange = props.onIndexChange;

        this.handleOffsetChange = this.handleOffsetChange.bind(this);
    }

    handleOffsetChange(data) {
        this.setState({
            leftToggle: !data.leftToggle,
            rightToggle: !data.rightToggle,
        }, () => {
            this.offset = data.offset;
        });
    }

    render() {
        return(
            <ItemGridContainerHorisontalView
                leftToggle={this.state.leftToggle}
                rightToggle={this.state.rightToggle}
                gridRef={grid => this.grid = grid}
                items={this.items}
                itemBasis={this.itemBasis}
                offset={this.offset}
                selectedIndex={this.selectedIndex}
                onMoveForward={() => this.grid.move()}
                onMoveBack={() => this.grid.move(-1)}
                onChange={this.handleOffsetChange}
                onIndexChange={this.onIndexChange}/>
        )
    } 
}
ItemGridHorisontal.defaultProps = {
    items: Array.apply(null, Array(9)).map(() => ""),
    itemBasis: 70,
    offset: 0,
    selectedIndex: 0,
    onIndexChange: () => {},
}

export class ItemGridVertical extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            leftToggle: false,
            rightToggle: false,
        }

        this.onIndexChange = props.onIndexChange;

        this.items = props.items;
        this.offset = props.offset;
        this.itemBasis = props.itemBasis;
        this.selectedIndex = props.selectedIndex,

        this.handleOffsetChange = this.handleOffsetChange.bind(this);
    }

    handleOffsetChange(data) {
        this.setState({
            leftToggle: !data.leftToggle,
            rightToggle: !data.rightToggle,
        });
    }

    render() {
        return(
            <ItemGridContainerVerticalView
                leftToggle={this.state.leftToggle}
                rightToggle={this.state.rightToggle}
                gridRef={grid => this.grid = grid}
                items={this.items}
                itemBasis={this.itemBasis}
                offset={this.offset}
                selectedIndex={this.selectedIndex}
                onMoveForward={() => this.grid.move()}
                onMoveBack={() => this.grid.move(-1)}
                onChange={this.handleOffsetChange}
                onIndexChange={this.onIndexChange}/>
        )
    } 
}
ItemGridVertical.defaultProps = {
    items: Array.apply(null, Array(9)).map(() => ""),
    itemBasis: 70,
    offset: 0,
    selectedIndex: 0,
    onIndexChange: () => {},
}

class ItemGrid extends React.Component {
    constructor(props) {
        super(props);

        this.state = Object.assign({}, props, {
            dimensions: {
                width: -1,
                height: -1,
            }
        });
    }

    handleIndexChange(index) {
        this.setState({
            selectedIndex: index,
        }, () => {
            if(this.state.onIndexChange(index))
                this.state.onIndexChange(index);
        });
    }

    render() {
        const {width, height} = this.state.dimensions;

        return(
            <Measure
                bounds
                onResize={(contentRect) => {this.setState({dimensions: contentRect.bounds})}}>
                {({measureRef}) => 
                    <div ref={measureRef}>
                        {
                              width / Math.max(height, 1) >= 1
                            ? <ItemGridHorisontal
                                selectedIndex={this.state.selectedIndex}
                                items={this.state.items}
                                onIndexChange={this.handleIndexChange.bind(this)}/>
                            : <ItemGridVertical
                                selectedIndex={this.state.selectedIndex}
                                items={this.state.items}
                                onIndexChange={this.handleIndexChange.bind(this)}/>
                        }
                    </div>
                }
            </Measure>
        )
    }
}

export default ItemGrid;