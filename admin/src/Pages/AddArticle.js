import React,{useState,useEffect} from 'react';
import marked from 'marked'
import '../static/AddArticle.css'
import axios from 'axios'
import servicePath from "../config/apiUrl";
import { Row, Col ,Input, Select ,Button ,DatePicker ,message} from 'antd'

const { Option } = Select
const { TextArea } = Input

function AddArticle(props){

    const [articleId,setArticleId] = useState(0)  // 文章的ID，如果是0说明是新增加，如果不是0，说明是修改
    const [articleTitle,setArticleTitle] = useState('')   //文章标题
    const [articleContent , setArticleContent] = useState('')  //markdown的编辑内容
    const [markdownContent, setMarkdownContent] = useState('预览内容') //html内容
    const [introducemd,setIntroducemd] = useState()            //简介的markdown内容
    const [introducehtml,setIntroducehtml] = useState('等待编辑') //简介的html内容
    const [showDate,setShowDate] = useState()   //发布日期
    const [typeInfo ,setTypeInfo] = useState([]) // 文章类别信息
    const [selectedType,setSelectType] = useState('请选择类别') //选择的文章类别

    //第二个空数组[]代表进入页面只执行一次
    useEffect(()=>{
        //获取文章类型
        getTypeInfo()
        //获取文章ID，判断是修改还是增加，如果进入此页面时传了值（文章id）
        //就是要修改这篇文章，否则articleId就是0，代表新增一篇文章
        let tmpId = props.match.params.id
        if(tmpId){
            setArticleId(tmpId)
            getArticleById(tmpId)
        }
    },[])

    marked.setOptions({
        renderer:  new marked.Renderer(),
        gfm: true,
        pedantic: false,
        sanitize: false,
        tables: true,
        breaks: false,
        smartLists: true,
        smartypants: false,
    });

    const changeContent = (e)=>{
        setArticleContent(e.target.value)
        let html=marked(e.target.value)
        setMarkdownContent(html)
    }

    const changeIntroduce = (e)=>{
        setIntroducemd(e.target.value)
        let html=marked(e.target.value)
        setIntroducehtml(html)
    }

    //从中台得到文章类别信息
    //而且带有路由守护
    const getTypeInfo =()=>{
        axios({
            method:'get',
            url:servicePath.getTypeInfo,
            header:{ 'Access-Control-Allow-Origin':'*' },
            //允许跨域检验cookie，中间件就是用来检验cookie的
            withCredentials: true
        }).then(
            res=>{
                if(res.data.data=="没有登录"){
                    localStorage.removeItem('openId')
                    props.history.push('/')
                }else{
                    setTypeInfo(res.data.data)
                }
            }
        )
    }

    //选择类别根据选择进行变化,把选中的value设置为SelectType的值
    const selectTypeHandler =(value)=>{
        setSelectType(value)
    }

    //点击后暂存文章的函数
    const tempSaveArticle = ()=>{

        let dataPropsTemp={}   //传递到接口的参数
        dataPropsTemp.type_id = selectedType
        dataPropsTemp.title = articleTitle
        dataPropsTemp.article_content =articleContent
        dataPropsTemp.introduce =introducemd
        let datetext= showDate.replace('-','/') //把字符串转换成时间戳
        dataPropsTemp.addTime =(new Date(datetext).getTime())/1000

        //判断是保存还是修改，如果等于0就是新增，不是0的话，id就代表文章id
        if(articleId==0){
            dataPropsTemp.is_ok=0
            console.log('articleId=:'+articleId)
            dataPropsTemp.view_count =Math.ceil(Math.random()*100)+1000
            axios({
                method:'post',
                url:servicePath.addArticle,
                data:dataPropsTemp,
                //前端和后端共享session，允许跨域的cookie（session就是一种cookie）
                withCredentials: true
            }).then(
                res=>{
                    setArticleId(res.data.insertId)
                    if(res.data.isSuccess){
                        message.success('文章暂存成功')
                    }else{
                        message.error('文章暂存失败');
                    }

                }
            )
        }else{  //如果是修改文章
            dataPropsTemp.is_ok=0

            dataPropsTemp.id = articleId
            axios({
                method:'post',
                url:servicePath.updateArticle,
                header:{ 'Access-Control-Allow-Origin':'*' },
                data:dataPropsTemp,
                withCredentials: true
            }).then(
                res=>{

                    if(res.data.isSuccess){
                        message.success('文章暂存成功')
                    }else{
                        message.error('暂存失败');
                    }


                }
            )
        }
    }

    //点击发布文章后对应的函数
    const saveArticle = ()=>{
        if(!selectedType){
            message.error('必须选择文章类别')
            return false
        }else if(!articleTitle){
            message.error('文章名称不能为空')
            return false
        }else if(!articleContent){
            message.error('文章内容不能为空')
            return false
        }else if(!introducemd){
            message.error('简介不能为空')
            return false
        }else if(!showDate){
            message.error('发布日期不能为空')
            return false
        }
        let dataProps={}   //传递到接口的参数
        dataProps.type_id = selectedType
        dataProps.title = articleTitle
        dataProps.article_content =articleContent
        dataProps.introduce =introducemd
        let datetext= showDate.replace('-','/') //把字符串转换成时间戳
        dataProps.addTime =(new Date(datetext).getTime())/1000

        //判断是保存还是修改，如果等于0就是新增，不是0的话，id就代表文章id
        if(articleId==0){
            dataProps.is_ok=1
            console.log('articleId=:'+articleId)
            dataProps.view_count =Math.ceil(Math.random()*100)+1000
            axios({
                method:'post',
                url:servicePath.addArticle,
                data:dataProps,
                //前端和后端共享session，允许跨域的cookie（session就是一种cookie）
                withCredentials: true
            }).then(
                res=>{
                    setArticleId(res.data.insertId)
                    if(res.data.isSuccess){
                        message.success('文章添加成功')
                    }else{
                        message.error('文章添加失败');
                    }

                }
            )
        }else{  //如果是修改文章
            dataProps.is_ok=1

            dataProps.id = articleId
            axios({
                method:'post',
                url:servicePath.updateArticle,
                header:{ 'Access-Control-Allow-Origin':'*' },
                data:dataProps,
                withCredentials: true
            }).then(
                res=>{

                    if(res.data.isSuccess){
                        message.success('文章修改成功')
                    }else{
                        message.error('修改失败');
                    }


                }
            )
        }
    }

    const getArticleById = (id)=>{
        axios(servicePath.getArticleById+id,{
            withCredentials: true,
            header:{ 'Access-Control-Allow-Origin':'*' }
        }).then(
            res=>{
                //let articleInfo= res.data.data[0]
                setArticleTitle(res.data.data[0].title)
                setArticleContent(res.data.data[0].article_content)
                let html=marked(res.data.data[0].article_content)
                setMarkdownContent(html)
                setIntroducemd(res.data.data[0].introduce)
                let tmpInt = marked(res.data.data[0].introduce)
                setIntroducehtml(tmpInt)
                setShowDate(res.data.data[0].addTime)
                setSelectType(res.data.data[0].typeId)

            }
        )
    }

    return (
        <div>
            <Row gutter={5}>
                <Col span={18}>
                    <Row gutter={10} >
                        <Col span={20}>
                            <Input
                                value={articleTitle}
                                onChange={e=>{setArticleTitle(e.target.value)}}
                                placeholder="博客标题"
                                size="large" />
                        </Col>
                        <Col span={4}>
                            &nbsp;
                            <Select defaultValue={selectedType} size="large" onChange={selectTypeHandler}>
                                {/*typeInfo在页面初始化时就利用useEffect从数据库中查到了*/}
                                {
                                    typeInfo.map((item,index)=>{
                                        return (<Option key={index} value={item.id}>{item.typeName}</Option>)
                                    })
                                }
                            </Select>
                        </Col>
                    </Row>
                    <br/>
                    <Row gutter={10} >
                        <Col span={12}>
                            <TextArea
                                className="markdown-content"
                                rows={35}
                                placeholder="文章内容"
                                value={articleContent}
                                onChange={changeContent}
                            />
                        </Col>
                        <Col span={12}>
                            <div
                                className="show-html" dangerouslySetInnerHTML={{__html:markdownContent}}>

                            </div>
                        </Col>
                    </Row>
                </Col>
                <Col span={6}>
                    <Row>
                        <Col span={24}>
                            <Button  size="large" onClick={tempSaveArticle}>暂存文章</Button>&nbsp;
                            <Button type="primary" size="large" onClick={saveArticle}>发布文章</Button>
                            <br/>
                        </Col>

                        <Col span={24}>
                            <br/>
                            <TextArea
                                rows={4}
                                placeholder="文章简介"
                                value={introducemd}
                                onChange={changeIntroduce}
                            />
                            <br/><br/>
                            <div  className="introduce-html" dangerouslySetInnerHTML={{__html:introducehtml}}>

                            </div>
                        </Col>

                        <Col span={12}>
                            <div className="date-select">
                                <DatePicker
                                    onChange={(date,dateString)=>{setShowDate(dateString)}}
                                    placeholder="发布日期"
                                    size="large"
                                />
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    )
}
export default AddArticle