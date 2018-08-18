# ZakasUI
在学习了 JavaScript 的面向对象的知识后，造一些简单的轮子来检验自己的学习效果。
取名叫 ZakasUI 是因为刚才想名字时发现摆在桌子上的几本 JavaScript 书的作者都是 Nicholas C.Zakas，也就是被称做 JavaScript 红宝书的《JavaScript 高级程序设计》一书的作者。在学习的过程中对我帮助很大，所以就有了这个名字 ZakasUI( 

## 组件目录
* Tab 组件
* Sticky 组件
* Dialog 组件
* Suggestion 组件
* Slides 组件

## 使用
内部实现依赖于 jQuery 库，在使用前需安装 jQuery
### Tab 组件
1. 引入`Tab.css`文件
2. 在页面添加如下 HTML 代码
```html
<div class="tabs">
    <ol class="tabs-bar">
      <li>1</li>
      <li>2</li>
      <li>3</li>
      <li>4</li>
    </ol>
    <ol class="tab-content">
      <li>Content1</li>
      <li>Content2</li>
      <li>Content3</li>
      <li>Content3</li>
    </ol>
  </div>
```
3. 添加 JavaScript 代码
```js
new Tab('.tabs')
```

### Sticky 组件
1. 添加 CSS 代码
```css
.sticky {
  position: fixed;
  top: 0;
  left: 0;
}
```
2. 添加 JavaScript 代码
```js
new Sticky(selector,val)
```
第一参数为需要设置为 Sticky 的元素选择器，第二个参数为距离视窗顶部的高度值