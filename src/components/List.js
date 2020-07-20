import React from 'react';
import '@/assets/css/list.css'

const styleObj = {
    color: 'red',
    fontSize: '2em'
}
export class List extends React.Component {
    constructor() {
        super() 
        this.userList =[{
            name: '111',
            age: 1
        }, {
            name: '222',
            age: 2
        }, {
            name: '3333',
            age: 3
        }]
    }

    render() {
        const jsx = this.userList.map(item => <p className='text' key={item.name}>姓名：{item.name}，年龄: {item.age}</p>)
        return <div>
            {jsx}
        </div>
    }
}