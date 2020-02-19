import React ,{useState}from 'react'
import Head from 'next/head'
import Link from "next/link";
import {List,Row,Col,Icon} from "antd";
import Header from "../components/Header";
import '../static/style/pages/index.css'
import Author from "../components/Author";
import Advert from "../components/Advertise";
import Footer from "../components/Footer";
import axios from 'axios';
import servicePath from "../config/apiUrl";
import marked from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'

//传入的参数list就是从数据库取回来的数据，由下面的axios组件得到
//下面返回的res.data即为list，而list.data=res.data.data
//因为中台查到数据库时多加了一层json，data:xxxx
const Home = (list) => {
    const [mylist,setMylist]=useState(list.data)

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
                <title>Home</title>
            </Head>
            <Header />

            <Row className="comm-main" type="flex" justify="center">
                <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}  >
                    <List
                        header={<div>最新日志   </div>}
                        itemLayout="vertical"
                        dataSource={mylist}
                        renderItem={item=>(
                            <List.Item>
                                <div className="list-title">
                                    {/*把id传给/details，根据id查询文章*/}
                                    <Link href={{pathname:'/details',query:{id:item.id}}}>
                                        <a>{item.title}</a>
                                    </Link>
                                </div>

                                <div className="list-icon">
                                    <span><Icon type="calendar"/>{item.addTime}  </span>
                                    <span><Icon type="folder"/>{item.typeName} </span>
                                    <span><Icon type="fire"/>{item.view_count}人  </span>
                                </div>
                            {/*//首页中的文章介绍也支持markdown解析*/}
                                <div className="list-context"
                                    dangerouslySetInnerHTML={{__html:marked(item.introduce)}}
                                ></div>

                            </List.Item>
                        )}
                    />
                </Col>

                <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
                    <Author/>
                    <Advert/>
                </Col>
            </Row>

            <Footer/>
        </div>
    )
}

//利用Axios从远端获取数据
Home.getInitialProps = async ()=>{
    const promise = new Promise((resolve)=>{
        axios(servicePath.getArticleList).then(
            (res)=>{
                console.log('远程获取数据结果:',res.data.data)
                resolve(res.data)
            }
        )
    })

    return await promise
}

export default Home
