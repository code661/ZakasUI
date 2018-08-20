class Slides {
  constructor(options){
    this.options = options
    this.$slides = $(this.options.element)
    this.$slides.addClass('zakas-slides')
    this.initHtml()
    this.eventBind()
    this.go(0)
    if (this.options.autoPlay){
      this.play()
    }
  }

  initHtml(){
    this.$prevBtn = $('<button class="prev">上一张</button>')
    this.$prevBtn.appendTo(this.$slides)
    this.$nextBtn = $('<button class="next">下一张</button>')
    this.$nextBtn.appendTo(this.$slides)
  }

  eventBind(){
    this.$nextBtn.on('click',()=>{
      this.next()
    })
    this.$prevBtn.on('click',()=>{
      this.prev()
    })
    this.$slides.mouseenter(()=>{
      this.stop()
    })
    this.$slides.mouseleave(()=>{
      this.play()
    })
  }

  go(idx){
    var $ol = this.$slides.children('ol')
    var $items = $ol.children('li')
    if (idx >= $items.length) {
      idx = 0
    } else if(idx < 0){
      idx = $items.length -1
    }
    $ol.css({transform: `translateX(${-idx*500}px)`})
    this.currentIdx = idx
  }
  next(){
    this.go(this.currentIdx + 1)
  }
  prev(){
    this.go(this.currentIdx - 1)
  }
  stop(){
    clearInterval(this.timerID)
  }
  play(){
    this.timerID = setInterval(()=>{this.next()},2000)
  }
}