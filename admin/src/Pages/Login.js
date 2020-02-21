import React , {useState} from 'react';
import '../static/Login.css'
import 'antd/dist/antd.css';
import axios from 'axios'
import servicePath from "../config/apiUrl";
import { Card, Input, Icon,Button ,Spin,message } from 'antd';

//isLoading主要用于控制Spin组件是否进入加载状态，进入加载状态可以有效防止重复提交。
function Login(props){

    const [userName , setUserName] = useState('')
    const [password , setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const checkLogin = ()=>{
        setIsLoading(true)

        if(!userName){
            message.error('用户名不能为空')
            setTimeout(()=>{
                setIsLoading(false)
            },500)
            return false
        }else if(!password){
            message.error('密码不能为空')
            setTimeout(()=>{
                setIsLoading(false)
            },500)
            return false
        }
        let dataProps = {
            'userName':userName,
            'password':password
        }
        axios({
            method:'post',
            url:servicePath.checkLogin,
            data:dataProps,
            //前端和后端共享session
            withCredentials: true
        }).then(
            res=>{
                setIsLoading(false)
                if(res.data.data=='登录成功'){
                    localStorage.setItem('openId',res.data.openId)
                    //密码正确就跳转到首页
                    props.history.push('/index')
                }else{
                    message.error('用户名密码错误')
                }
            }
        )

        setTimeout(()=>{
            setIsLoading(false)
        },1000)
    }

    return (
        <div className="login-div">

            <Spin tip="Loading..." spinning={isLoading}>
                <Card title="dzy Blog  System" bordered={true} style={{ width: 400 }} >
                    <Input
                        id="userName"
                        size="large"
                        placeholder="Enter your userName"
                        prefix={<Icon type="user" style={{color:'rgba(0,0,0,.25)'}} />}
                        onChange={(e)=>{setUserName(e.target.value)}}
                    />
                    <br/><br/>
                    <Input.Password
                        id="password"
                        size="large"
                        placeholder="Enter your password"
                        prefix={<Icon type="key" style={{color:'rgba(0,0,0,.25)'}} />}
                        onChange={(e)=>{setPassword(e.target.value)}}
                    />
                    <br/><br/>
                    <Button type="primary" size="large" block onClick={checkLogin} > Login in </Button>
                </Card>
            </Spin>
        </div>
    )
}
export default Login