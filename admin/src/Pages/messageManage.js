import React,{useState,useEffect} from 'react';
import '../static/ArticleList.css'
import { List ,Row ,Col , Modal ,message ,Button,Tag} from 'antd';
import axios from 'axios'
import  servicePath  from '../config/apiUrl'
//即只用Model中的confirm，把他单独解构出来
const { confirm } = Modal;
function MessageList(props){

    const [list,setList]=useState([])

    useEffect(()=>{
        getList()
    },[])  //数组为空，表示只加载一次

    //得到留言列表
    const getList = ()=>{
        axios({
            method:'get',
            url: servicePath.getMessageList,
            withCredentials: true,
            header:{ 'Access-Control-Allow-Origin':'*' }
        }).then(
            res=>{
                setList(res.data.list)

            }
        )
    }

    //发布留言
    const allowMessage = (id)=>{
        //用antd，Modal里的confirm组件
        confirm({
            title: '确定要发布这条留言吗?',
            content: '如果你点击OK按钮，所有人都会看到这条留言。',
            onOk() {
                axios({
                    method:'get',
                    url:servicePath.allowMessage+id,
                    header:{ 'Access-Control-Allow-Origin':'*' },
                    //允许跨域检验cookie，中间件就是用来检验cookie的
                    withCredentials: true
                }).then(
                    res=>{
                        if(res.data.data=="没有登录"){
                            localStorage.removeItem('openId')
                            props.history.push('/')
                        }else{
                            message.success('留言添加成功，请刷新页面')
                        }
                    }
                )
            },
            onCancel() {
                message.success('没有任何改变')
            },
        });
    }



    return (
        <div>
            <List
                header={
                    <Row className="list-div">
                        {/*//span=8表示24格布局，占用8格*/}
                        <Col span={5}>
                            <b>留言人</b>
                        </Col>

                        <Col span={13}>
                            <b>留言</b>
                        </Col>
                        <Col span={3}>
                            <b>留言状态</b>
                        </Col>
                        <Col span={3}>
                            <b>操作</b>
                        </Col>
                    </Row>

                }
                bordered
                dataSource={list}
                renderItem={item => (
                    <List.Item>
                        <Row className="list-div">
                            <Col span={5}>
                                {item.who}
                            </Col>
                            <Col span={13}>
                                {item.message}
                            </Col>

                            <Col span={3}>
                                <Tag color={item.is_ok==0?'volcano':'cyan'}>{item.is_ok==0?'未发布':'已发布'}</Tag>
                            </Col>
                            <Col span={3}>
                                {/*<Tag color={item.is_ok==0?'volcano':'cyan'}>{item.is_ok==0?'未发布':'已发布'}</Tag>*/}
                                <Button type="primary"
                                         onClick={()=>{allowMessage(item.id)}}
                                >发布留言</Button>
                            </Col>

                        </Row>

                    </List.Item>
                )}
            />

        </div>
    )

}

export default MessageList