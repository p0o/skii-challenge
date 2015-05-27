# Skii Challenge

A cool programming challenge in Node JS. This code will find the longest and steepest path in a 1000x1000 map.

The whole program is packaged in a module called skii.js. You can simply load it with any similar data this way:

```bash
var Skii = require('./skii.js');
var skii = Skii();

skii.load('map.txt');
var result = skii.run();
```

# quick start

This program runs in a command line and surf the whole 1000x1000 map in about 3 seconds (with my notebook's processing speed). You will only need node js installed on your computer to run the program.


Run in the root directory:

```bash
node app.js
```

In order to run fancy tests you will need mocha framework. Install it globally with npm:

```bash
sudo npm install -g mocha
```

To run the test suit, type in terminal:

```bash
cd test
mocha run-test
```

Great! feel free to ask me anything by sending an email to hello [at] pooria.co.
