import {Avatar,Divider,Popover,message} from "antd";
import React from "react";
import '../static/style/components/author.css'

const alipay_pic=(
    <div>
        <img src='../static/img/alipay.jpg'/>
    </div>
)

const Author=()=>{
    return(
        <div className="author-div comm-box">
            <div>
                <Popover content="博主思考中......" placement="rightTop">
                    <Avatar size={100} src="../static/img/me.jpg"/>
                </Popover>

                <br/><br/>
                <div className="author-introduction">
                    偶尔发点牢骚
                    <Divider>社交账号</Divider>
                    <Popover content={<a href="https://github.com/furfio">https://github.com/furfio</a>} title="求红心，老铁们">
                        <Avatar size="28"  icon="github"  className="account"/>
                    </Popover>
                    <Popover content="It's a secret">
                        <Avatar size="28" icon="qq" className="account"/>
                    </Popover>
                    <Popover content={alipay_pic} title="不会真要给我打钱吧">
                        <Avatar size="28" icon="alipay-circle" className="account"/>
                    </Popover>



                </div>
            </div>
        </div>
    )
}

export default Author