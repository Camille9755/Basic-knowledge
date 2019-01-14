## vue实例
### 1. el，data，method，computed，watch，components
### 2. 生命周期的理解
## 模板语法:
   Vue.js 使用了基于 HTML 的模板语法，允许开发者声明式地将 DOM 绑定至底层 Vue 实例的数据。所有 Vue.js 的模板都是合法的 HTML
### 1. 插值
  * 文本： 双大括号{{msg}}，解释为普通文本
  * 原始HTML： v-html，解释为HTML
  * 特性： v-bind:disabled="isTrue"
  * 使用JS表达式: {{ number + 1 }}

### 2. 指令
* 参数：`<a v-bind:href="url">...</a>`
* 修饰符：`<form v-on:submit.prevent="onSubmit">...</form>`

### 3. 缩写
   * v-bind：-----：
   * v-on：-----@
   
## 计算属性和侦听器
## CSS与Style绑定
### 绑定HTML Class
### 绑定内联样式
##条件渲染
### v-if,v-else,v-show
## 列表渲染
### v-for遍历数组/对象
### key重要性
### 数组和对象更新的注意事项
### filter过滤器
## 事件处理
### v-on绑定事件函数名或者内联的js代码
### 事件修饰符：.prevent .stop
### 按键修饰符：.enter .13
### 系统修饰符：.ctrl .alt .exact(组合系统修饰符) .left(鼠标)
## 表单输入绑定
### 基础用法:`v-model="selected"` `{{selected}}`
### 值绑定：
通常`v-model="sth"` `value="abc"`的情况下，sth的值为abc，但是可以把这个只绑定到vue实例对象的动态属性上，通过`v-bind:value="cba"`实现
### 修饰符
* .lazy 
* .number
* .trim

## 过渡&动画
### 进入/离开&列表过渡
* 单元素/组件的过渡
  * 模板: 使用<transition name='xxx'>包含带动画的标签
  * v-enter等6个class供切换（）
  * 对于 Vue 的过渡系统和其他第三方 CSS 动画库，可以自定义过渡类名
  * ：duration可以显性过渡持续时间
  * 可以在methods中定义钩子函数
* 初始渲染的过渡：appear
* 多个元素的过渡
  * 最常见的多标签过渡是一个列表和描述这个列表为空消息的元素 
  * v-if&v-else
  * 或者 key设置不同状态
  * 过渡模式问题：`mode="out-in"`
* 多个组件的过渡：动态组件
* 列表过渡
  * 列表进入/离开过渡
  * 列表排序过渡：loadsh 借助flip实现简单的动画队列
  * 列表交错过渡：data-与javascript交互
* 可复用的过渡
* 动态过渡：动态绑定过渡特性

### 状态过渡（之后再来回头了解，借助外部工具库tween等）
* 状态动画与侦听器
* 动态状态过渡
* 过渡放到组件里


