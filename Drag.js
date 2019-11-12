(function(window) {
  var transform = getTransform();

  function Drag(selector) {
    this.elem =
      typeof selector == "object" ? selector : document.querySelector(selector);

    this.startX = 0;
    this.startY = 0;
    this.sourceY = 0;
    this.sourceY = 0;

    this.init()
  }

  Drag.prototype = {
    constructor: Drag,
    init: function() {
      this.setDrag();
    },
    getStyle: function(property) {
      return document.defaultView.getComputedStyle
        ? document.defaultView.getComputedStyle(this.elem, false)[property]
        : this.elem.currentStyle[property];
    },
    getTargetPos: function() {
      var pos = { x: 0, y: 0 };
      if (transform) {
        var transformValue = this.getStyle("transform");
        
        if (transformValue == "none") {
          this.elem.style[transform] = "translate(0, 0)";
          return pos;
        } else {
          var temp = transformValue.match(/-?\d+/g);
          return (pos = {
            x: parseInt(temp[4].trim()),
            y: parseInt(temp[5].trim())
          });
        }
      } else {
        if (getStyle(this.elem, "position") == "static") {
          this.elem.style.position = "relative";
          return pos;
        } else {
          var x = parseInt(
            getStyle(this.elem, "left") ? getStyle(this.elem, "left") : 0
          );
          var y = parseInt(
            getStyle(this.elem, "top") ? getStyle(this.elem, "top") : 0
          );
          return (pos = {
            x: x,
            y: y
          });
        }
      }
    },
    // pos = {x:200, y:200}
    setTargetPos: function(pos) {
      if (transform) {
        this.elem.style[transform] =
          "translate(" + pos.x + "px," + pos.y + "px)";
      } else {
        this.elem.style.left = pos.x + "px";
        this.elem.style.top = pos.y + "px";
      }
      return this.elem;
    },
    setDrag: function() {
      var self = this
      this.elem.addEventListener("mousedown", start);
      function start(event) {
        
        self.startX = event.pageX;
        self.startY = event.pageY;

        var pos = self.getTargetPos();

        self.sourceX = pos.x;
        self.sourceY = pos.y;

        document.addEventListener("mousemove", move, false);
        document.addEventListener("mouseup", end, false);
      }

      function move(event) {        
        var currentX = event.pageX;
        var currentY = event.pageY;

        var distanceX = currentX - self.startX;
        var distanceY = currentY - self.startY;

        self.setTargetPos({
          x: (self.sourceX + distanceX).toFixed(),
          y: (self.sourceY + distanceY).toFixed()
        });
      }

      function end(event) {
        document.removeEventListener("mousemove", move);
        document.removeEventListener("mouseup", end);
        // do other things
      }
    }
  };

  // 获取当前浏览器的兼容写法
  function getTransform() {
    var transform = "",
      divStyle = document.createElement("div").style,
      transformArr = [
        "transform",
        "webkitTransform",
        "MozTransform",
        "msTransform",
        "OTransform"
      ],
      i = 0,
      len = transformArr.length;

    for (; i < len; i++) {
      if (transformArr[i] in divStyle) {
        transform = transformArr[i];
      }
    }

    return transform;
  }

  window.Drag = Drag
  
})(window);

// 使用示例
// var square = new Drag('#square')
// var circle = new Drag('#circle')
