function Diglog(options) {
  this.options = options
  this.$dialog = $(this.getTemplate())
  this.$dialog.find('footer').append(this.generateBtn())
}

Diglog.prototype.generateBtn = function () {
  let { buttons } = this.options
  buttons = buttons.map((buttonOption) => {
    var $b = $('<button></button>')
    $b.text(buttonOption.text)
    $b.on('click', buttonOption.action)
    return $b
  })
  return buttons
}

Diglog.prototype.getTemplate = function () {
  var title = this.options.title
  var content = this.options.content
  var htmlStr = `
    <div>
      <header>${title}</header>
      <main>${content}</main>
      <footer></footer>
    </div>
  `
  return htmlStr
}

Diglog.prototype.close = function () {
  this.$dialog.detach()
}

Diglog.prototype.open = function () {
  this.$dialog.prependTo('body')
}