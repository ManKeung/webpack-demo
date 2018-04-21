import base from './css/base.scss'

const app = document.getElementById('app')
app.innerHTML = '<div class="'+base.box+'"></div>'

import {a} from './common/util'

console.log(a())

import {chunk} from 'lodash'

console.log(chunk([1, 2, 3, 4, 5, 6, 7], 2))
