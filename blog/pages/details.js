import React from 'react'
import Head from 'next/head'
import {Row,Col,Breadcrumb,Icon,Affix} from "antd";
import Header from "../components/Header";
import "../static/style/pages/details.css"
import Author from "../components/Author";
import Advert from "../components/Advertise";
import Footer from "../components/Footer";
import axios from 'axios'
import "../static/style/pages/index.css"
import marked from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'
import Tocify from "../components/tocify.tsx";
import servicePath from "../config/apiUrl";

//下面的axio获取远端数据后传入props参数
const Details = (props) => {

    //下面这一段用别人写的tocify制作文章导航栏
    //level是指.md文件的标题等级，如#，## text是文字内容
    const tocify= new Tocify()


    const renderer=new marked.Renderer()

    renderer.heading = function(text, level, raw) {
        const anchor = tocify.add(text, level);
        return `<a id="${anchor}" href="#${anchor}" class="anchor-fix"><h${level}>${text}</h${level}></a>\n`;
    };
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

    let html = marked(props.article_content)

    return(
        <div>
            <Head>
                <title>Details</title>
            </Head>
            <Header />

            {/*next.js只支持下面这种形式的css，本项目的css借助babel仍然用传统的css导入方式
            这导致背景图片等性质不能设置，此属性必须用下面的方式*/}
            <style jsx>
                {`
                    .background {background-image: url("../static/img/bg4.png");}
                `}
            </style>

            <div className="background" >
                <div className="whiteBackground">
                    <Row className="comm-main" type="flex" justify="center">
                        <Col className="comm-left" span={16}  >
                            <div>
                                <div className="bread-div">
                                    <Breadcrumb>
                                        <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
                                        <Breadcrumb.Item>文章详情</Breadcrumb.Item>
                                    </Breadcrumb>
                                </div>
                                <br />

                                <div className="list-icon center">
                                    <span><Icon type="calendar"/>2020-02-17</span>
                                    <span><Icon type="folder"/>文章详情</span>
                                    <span><Icon type="fire"/>0人</span>
                                </div><br />

                                <div className="detailed-content"
                                     dangerouslySetInnerHTML={{__html:html}}
                                >
                                </div>
                            </div>
                        </Col>
                        <Col span={1}/>

                        <Col className="comm-right" span={4}>
                            <Author/>
                            <Advert/>
                            {/*放在Affix中的组件在页面滑动时位置不变*/}
                            {/*offsetTop={5}表示距离顶部距离为5*/}
                            <Affix offsetTop={5}>
                                <div className="detailed-nav comm-box">
                                    <div className="nav-title">文章目录</div>
                                    {tocify && tocify.render()}
                                </div>
                            </Affix>

                        </Col>
                    </Row>
                    <Footer/>
                </div>
            </div>

        </div>
    )
}

//传入的context参数中包含前端传向数据库的文章id
Details.getInitialProps = async(context)=>{

    console.log(context.query.id)
    let id =context.query.id
    const promise = new Promise((resolve)=>{

        axios(servicePath.getArticleById+id).then(
            (res)=>{
                console.log(res)
                resolve(res.data.data[0])
            }
        )
    })

    return await promise
}

export default Details
