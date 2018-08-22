;
(function () {
  function Drag(selecotr) {
    this.elem = typeof selecotr === 'Object' ? selecotr : document.querySelector(selecotr)
    this.startX = 0
    this.startY = 0
    this.sourceX = 0
    this.sourceY = 0

    this.init()
  }

  Drag.prototype = {
    constructor: Drag,
    init: function () {
      this.setDrag()
    },
    getStyle: function (property) {
      return document.defaultView.getComputedStyle(this.elem, false)[property]
    },

    getPosition: function () {
      var pos = { x: 0, y: 0 }
      var transform = getTransform()
      if (transform) {
        var transfromValue = this.getStyle(transform)
        if (transfromValue == 'none') {
          this.elem.style.transform = 'translate(0, 0)'
          return pos
        } else {
          var temp = transfromValue.match(/-?\d+/g)
          return pos = {
            x: parseInt(temp[4].trim()),
            y: parseInt(temp[5].trim())
          }
        }
      }
    },
    setPosition: function (pos) {
      var transform = getTransform()
      if (transform) {
        this.elem.style[transform] = 'translate(' + pos.x + 'px, ' + pos.y + 'px)'
      }
    },

    setDrag: function () {
      var self = this
      this.elem.addEventListener('mousedown', start, false)

      function start(event) {
        self.startX = event.pageX
        self.startY = event.pageY

        var pos = self.getPosition()

        self.sourceX = pos.x
        self.sourceY = pos.y

        document.addEventListener('mousemove', move, false)
        document.addEventListener('mouseup', end, false)
      }

      function move(event) {
        var currentX = event.pageX
        var currentY = event.pageY

        var distanceX = currentX - self.startX
        var distanceY = currentY - self.startY

        self.setPosition({
          x: (distanceX + self.sourceX).toFixed(),
          y: (distanceY + self.sourceY).toFixed()
        })
      }

      function end(event) {
        document.removeEventListener('mousemove', move)
        document.removeEventListener('mouseup', end)
      }
    }
  }

  function getTransform() {
    var transform = '',
      divstyle = document.createElement('div').style,
      transformArr = ['transform', 'webkitTransform', 'MozTransform', 'msTransform', 'OTransform']
    i = 0
    len = transformArr.length

    for (; i < len; i++) {
      if (transformArr[i] in divstyle) {
        return transform = transformArr[i]
      } else {
        return transform
      }
    }
  }

  window.Drag = Drag
})()
