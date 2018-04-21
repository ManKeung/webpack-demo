import base from './css/base.scss'
import common from './css/common.scss'

const app = document.getElementById('app')
app.innerHTML = '<div class="'+base.box+'"></div>'

import(/* webpackChunkName:'a' */ './components/a').then(function(a) {
  console.log(a)
})
