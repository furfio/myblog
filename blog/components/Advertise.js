import React from "react";
import '../static/style/components/Advertise.css'
import {Card} from "antd";
import axios from "axios";
import servicePath from "../config/apiUrl";
import MyList from "../pages/list";
const Advert=()=>{
    // console.log(list)
    return(
        <div className="ad-div comm-box">
            <Card title="Tips" hoverable={true} bordered={false} style={{
                width: 200
            }}>
                <p>佛系</p>
                <p>佛系</p>
                <p>佛系</p>
            </Card>
        </div>
    )
}


export default Advert