import App from 'next/app'
//把CSS进行全局引入.这样Ant Design就可以按需引入了。

//这个comm.css在_app.js中引入后，pages文件夹中的其他文件都默认引入了
//_app.js貌似是这些文件的底层文件
import 'antd/dist/antd.css'

import '../static/style/pages/comm.css'

export default App
