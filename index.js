'use strict'

const MIDIInput = require('midi').input
const EventEmitter = require('events').EventEmitter

class LPK25 extends EventEmitter {
  constructor () {
    super()
    this.input = new MIDIInput()
  }

  findPort () {
    let portNumber
    let portCount = this.input.getPortCount()

    for (let i = 0; i < portCount; i++) {
      if (this.input.getPortName(i) === 'LPK25 20:0') {
        portNumber = i
        break
      }
    }

    if (portNumber === undefined) {
      throw new Error('Device not found')
    }

    return portNumber
  }

  open (port) {
    if (port) {
      this.port = port
    }

    if (this.port === undefined) {
      this.port = this.findPort()
    }

    this.input.openPort(this.port)

    let lpk25 = this
    this.input.on('message', function (deltaTime, message) {
      var data = {
        eventCode: message[0], // 144=keydown 128=keyup
        key: message[1],
        weight: message[2],
        deltaTime: deltaTime
      }

      lpk25.emit('event', data)
      if (data.eventCode === 144) {
        lpk25.emit('keydown', data)
      } else if (data.eventCode === 128) {
        lpk25.emit('keyup', data)
      }
    })
  }
}

module.exports = LPK25
