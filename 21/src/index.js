// import base from './css/base.scss'
import './css/base.scss'
// import common from './css/common.scss'
import './css/common.scss'
import {componentA} from './components/a'
import {a} from './common/util'

var app = document.getElementById('app')
var list = componentA()
// div.className = 'box'
app.appendChild(list)

console.log(a())

// import {chunk} from 'lodash'

// console.log(chunk([1, 2, 3, 4, 5, 6, 7], 2))

$('div').addClass('new')

$.get('/comments/show', {
  id: '4230532655339827',
  page: 1
}, function (data) {
  console.log(data)
})

$.get('/msg/index', {
  format: 'cards'
}, function (data) {
  console.log(data)
})

if (module.hot) {
  module.hot.accept()
  // module.hot.accept('./components/a', function() {
  //   app.removeChild(list)
  //   let ComponentA = require('./components/a')
  //   let newlist = ComponentA()
  //   app.appendChild(newlist)
  //   list = newlist
  // }) // 这段有错
}
