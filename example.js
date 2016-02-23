'use strict'

let LPK25 = require('./')
let keyboard = new LPK25()

keyboard.on('event', function (event) {
  console.log('event', event)
})

keyboard.on('keyup', function (event) {
  console.log('keyup')
})

keyboard.on('keydown', function (event) {
  console.log('keydown', event)
})

keyboard.open()
