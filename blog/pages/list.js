import React ,{useState,useEffect}from 'react'
import Head from 'next/head'
import {List,Row,Col,Icon,Breadcrumb} from "antd";
import Header from "../components/Header";
import Author from "../components/Author";
import Advert from "../components/Advertise";
import Footer from "../components/Footer";
import axios from 'axios'
import  servicePath  from '../config/apiUrl'
import Link from 'next/link'
import "../static/style/pages/index.css"
import marked from "marked";
import hljs from "highlight.js";
import 'highlight.js/styles/monokai-sublime.css'



const MyList = (res) => {
    const [mylist,setMylist]=useState(res.list.data)

    const [bg,setBg]=useState("../static/img/bg4.png")
    const [type,setType]=useState(" ")


    //每次界面有变化都会重新给mylist赋值
    useEffect(()=>{
        setMylist(res.list.data)
        switch(res.typeId){
            case "1":
                setBg("../static/img/bg6.png");
                setType("工作")
                break;
            case "2":
                setBg("../static/img/bg7.png");
                setType("读书")
                break;
            case "3":
                setBg("../static/img/bg4.png");
                setType("生活")
                break;
        }
    })

    const renderer=new marked.Renderer()
    marked.setOptions({
        renderer: renderer, //这个是必须填写的，你可以通过自定义的Renderer渲染出自定义的格式
        gfm: true, //启动类似Github样式的Markdown,填写true或者false
        pedantic: false, //只解析符合Markdown定义的，不修正Markdown的错误。填写true或者false
        sanitize: false, //原始输出，忽略HTML标签，这个作为一个开发人员，一定要写flase
        tables: true,  //支持Github形式的表格，必须打开gfm选项
        breaks: false, //支持Github换行符，必须打开gfm选项，填写true或者false
        smartLists: true, //优化列表输出，这个填写ture之后，你的样式会好看很多，所以建议设置成ture
        smartypants: false,
        // 高亮显示规则 ，这里我们将使用highlight.js来完成
        highlight: function (code) {
            return hljs.highlightAuto(code).value;
        }
    });


    return(
        <div>
            <Head>
                <title>list</title>
            </Head>
            <Header />

            {/*next.js只支持下面这种形式的css，本项目的css借助babel仍然用传统的css导入方式
            这导致背景图片等性质不能设置，此属性必须用下面的方式*/}
            <style jsx>
                {`
                    .background {background-image: url(${bg});}
                `}
            </style>

            <div className="background" >
                <div className="whiteBackground">
                    <Row className="comm-main" type="flex" justify="center">
                        <Col className="comm-left" span={16}  >

                            <div className="bread-div">
                                <Breadcrumb>
                                    <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
                                    <Breadcrumb.Item>{type}</Breadcrumb.Item>
                                </Breadcrumb>
                            </div>

                            <List
                                header={<div></div>}
                                itemLayout="vertical"
                                dataSource={mylist}
                                renderItem={item=>(
                                    <List.Item>
                                        <div className="list-title">
                                            <Link href={{pathname:'/details',query:{id:item.id}}}>
                                                <a>{item.title}</a>
                                            </Link>
                                        </div>

                                        <div className="list-icon">
                                            <span><Icon type="calendar"/>{item.addTime}  </span>
                                            <span><Icon type="folder"/>{item.typeName}  </span>
                                            <span><Icon type="fire"/>{item.view_count} </span>
                                        </div>

                                        {/*//首页中的文章介绍也支持markdown解析*/}
                                        <div className="list-context"
                                             dangerouslySetInnerHTML={{__html:marked(item.introduce)}}
                                        ></div>

                                    </List.Item>
                                )}
                            />


                        </Col>

                        <Col span={1}/>

                        <Col className="comm-right" span={4}>
                            <Author/>
                            <Advert/>
                        </Col>
                    </Row>
                    <Footer/>
                </div>
            </div>


        </div>
    )
}

// 这个context是由header.js传来的动态值，即代表文章种类的id
MyList.getInitialProps = async (context)=>{

    let id =context.query.id

    const promise = new Promise((resolve)=>{
        axios(servicePath.getListById+id).then(
            (res)=>resolve({list:res.data,typeId:id})
        )
    })
    return await promise
}

export default MyList
