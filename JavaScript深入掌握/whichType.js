/*
1.仿照jQuery实现一个检测类型的函数，如果是基本类型就用typeof判断，
如果是引用类型，利用Object.prototype.toString.call(),返回[object Null]格式的结果
要求：返回结果都是小写的字符串
*/
var checkType = {}
"Boolean Number String Function Array Date RegExp Object Error Null Undefined"
.split(' ').map((item)=>{
	checkType['[object'+item+']'] = item.toLowerCase()
})
function type(obj){
	//兼容在 IE6 中，null 和 undefined 会被 Object.prototype.toString 识别成 [object Object]
	if(obj==null) return obj+" "
	
	return typeof obj==='object'||typeof obj==='function'?
	checkType[Object.prototype.toString.call(obj)]||'object':typeof obj
	//||'object'，obj=Symbol，Set，Map等ES6新增类型时会用到
}

//console.log(type(undefined))

//封装isFunction
function isFunction(func){
	return type(func)==="function"
}
//封装isArray
//var isArray = (Array.isArray)||(arr)=>type(arr)==="array"


//2.isPlainObject:除了 {} 和 new Object 创建的之外，jQuery 认为一个没有原型的对象也是一个纯粹的对象。
var toString = Object.prototype.toString
var hasOwn = Object.prototype.hasOwnProperty
function isPlainObject(obj){
	var proto,Ctor
	//排除掉window等对象
	if(!obj||toString.call(obj)!=='[object Object]') return false
	//获得obj的原型
	proto = Object.getPrototypeOf(obj)
	//没有原型的是plainObject
	if(!proto) return true
	//原型的构造函数属性
	Ctor = hasOwn.call(proto,"constructor")&&proto.constructor
	//如果原型的构造函数等于Object的构造函数，说明是Object构造函数创建的，返回true
	return typeof Ctor==='function'&&hasOwn.toString.call(Ctor)===hasOwn.toString.call(Object)
}

//3.isEmptyObject
function isEmptyObject(obj){
	var name
	for(name in obj){
		return false
	}
	return true
}
//4.isWindow
function isWindow(obj){
	//!!转换为布尔类型
	return obj!=null&&obj.window===obj
}
//5.isArrayLike:数组或类数组
function isArrayLike(obj){
	//obj存在，&&返回的不是布尔值，取交集，obj.length
	var len = !!obj && 'length' in obj && obj.length
	if(type(obj)==="funciton"||isWindow(obj)) return false
	//len===0是为arguments考虑的，虽然{length：0}也为true，为性能折中，放过一些情况
	//(len-1) in obj根据类数组的结构，保证最后一项是有值的
	return type(obj)==='array'||len===0||typeof len==="number"&&len>0&&(len-1) in obj
}
//6.isElement：DOM元素
function isElement(obj){
	//带上obj，以保证不传参时不报错
	return !!(obj&&obj.nodeType===1)
}
