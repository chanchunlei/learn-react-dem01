import React, { Component,Fragment } from 'react';
import TodoItem from './TodoItem';
import axios from 'axios'
import './todolist.css';

class TodoList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue:'',
            list: []
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleBtnClick = this.handleBtnClick.bind(this);
        this.handleItemDelete = this.handleItemDelete.bind(this);
    }
    //在组件即将被挂载到页面之前自动执行
    componentWillMount() {  //请求数据放入这里,可能会有问题
        console.log('componentWillMount');
    }
    //在组件即将被挂载到页面之后自动执行
    componentDidMount() {   //请求数据放在这里
        console.log('componentDidMount');
        axios.get('/api/todolist')
            .then((res) => {
                console.log(res)
                this.setState(() => {
                    return {
                        list: [...res.data]
                    }
                })
            })
            .catch((error) => {
                console.log(error)
            })


    }
    //组件在更新之前,自动执行; 返回 true 会更新,返回 false 不更新
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        console.log('shouldComponentUpdate');
        return true;
    }
    //shouldComponentUpdate返回 true 会执行,返回 false 不执行
    componentWillUpdate(nextProps, nextState, nextContext) {
        console.log('componentWillUpdate');
    }
    //组件更新完成之后会自动执行
    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('componentDidUpdate');
    }
    //组件卸载的时候自动执行
    componentWillUnmount() {
        console.log('componentWillUnmount');
    }

    render() {
        //当组件的state或者props发生改变时,render函数会重新执行
        console.log('render')
        return (
            <Fragment>
                <div>
                    <label htmlFor="inp">输入内容</label>
                    <input
                        id="inp"
                        className="inp_name"
                        value={this.state.inputValue}
                        onChange={this.handleInputChange}
                        ref={(input) => {this.input = input}}
                    />
                    <button onClick={this.handleBtnClick}>提交</button>
                </div>
                <ul>
                    {this.getTodoItem()}
                </ul>
            </Fragment>
        )
    }
    getTodoItem() { //封装下来
        return this.state.list.map((item,index) => {
            return (
                <TodoItem
                    key={index}
                    content={item}
                    index={index}
                    deleteItem={this.handleItemDelete}
                />

            )
        })
    }
    handleInputChange(e) { //改变input
        //console.log(e.target.value);
        const val = e.target.value;
        this.setState(() => {
            return {
                inputValue: val
            }
        });
        // this.setState({
        //     inputValue: e.target.value
        // });
    }
    handleBtnClick() { //提交
        this.setState((prevState) => ({
            list: [...prevState.list, prevState.inputValue],
            inputValue: ''
        }));

        // this.setState({
        //     list: [...this.state.list, this.state.inputValue],
        //     inputValue: ''
        // })
    }
    handleItemDelete(idx) { //删除
        this.setState((prevState)=>{
            const list = [...prevState.list];
            list.splice(idx,1);
            return {list};
        })
    }
}
export default TodoList;
