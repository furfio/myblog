import React,{useState} from 'react';
import { Layout, Menu, Breadcrumb, Icon ,Tag} from 'antd';
import '../static/AdminIndex.css'
import {Route} from "react-router-dom"
import AddArticle from "./AddArticle";
import ArticleList from "./ArticleList";
import MessageList from "./messageManage";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
//用https://ant.design/components/layout-cn/里现成的布局

function AdminIndex(props){

    //这个变量是页面侧边栏收起合住的状态变量
    const [collapsed,setCollapsed] = useState(false)

    const onCollapse = collapsed => {
        setCollapsed(collapsed)
    };

    const handleClickArticle = e=>{
        if(e.key=='AddArticle'){
            props.history.push('/index/add')
        }else if(e.key=='ArticleList'){
            props.history.push('/index/list')
        }else if(e.key=='MessageList'){
            props.history.push('/index/message')
        }

    }

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider  collapsible collapsed={collapsed} onCollapse={onCollapse}>
                <div className="logo" />
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                    <Menu.Item
                        key="1">
                        <Icon type="pie-chart" />
                        <span>工作台</span>
                    </Menu.Item>
                    <SubMenu
                        key="sub1"
                        onClick={handleClickArticle}
                        title={
                            <span>
                                <Icon type="user" />
                                <span>文章管理</span>
                            </span>
                        }
                    >
                        <Menu.Item key="AddArticle">
                            <Icon type="edit" />
                            添加文章
                        </Menu.Item>
                        <Menu.Item key="ArticleList">
                            <Icon type="ordered-list" />
                            文章列表
                        </Menu.Item>

                    </SubMenu>

                    <Menu.Item
                        onClick={handleClickArticle}
                        key="MessageList">
                        <Icon type="message" />
                        <span>留言管理</span>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout>
                <Header style={{ background: '#fff', padding: 0 }} />
                <Content style={{ margin: '0 16px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>后台管理</Breadcrumb.Item>
                        <Breadcrumb.Item>工作台</Breadcrumb.Item>
                    </Breadcrumb>
                    <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                        {/*把add article等子组件放到这里，根据按钮显选择显示添加文章还是
                        修改文章*/}
                        <div>
                            <Route path="/index/add/" exact  component={AddArticle} />
                            <Route path="/index/list/" exact  component={ArticleList} />
                            <Route path="/index/message/" exact  component={MessageList} />
                            <Route path="/index/add/:id" exact  component={AddArticle} />
                        </div>
                        <img src={require('../static/img/hello.png')} width="200px"/>

                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Dzy.com</Footer>
            </Layout>
        </Layout>
    )

}

export default AdminIndex