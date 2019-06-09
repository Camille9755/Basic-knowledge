# Vue项目总结

## 技术选型  
1.前台的数据处理及交互是基于vue技术栈，利用vue-router实现单页应用，利用vuex管理状态  
&emsp;使用better-scroll实现滑动及swiper实现轮播  
2.前后台的数据交互部分利用mockjs模拟后台数据，使用postman测试接口，数据的获取是用axios  
3.采用ES6模块化，并利用webpack和vue-cli构建工程化项目，利用eslint规范语法  
4.CSS预编译器使用Less  

## 1.vuex管理状态
	集中管理vue多个组件共享的状态及从后台获取的数据
	state：数据
	getters：从state中读数据进行计算
	组件通过mapstate()/$store.state获取state中的数据
	组件通过mapActions()/$store.dispatch()分发action
	action触发mutation commit(RECEIVE.{shops:result.data})
		在action中发送ajax请求获取后台数据
	mutation直接更新界面 [RECEIVE](state,{address}){state.address=address}
		利用插件查看vuex状态和mutation过程
## 2.登录注册功能实现
	1). 2种方式
	   手机号/短信验证码登陆
	   用户名/密码/图片验证码登陆
	2). 登陆的基本流程
	   表单前台验证, 如果不通过, 提示，就可以减少请求次数
	   发送ajax请求, 得到返回的结果
	   根据结果的标识(code)来判断登陆请求是否成功
	       1: 不成功, 显示提示
	       0. 成功, 保存用户信息, 返回到上次路由
	3）手机号登录实现
		利用正则表达式对手机号合法性进行检查
		发送验证码以后，循环定时器做倒计时效果，为防止多次点击，在定时器开始之前先清一下定时器。
## 3.异步显示数据
	1). 异步显示数据效果的编码流程
	    ajax
	      ajax请求函数
	      接口请求函数
	    vuex
	      state
	      mutation-types
	      actions
	      mutations
	    组件
	      dispatch(): 异步获取后台数据到vuex的state
	      mapState(): 从vuex的state中读取对应的数据
	      模板中显示
	2). 初始显示异常 info.support[0].name
	    情况1: Cannot read property 'name' of undefined"
	    原因: 异步显示，初始值info是空对象, 内部没有数据, 而模块中直接显示3层表达式
	    解决: 使用v-if指令
	    
	    情况2: Cannot read property 'xxx' of null"
	3）在购物车功能中，给每个事物添加了一个count属性来计数，发现新添加的属性没有数据劫持
		即更新了数据但是界面没有变化，更新count没有触发action
		原因: 一般方法给一个已有绑定的对象中添加一个新的属性, 这个属性没有数据绑定
	    解决: 
	       在vuex中： Vue.set(obj, 'xxx', value)才有数据绑定，
	       在组件对象中： this.$set(obj, 'xxx', value)才有数据绑定
		另外要注意防止事件冒泡到上一级 .stop

## 4.列表滑动及左右联动滑动
    1). 基本滑动:
        使用better-scroll,基本原理:内容超过包裹区域才会滑动
        创建BScroll对象的时机：要在数据变化，异步更新界面之后
    	做法：
          watch + $nextTick(回调函数)
          callback + $nextTick
    	$nextTick将回调函数延迟到下次DOM更新循环以后执行，要写在数据更新以后
    	this.$nextTck的回调函数一旦完成界面更新立即调用
    	better-scroll禁用了原生的dom事件, 使用的是自定义事件(橡皮筋效果)
    2). 滑动右侧列表, 左侧同步更新
            1). 在滑动过程中, 通过绑定scroll/scrollEnd监听，来实时收集scrollY
    			scrollY: 右侧滑动的Y轴坐标 (滑动过程时实时变化)
            2). 列表第一次显示后, 收集tops
    			tops: 所有右侧分类li的top组成的数组  (列表第一次显示后就不再变化)
            3). 实现currentIndex的计算逻辑，得到当前位置对应的左侧列表中分类的下标
    			利用findIndex方法，返回
    			this.scrollY>=top&&this.scrollY<this.tios[index+1]		
    3). 点击左侧列表项, 右侧滑动到对应位置
    		得到滚动目标的坐标，更新目标Y轴坐标，利用scrollTo平滑滚动到指定位置
## 5.定义评价过滤的方法
		利用数组的filter方法，参数传rating，返回判断条件为true的rating组成的数组
## 6.项目的优化
		1). 缓存路由组件对象：在浏览器内存中将组件对象缓存起来
			<keep-alive>
				<router-view />
			</keep-alive>
			好处: 复用路由组件对象, 复用路由组件获取的后台数据
	    2). 路由组件懒加载
			const MSite = () => import('../pages/MSite/MSite.vue')
			import返回路由组件的函数，只有需要时去后台请求路由组件代码，执行此函数才加载
	    3). 图片懒加载: vue-lazyload
			Vue.use(VueLazyload, {
				loading //配置加载中显示什么，比如一张图片
			})
			//在main.js中定义了以上语句后，内部自定义了一个指令lazy
			<img v-lazy="food.image">
	    4). 分析打包文件并优化 
			vue 脚手架提供了一个用于可视化分析打包文件的包 webpack-bundle-analyzer 和配置，
			直观发现在日期格式化时使用的库moment占用内存过大，改为使用data-fns
			// import moment from 'moment'
			// import {format} from 'date-fns'
			import format from 'date-fns/format'
			import Vue from 'vue'
			Vue.filter('dateString', function (value, formatStr) {
			// return moment(value).format(format || 'YYYY-MM-DD HH:mm:ss')
			return format(value, formatStr || 'YYYY-MM-DD HH:mm:ss')
			})
