import {Avatar,Divider} from "antd";
import React from "react";
import '../static/style/components/author.css'

const Author=()=>{
    return(
        <div className="author-div comm-box">
            <div>
                <Avatar size={100} src="http://img2.imgtn.bdimg.com/it/u=4012340114,240891972&fm=15&gp=0.jpg"/>
                <div className="author-introduction">
                    偶尔发点牢骚。
                    <Divider>社交账号</Divider>
                    <Avatar size="28" icon="github" className="account"/>
                    <Avatar size="28" icon="qq" className="account"/>
                    <Avatar size="28" icon="wechat" className="account"/>
                </div>
            </div>
        </div>
    )
}

export default Author