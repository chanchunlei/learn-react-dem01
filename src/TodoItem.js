import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TodoItem extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    render() {
        //当父组件的render函数运行时,它的子组件render都将被重新运行
        const { content } =  this.props;
        return(
            <li onClick={this.handleClick}>
                {content}
            </li>
        )
    }
    handleClick() {
        const { index } =  this.props;
        this.props.deleteItem(index);
    }
    //一个组件要从父组件接受参数
    //只要父组件的render被重新执行了,子组件的这个生命周期函数就会被执行
    //如果这个组件第一次存在于父组件中,不会执行
    //如果这个组件之前已经存在于父组件中,才会执行
    componentWillReceiveProps(nextProps, nextContext) {
        console.log('child componentWillReceiveProps');
    }
}
TodoItem.propTypes = {
    content: PropTypes.string,
    deleteItem: PropTypes.func,
    index: PropTypes.number
}
export default TodoItem;
