import React,{useState,useEffect} from "react";
import '../static/style/components/Header.css'
import {Row,Col,Menu,Icon} from 'antd'
import Router from "next/router";
import Link from "next/link";
import axios from 'axios'
import servicePath from "../config/apiUrl";

const Header=()=> {
    const [navArray , setNavArray] = useState([])
    //用useEffect获取远程数据，文章的类型
    useEffect(()=>{

        const fetchData = async ()=>{
            const result= await axios(servicePath.getTypeInfo).then(
                (res)=>{
                    setNavArray(res.data.data)
                    return res.data.data
                }
            )
            setNavArray(result)
        }
        fetchData()


    },[])

    //跳转到列表页的函数
    //key值指的是数据库中代表文章类别的id
    const handleClick = (e)=>{
        if(e.key==0){
            Router.push('/index')
        }else{
            Router.push('/list?id='+e.key)
        }


    }

    return(
        <div className="header">
            <Row type="flex" justify="center">
                <Col xs={24} sm={24} md={14} lg={12} xl={10}>
                    <span className="header-logo">dzy</span>
                    <span className="header-text">个人博客开发</span>
                </Col>
                <Col xs={0} sm={0} md={10} lg={12} xl={14}>
                    {/*首页key=0，其他页的key由数据库查询得到*/}
                    <Menu mode="horizontal" onClick={handleClick}>
                        <Menu.Item key="0">
                            <Icon type="home"/>
                            首页
                        </Menu.Item>

                        {
                            navArray.map((item)=>{
                                return(
                                    <Menu.Item key={item.id}>
                                        <Icon type={item.icon} />
                                        {item.typeName}
                                    </Menu.Item>
                                )
                            })
                        }

                    </Menu>
                </Col>
            </Row>
        </div>
        )

}

export default Header