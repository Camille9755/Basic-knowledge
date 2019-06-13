# React项目总结
## 项目开发准备
    1). 项目描述: 整体业务功能/功能模块/主体的技术/开发模式
    2). 技术选型: 数据展现/用户交互/组件化, 后端, 前后台交互, 模块化, 项目构建/工程化, 其它
    3). API接口: 接口的4个组成部分, 接口文档, 对/调/测接口

## 聊天功能
### 1 .socket.io
    包装的H5 WebSocket和轮询---> 兼容性/编码简洁性
    包含2个包:
      socket.io: 用于服务器端
      socket.io-client: 用于客户端
    基本思想: 远程自定义事件机制
    	io: 服务器端核心的管理对象
        socket: 客户端与服务器的连接对象
    	服务器端：
    		io.on监视连接(当有一个客户连接上时回调)
        	on(name, function(data){}): 绑定监听，接收消息
       		emit(name, data):发送消息
### 2. 聊天组件功能:
    后台接口
    chat静态组件
    发送消息与接收消息
    获取消息列表显示
    接收消息显示
    完善列表显示
### 3. 消息列表
    对消息进行分组保存, 且只保存每个组最后一条消息
    对于对象容器和数组容器的选择
    数组排序

### 4. 未读消息数量显示 
    每个组的未读数量统计
    总未读数量统计显示
    查看消息后, 更新未读数量

## 聊天功能细化
### 1.后台：不是我负责，了解一下代码结构就可以了
### 2.chat发消息
* 点击发送就触发handleSend函数(:userid是在main映射路由时指定的)
* handleSend逻辑：
	* 1.给输入框绑定Onchange收集状态数据
	* 2.创建一个异步action（sendMsg）用于发消息
	* 3.清除输入数据，指定input的value值为content

### 3.收发消息
* 在action中引入Socket.io
* 封装initIO函数
* 在sendMsg中发消息

### 4.登录一个账户后，获取用户相关的MsgList显示
> 功能：在用户登录的时候，获取与当前用户相关的消息列表，新建了一个保存聊天状态的reducer叫做chat


* 定义接口请求函数 reqChatMsgList、reqReadMsg
* redux:产生聊天状态的reducer
	* 在action中封装获取消息列表的函数getMsgList
	* 登录之前调用`register、login、getUser`
	* reducer中处理RECEIVE_MSG_LIST的相关状态
	
### 5.显示某个聊天的消息列表：主要是chat.jsx
* 接收chat状态值
* 从chat中获取User及chatMsgs
* 计算chat_id,对chatMsgs进行过滤得到msgs
* 获取对方头像（注意没有数据时要设置为null防止报错）
* 在模板中，调用msgs.map循环产生聊天消息列表

**注意**：在没有当前用户的时候返回null，即在没有获取数据的时候暂时不作处理


### 6.发消息和接收消息的显示
* action.js initIo时加判断条件分发action
* 接收一个消息的同步action：receiveMsg
* reducer中RECEIVE_MSG的逻辑


### 7.表情功能
* 在ComponentWillMount中初始化表情列表数据
* 在state中，添加一个状态isShow
* Grid(antd-mobile的组件)的引入
* 根据状态显示、隐藏toggleShow
* 有一个bug，要异步解决一下，toggleShow中异步手动派发resize事件,解决表情列表显示的bug
* 更新状态时isShow为false，在handleSend中添加isShow状态


**显示的优化**：
* 1.chat.jsx中NavBar指定icon并添加点击事件OnleftClick，就可以回退到上一个页面了
* 2.消息滑动到底部：ComponentDidMount中初始化，ComponentDidUpdate中更新


### 8.显示分组的消息列表：message.jsx
* 读取user及chat状态，取user及users.chatMsg
* 对chatMsg进行分组，根据chat_id，封装getLastMsgs（有逻辑）
* 将lastMsg遍历显示
* 点击单条记录可以聊天`this.props.history.push(`/chat/${targetUserId}`)`


### 9.显示聊天组件未读消息数：统计每一个聊天分组的未读数量
* 给Item标签指定extra->unReadCount
* 在getLastMsg添加unReadCount的逻辑
* 保存已统计的未读数量
* 累加unReadCount，保存在最新的lastMsg上


### 10.总未读数量
* reducer中，chat状态里，RECEIVE_MSG_LIST统计unReadCount
* actions中，receiveMsgList需要接受userid,调用的地方getMsgList改一下，RECEIVE_MSG也要改unReadCount
* 在NavFooter中，badge添加unReadCount属性，在main中传unReadCount


### 11.更新未读消息数：要发请求
* 在chat组件中，ComponentDidMount中发请求更新，**为了防止在界面退出时还有未读数，ComponentWillMount也要调用readMsg**
* 定义readMsg异步action，传入并调用
* 定义一个actionType，MSG_READ,定义同步action：msgRead
* 准备数据count ，from ，to
* 在reducer中添加case，注意三点运算符的使用

**缺点**：要发请求，所以能看到未读消息消失的过程，未解决

