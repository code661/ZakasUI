function Tab(selector) {
  this.element = $(selector)
  this.init()
  this.bindEvents()
}

Tab.prototype.init = function () {
  this.element.each(function (index, tab) {
    $(tab).children('.tabs-bar').children('li').eq(0).addClass('active')
    $(tab).children('.tab-content').children('li').eq(0).addClass('active')
  })
}

Tab.prototype.bindEvents = function () {
  this.element.on('click', '.tabs-bar > li', function (e) {
    $li = $(e.currentTarget)
    $li.addClass('active').siblings().removeClass('active')
    var idx = $li.index()
    var $content = $li.parents('.tabs').find('.tab-content > li')
    $content.eq(idx).addClass('active').siblings().removeClass()
  })
}

var tab = new Tab('.tabs')