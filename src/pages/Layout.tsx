import React from 'react'
import { NavLink, Route } from 'react-router-dom'
import Home from './Home'
import AddMovie from './AddMovie'
import MovieList from './MovieList'
import EditMovie from './EditMovie'

import { Layout, Menu } from 'antd';

const { Header, Sider, Content } = Layout;

const _Layout: React.FC = function () {
    return (
        <div className='container'>
            <Layout>
                <Header className='header'>
                    <NavLink to='/'>电影管理系统</NavLink>
                </Header>
                <Layout>
                    <Sider>
                        <Menu
                            mode="inline"
                            theme="dark"
                        >
                            <Menu.Item key="9">
                                <NavLink to='/'>首页</NavLink>
                            </Menu.Item>
                            <Menu.Item key="10">
                                <NavLink to='/movie'>电影列表</NavLink>
                            </Menu.Item>
                            <Menu.Item key="11">
                                <NavLink to='/movie/add'>添加电影</NavLink>
                            </Menu.Item>
                        </Menu>
                    </Sider>
                    <Content>
                        <div className='main'>
                            <Route path='/' component={Home} exact={true}></Route>
                            <Route path='/movie' exact={true} component={MovieList}></Route>
                            <Route path='/movie/add' component={AddMovie}></Route>
                            <Route path='/movie/edit/:id' component={EditMovie}></Route>
                        </div>
                    </Content>
                </Layout>
            </Layout>
        </div>
    )
}

export default _Layout