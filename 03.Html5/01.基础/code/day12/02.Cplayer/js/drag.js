;(function (w) {
  w.$ = {}
  w.$.drag = function (testNode,callback) {
    var startPoint = {x:0,y:0}
    var elementPoint = {x:0,y:0}

    testNode.onmousedown = function (ev) {
      ev = ev||window.event
      if(testNode.setCapture){
        testNode.setCapture()
      }

      startPoint.x = testNode.offsetLeft
      startPoint.y = testNode.offsetTop

      elementPoint.x = ev.clientX
      elementPoint.y = ev.clientY

      document.onmousemove = function (ev) {
        ev =ev || event
        var nowpoint = {x:0,y:0}
        nowpoint.x = ev.clientX
        nowpoint.y = ev.clientY

        var l = startPoint.x + (nowpoint.x - elementPoint.x)

        if(l<0){
          l=0
        }else if(l>(testNode.parentNode.clientWidth-testNode.offsetWidth)){
          l=testNode.parentNode.clientWidth-testNode.offsetWidth
        }

        testNode.style.left = l+'px'

        if(callback&&callback["move"]&&typeof (callback["move"])==="function"){
          callback["move"].call(testNode)
        }
      }

      document.onmouseup = function () {
        document.onmousemove = document.onmouseup =null
        if(document.releaseCapture){
          document.releaseCapture()
        }
      }

      return false
    }
  }
})(window)