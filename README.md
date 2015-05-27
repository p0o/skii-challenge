# Skii Challenge

A cool programming challenge in Node JS. This code will find the longest and steepest path in a 1000x1000 map with a set of rules specified here by RedMart team:

http://geeks.redmart.com/2015/01/07/skiing-in-singapore-a-coding-diversion/

The whole code is packaged in a module called skii.js. You can simply load it with any similar data this way:

```bash
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
npm install -g mocha
```

to run test type in terminal:

```bash
cd test
mocha run-test
```

Great! feel free to ask me anything if you liked it.
