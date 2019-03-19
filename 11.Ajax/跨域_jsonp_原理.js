
/***************************	浏览器端代码	***********************************/
//创建 script 标签
function addScriptTag(src) {
  var script = document.createElement('script');
  script.setAttribute("type","text/javascript");
  script.src = src;
  document.body.appendChild(script);
}
 
//失去焦点的时候添加标签
document.getElementById('name').onblur = function () {
  var userNameKeyValue = 'userName=' + this.value
  var url = 'http://localhost:3000/ajax/test/check/jsonp?callback=appendHtml' + '&' + userNameKeyValue;
  //http://localhost:3000/ajax/test/check/jsonp?callback=appendHtml&userName=bajie
  addScriptTag(url);
}
 
 
//具体的功能函数
function appendHtml(data) {
	console.log(data);
	document.getElementById('resultSpan').innerHTML = data.result;
}



/***************************	服务器端返回的值	***********************************/
appendHtml({
  "result" : '<span style="color:green"> 可用 </span>'
});


/***************************	服务器端代码	***********************************/

router.get('/ajax/test/check/jsonp/js', function (req, res, next) {
    var userName = req.query.userName;
    var callback = req.query.callback;
    
    console.log('/ajax/test/check/jsonp', userName, callback);
    var obj = {};
    if('wukong' === userName){
        obj.result = '<span style="color:red"> 不可用</span>';
    }else {
        obj.result = '<span style="color:green"> 可用</span>';
    }	
    var jsStr = callback + '('+ JSON.stringify(obj) +');';
	console.log(jsStr);
    res.send(jsStr);
});




