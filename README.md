[![npm](https://img.shields.io/npm/v/node-soundtouch.svg)](https://www.npmjs.com/package/node-soundtouch)
[![npm](https://img.shields.io/npm/dt/node-soundtouch.svg)](https://www.npmjs.com/package/node-soundtouch)

# node-soundtouch
node-soundtouch is a Node.js library that implements the Bose
[SoundTouch API](http://products.bose.com/api-developer/index.html).

It is currently in an alpha state and only implements as much of the API as
I currently need. Eventually though the intent is to support the full API.

This library is authored in TypeScript and compiled into ES6. It uses ES6
promises and can be used with async/await or promise chaining.

## Installation
`npm install --save node-soundtouch`

This package includes TypeScript typings that should be automatically detected.


## Usage
Below is an example in ES6/TypeScript
```Javascript
import {DiscoveryService, Key} from "node-soundtouch";

const device = await DiscoveryService.findDevice("My Device");

if (device) {
  await device.setVolume(30);
  await device.pressKey(Key.ShuffleOn);
  await device.powerOn();
  await device.pressKey(Key.Preset1);
}
```

## Contributing
Contributions are welcome, though I do have a vision of how I want this
project to reach v1.0 so feel free to open an issue before creating a pull
request to see if we're on the same page.
