// import './css/base.css'
// import './css/common.css'

import base from './css/base.css'
import common from './css/common.css'

// var flag = false;

// setInterval(function() {
//   if(flag) {
//     base.unuse() // 不插入
//   }else {
//     base.use()
//   }
//   flag = !flag
// }, 500)

const app = document.getElementById('app')
app.innerHTML = '<div class="'+base.box+'"></div>'