## 注册登录功能
### 1. 注册/登陆后台处理
    1). models.js： 包含n 个能操作mongodb 数据库集合的model 的模块
       1. 连接数据库
           1.1. 引入mongoose
           1.2. 连接指定数据库(URL 只有数据库是变化的)
           1.3. 获取连接对象(mongoose.connection)
           1.4. 绑定连接完成的监听(用来提示连接成功)
       2. 定义出对应特定集合的Model 并向外暴露
           2.1. 定义Schema(描述文档结构) mongoose.Schema({}）
           2.2. 定义Model(与集合对应, 可以操作集合) mongoose.model('user', userSchema)
           2.3. 向外暴露Model exports.UserModel = UserModel
    2). routes/index.js
        根据接口编写路由的定义
        注册: 注册一个路由
            a)读取请求参数数据
            b)判断用户是否已经存在, 如果存在, 返回提示错误的信息
            c)如果不存在, 生成一个cookie(userid: user._id), 并交给浏览器保存
        登陆:
        	a)读取请求参数数据
            b)根据username和password查询数据库users, 如果没有, 返回提示错误的信息
            c)如果有,生成一个cookie(userid: user._id), 并交给浏览器保存， 返回登陆成功信息(包含user)
        响应数据结构: {code: 0, data: user}, {code: 1, msg: 'xxx'}
    3). 使用postman测试后台接口
    * 路由回调函数的3步: 读取请求参数/处理/返回响应数据
    * 通过Model函数对象或Model的实例的方法对集合数据进行CRUD操作 

### 2. 注册/登陆前台处理
    1). ajax
        封装ajax请求函数(通用): 使用axios库, 返回的是promise对象
        后台接口请求函数: 针对具体接口定义的ajax请求函数, 返回的是promise对象
        代理: 跨域问题/配置代理解决
        await/async: 同步编码方式实现异步ajax请求 
    2). redux
        store.js
          生成并暴露一个store管理对象
        reducers.js
          包含n个reducer函数
          根据老state和指定action来产生返回一个新的state
        actions.js
          包含n个action creator函数
          同步action: 返回一个action对象({type: 'XXX', data: xxx})
          异步action: 返回一个函数: disptach => {执行异步代理, 结束时dispatch一个同步action}
        action-types.js
          action的type名称常量
    3). component
        UI组件: 
            组件内部没有使用任何redux相关的API
            通过props接收容器组件传入的从redux获取数据
            数据类型: 一般和函数
        容器组件
            connect(
              state => ({user: state.user}),
              {action1, action2}
            )(UI组件)
## 3.自动登陆
    后台将userid保存到cookie中
    前台发送ajax请求根据cookie中的userid查询获取对应的user信息
    redux中管理user信息状态

# 关于React需要知道的
## 1.React组件的三大属性：state，props，refs
	state：页面的显示是根据组件的state属性的数据来显示
	props：给标签指定属性, 保存外部数据(可能是一个function)
	refs：给操作目标标签指定ref属性, 作为一个标识
## 2.React组件的生命周期
	* 第一次初始化显示: ReactDOM.render(<Xxx/>, containDom)
		constructor()
		componentWillMount() : 将要插入回调
		render() : 用于插入虚拟DOM回调
		componentDidMount() : 已经插入回调
	* 每次更新state: this.setState({})
	    componentWillReceiveProps(): 接收父组件新的属性
	    componentWillUpdate() : 将要更新回调
	    render() : 更新(重新渲染)
	    componentDidUpdate() : 已经更新回调
	* 删除组件: ReactDOM.unmountComponentAtNode(div): 移除组件
		componentWillUnmount() : 组件将要被移除回调
## 3.虚拟DOM与DOM Diff算法
## 4.React-router
	一个路由就是一个映射关系(key:value)
	后台路由: node服务器端路由, value是function, 用来处理客户端提交的请求并返回一个响应数据
	前台路由: 浏览器端路由, value是component, 当请求的是路由path时, 浏览器端前没有发送http请求, 但界面会更新显示对应的组件 
## 5. 自定义redux和react-redux
	理解redux模块
	    1). redux模块整体是一个对象模块
	    2). 内部包含几个函数
	        createStore(reducers)  // reducers: function(state, action){ return newState}
	        combineReducers(reducers)  // reducers: {reducer1, reducer2}  返回: function(state, action){ return newState}
	        applyMiddleware()  // 暂不实现
	    3). store对象的功能
	        getState()  // 返回当前state
	        dispatch(action)  // 分发action: 调用reducers()得到新的总state, 执行所有已注册的监听函数
	        subscibe(listener) // 订阅监听: 将监听函数保存起来
	理解react-redux模块
		1). react-redux模块整体是一个对象模块
		2). 包含2个重要属性: Provider和connect
		3). Provider
			值: 组件类
			作用: 向所有容器子组件提供全局store对象
			使用: <Provider store={store}><Xxx/></Provider>
		4). connect
			值: 高阶函数
			作用: 包装组件生成容器组件, 让被包装组件能与redux进行通信
			使用: connect(mapStateToProps, mapDispatchToProps)(Xxx)



# 其它要点
## 1. git管理项目的常用操作
    1). 创建本地仓库
        创建.gitignore配置文件
        git init
        git add *
        git commit -m "xxx"
    2). 创建github远程仓库
        New Repository
        指定名称
        创建
    3). 将本地仓库推送到远程仓库
        git remote add origin https://github.com/zxfjd3g/170612_JSAdvance.git 关联远程仓库
        git push origin master
    
    4). push本地的更新 
        git add *
        git commit -m "xxx"
        git push origin master
    
    5). pull远程的更新
            git pull origin master
            
    6). 克隆github上的项目:
        git clone https://github.com/zxfjd3g/xxx.git

## 2. 搭建项目
    1). 使用create-react-app脚手架创建模板项目(工程化)
    2). 引入antd-mobile, 并实现按需打包和自定义主题
    3). 引入react-router-dom(v4): 
        HashRouter/Route/Switch
        history: push()/replace()
    4). 引入redux
        redux/react-redux/redux-thunk
        redux: createStore()/combineReducers()/applyMiddleware()
        react-redux: <Provider store={store}> / connect()(Xxx)
        4个重要模块: reducers/store/actions/action-types
