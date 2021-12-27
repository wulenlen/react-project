import React from 'react';
import ReactDOM from 'react-dom'
import {List} from './components/List'

// 创建虚拟节点
// 参数1：标签名
// 参数2：一个对象配置标签属性
// 参数3：子节点，其他的虚拟dom
// 参数n：其他子节点
// const myh1 = React.createElement('h1', null, 'hello')
// let a = 10 //值还可以是jsx语句
// jsx，混合写入js表达式：{js表达式}
// 为jsx中的元素添加类名，className代替class，htmlFor代替label的for属性
// const myh1 = <h1>hello {a}</h1>    


// 参数1：虚拟节点或jsx(若是jsx，则先将其用createElement转换成虚拟节点，再进行渲染)
// 参数2：容器
// ReactDOM.render(
//     myh1,
//     document.getElementById('app')
// )

// 使用构造函数创建组件，组件函数必须返回一个合法的jsx虚拟dom
// 只有props属性，只可读，没有私有的数据和生命周期函数，无状态组件
// 参数1：属性props是一个对象
// function Hello(props) {
//     return <h1>hello{props.name}</h1>
// }

// const user = {
//     name: 'hahah'
// }

// ReactDOM.render(
//     <Hello name={user.name}></Hello>,
//     document.getElementById('app')
// )

// 使用class关键字创建组件
// 可以有自己的私有数据，有state状态，可读可写
// state存放可操作的数据
// 添加style样式：style={{color: 'red'}}或者传入一个样式对象(style={styleObj})
// class Animal extends React.Component {
//     // constructor(name) {
//     //     this.name = name
//     // }

//     render() {
//         return <h1 style={{color: 'red'}}>混合</h1>
//     }
// }

// const user = {
//     name: 'hahah'
// }

// ReactDOM.render(
//     <Animal></Animal>,
//     document.getElementById('app')
// )

import services from './service'

services.getCaseInfo({
    id:133,
    name: 'dshf'
}).then(res => {
    console.log(res, 333333)
})


ReactDOM.render(
    <List>111</List>,
    document.getElementById('app')
)