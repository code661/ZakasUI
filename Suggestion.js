class Suggestion {
  constructor(options) {
    this.options = options

    this.$input = $(this.options.input)

    this.$input.wrap('<div class="ZakasSuggestion"></div>')
    this.$wrapper = this.$input.parent()

    this.$ol = $('<ol class="ZakasSuggestion-list"></ol>')
    this.$input.after(this.$ol)

    this.$loading = $('<div class="ZakasSuggestion-loading"></div>')
    this.$loading.html(this.options.loading)
    this.$input.after(this.$loading)

    this.$empty = $('<div class="ZakasSuggestion-empty"></div>')
    this.$empty.html(this.options.emptyHint)
    this.$input.after(this.$empty)

    this.eventBind()
  }
  eventBind() {
    var timerID
    this.$input.on('input', (e) => {
      if (timerID) {
        window.clearTimeout(timerID)
      }
      timerID = setTimeout(() => {
        this.search(e.target.value)
      }, 200)
    })

    this.$ol.on('click','li',(e)=>{
      this.$input.val(e.target.innerText)    
    })
  }


  search(keyword) {
    console.log('开始搜索')
    this.$wrapper.addClass('loading')
    this.options.search(keyword, (array) => {
      
      this.$wrapper.removeClass('loading empty')
      this.$ol.empty()

      if (!array || array.length === 0){
        this.$wrapper.addClass('empty')
        console.log('kong')
      }

      array.forEach(text => {
        var $li = $('<li></li>')
        $li.text(text)
        this.$ol.append($li)
      })
    })
  }
}