import React ,{useState}from 'react'
import Head from 'next/head'
import Link from "next/link";
import {List,Row,Col,Icon,Comment,Avatar,Card,Input,Search} from "antd";
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
    const { TextArea } = Input;
    const { Search } = Input;

    const [mylist,setMylist]=useState(list.list)//留言列表
    const [comment,setComment]=useState('')//留言内容
    const [name,setName]=useState('')//留言者姓名

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

   const addMessage = ()=>{
      if(name==='') {
            alert('请输入姓名')
            return false
        }else if(comment===''){
            alert('请输入留言')
            return false
        }
        let dataProps={}   //传递到接口的参数
        dataProps.who=name
        dataProps.message=comment
        console.log(dataProps)
        axios({
            method:'post',
            url:servicePath.addMessage,
            data:dataProps,
        }).then(
            res=>{
                if(res.data.isSuccess){
                    alert('留言添加成功')
                }else{
                    alert('留言添加失败')
                }

            }
        )
    }

    return(
        <div >
            <Head>
                <title>Home</title>
            </Head>
            <Header />
            {/*next.js只支持下面这种形式的css，本项目的css借助babel仍然用传统的css导入方式*/}
            {/*这导致背景图片等性质不能设置，此属性必须用下面的方式*/}
            <style jsx>
                {`
                    .background {background-image: url("../static/img/bg8.png");}
                `}
            </style>

            <div className="background" >
                <div className="whiteBackground">
                    <Row className="comm-main" type="flex" justify="center">
                        <Col className="comm-left" span={16}  >
                            <div className="list-title">
                                <p>博客简介</p>
                            </div>
                            <div className="list-icon">
                                <span><Icon type="calendar"/> 2020-02-23 00:00:00 </span>
                                <span><Icon type="folder"/>简介</span>
                                <span><Icon type="fire"/>100</span>
                            </div>
                            <div className="list-context"
                                 dangerouslySetInnerHTML={{__html:marked(
                                     "# 写在前面\n" +
                                         "~~~\n" +
                                         "此博客文章采用markdown格式编写\n" +
                                         "~~~\n" +
                                         "本博客仅供个人学习，浏览使用\n"+
                                         "### 具体文章请转到工作，图书，生活板块\n"+
                                         "# 欢迎留言！！"
                                     )
                                 }}
                            ></div>
                            <div className="addMessage">
                                <Row>
                                    <Col>
                                        <TextArea
                                            placeholder="您的留言是？"
                                            value={comment}
                                            onChange={e=>{setComment(e.target.value)}}
                                            rows={4} />
                                    </Col>
                                    <br />
                                    <Col>
                                        <Search
                                            value={name}
                                            onChange={e=>{setName(e.target.value)}}
                                            placeholder="您的名字是？"
                                            enterButton="添加"
                                            size="large"
                                            onSearch={addMessage}
                                        />
                                    </Col>
                                </Row>

                            </div>
                        </Col>
                        <Col span={1}/>
                        <Col className="comm-right"  xs={0} sm={0} md={4} lg={4} xl={4}>
                            <Author/>

                            <Card title="留言区" hoverable={true} bordered={false} style={{
                                width: 200
                            }}>
                                <List
                                    header={<div></div>}
                                    itemLayout="vertical"
                                    dataSource={mylist}
                                    renderItem={item=>(
                                        <li>
                                            <Comment
                                                avatar={
                                                    <Avatar style={{ backgroundColor: '#87d068' }} icon="user" />
                                                }
                                                author={item.who}
                                                content={item.message}
                                            />
                                        </li>
                                    )}
                                />
                            </Card>

                        </Col>
                    </Row>
                    <Footer/>
                </div>

            </div>


        </div>
    )
}

//利用Axios从远端获取留言数据
Home.getInitialProps = async ()=>{
    const promise = new Promise((resolve)=>{
        axios(servicePath.getMessageList).then(
            (res)=>{
                console.log(res.data)
                //必须写resolve(res.data)，这不是简单地返回一个值，这个data是固定的名称
                // ，而不是在中台自己封装的json键值
                resolve(res.data)

            }
        )
    })
    return await promise
}
// Home.getInitialProps = async ()=>{
//     const promise = new Promise((resolve)=>{
//         axios(servicePath.getArticleList).then(
//             (res)=>{
//                 // console.log('远程获取数据结果:',res.data.data)
//                 resolve(res.data)
//             }
//         )
//     })
//
//     // return await promise
// }

export default Home
