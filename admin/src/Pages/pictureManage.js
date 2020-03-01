import React,{useState,useEffect} from 'react';
import {List,Card} from 'antd'

function pictureManage() {
    const requireContext = require.context('../../../img', true, /^\.\/.*\.jpg$/)
    const projectImgs = requireContext.keys().map(requireContext);
    console.log(projectImgs)
    return(
        <div>
            <h1>图片请用ftp服务器上传至/www/wwwroot/myblog/img/</h1>
            <h1>图片引用地址 http://116.62.42.148:8888/xxx.jpg</h1>
            <br/>
            <br/>
            <br/>
            <h1>目前图片显示</h1>
            <List
                grid={{
                    gutter: 16,
                    xs: 1,
                    sm: 2,
                    md: 4,
                    lg: 4,
                    xl: 6,
                    xxl: 3,
                }}
                dataSource={projectImgs}
                renderItem={item => (
                    <List.Item>
                            <img
                                src={item} style={{height:"200px" ,width:"200px"}}
                            />
                            <p>{item.toString()}</p>
                    </List.Item>
                )}
            />
        </div>
    )
}

export default pictureManage