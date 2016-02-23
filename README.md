# LPK25.js

> [AKAI LPK25](http://www.akaipro.com/product/lpk25) Keyboard Interface for Node.js

## Usage

    $ npm install --save lpk25

## Example

```js
const LPK25 = require('lpk25')
const keyboard = new LPK25()

// Runs function on all events
keyboard.on('event', function (event) {
  console.log('event', event)
})

// Run a function just on keyups
keyboard.on('keyup', function (event) {
  console.log('keyup')
})

// Run a function just on keydowns
keyboard.on('keydown', function (event) {
  console.log('keydown', event)
})

// Automatically find LPK25 port and open
// device connection
keyboard.open()
```

## API

### LPK25()

Extends the events.EventEmitter

### lpk25.findPort()

Find the a port matching the LPK25's description. Returns a port number or throws an error of `Error('Device not found')`.

### lpk25.open([port])

Open the connection to device. Not providing a port will run findPort() as a default.

#### port

Type: `number`
Default: `lpk25.findPort()`

The USB port number. This can be found on unix platforms with the `lsusb` utility or automatically found by running lpk25.findPort() if unspecified.

### lpk25.on(type, callback)

#### type

Type: `string`
Values: `event`, `keydown`, `keyup`

### callback

Type: `function`

Callback Argument 1:

```js
{
  eventCode: 144, // number: 144=keydown 128=keyup
  key: 0, // number: 0-120
  weight: 1, // number: 1-127
  deltaTime: 0.7526539999999999 // number: 0+ - http://stackoverflow.com/a/2985213/705977
}
```

## License

MIT © [Ben Evans](http://bensbit.co.uk)