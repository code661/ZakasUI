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

function getStyle(elem, property) {
  return document.defaultView.getComputedStyle(elem, false)[property]
}

function getTargetPos(elem) {
  var pos = { x: 0, y: 0 }
  var transform = getTransform()
  if (transform) {
    var transfromValue = getStyle(elem, transform)
    if (transfromValue == 'none') {
      elem.style.transform = 'translate(0, 0)'
      return pos
    } else {
      var temp = transfromValue.match(/-?\d+/g)
      return pos = {
        x: parseInt(temp[4].trim()),
        y: parseInt(temp[5].trim())
      }
    }
  }
}

function setTargetPos(elem, pos) {
  var transform = getTransform()
  if (transform) {
    elem.style[transform] = 'translate(' + pos.x + 'px, ' + pos.y + 'px)'
  }
}

var movingElem = document.querySelector('.elem1')
var startX = 0
var startY = 0
var sourceX = 0
var sourceY = 0
movingElem.addEventListener('mousedown', start, false)

function start(event) {
  startX = event.pageX
  startY = event.pageY

  var pos = getTargetPos(movingElem)

  sourceX = pos.x
  sourceY = pos.y

  document.addEventListener('mousemove', move, false)
  document.addEventListener('mouseup', end, false)
}

function move(event){
  var currentX = event.pageX
  var currentY = event.pageY

  var distanceX = currentX - startX
  var distanceY = currentY - startY

  setTargetPos(movingElem, {
    x: (distanceX + sourceX).toFixed(),
    y: (distanceY + sourceY).toFixed()
  })
}

function end(event){
  document.removeEventListener('mousemove', move)
  document.removeEventListener('mouseup', end)
}