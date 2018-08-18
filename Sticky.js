class Sticky {
  constructor(selector, n) {
    this.$elements = $(selector)
    this.n = n || 0
    this.offset = []
    this.offsetCache()
    this.addPlaceholder()
    this.onScroll()
  }
  offsetCache() {
    this.$elements.each((idx, item) => {
      this.offset[idx] = $(item).offset()
    })
  }
  addPlaceholder() {
    var $wrapper = $('<div class="StickyPlaceholder"></div>')
    this.$elements.each(function (idx, item) {
      $(item).wrap($wrapper)
      $(item).parent().height($(item).outerHeight())
    })
  }
  onScroll() {
    $(window).on('scroll', ()=> {
      this.$elements.each((idx, item) => {
        if (window.scrollY + this.n > this.offset[idx].top) {
          $(item).addClass('sticky')
                 .css('top',this.n)
        } else {
          $(item).removeClass('sticky')
        }
      })
    })
  }
}
new Sticky('.topbar')
new Sticky('button', 60)


