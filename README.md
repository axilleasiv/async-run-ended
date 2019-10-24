Check if your node.js program has finished the async code execution (async functions, promises, setTimeout etc), when Inter Process Communication (IPC) in Node.js keeps the connection between child and parent process, alive. It is not recommended to be used for production.

## Installation

```
npm install @achil/async-run-ended
```

or

```
yarn add @achil/async-run-ended
```

## Usage

Require the node module at the top of your code

```js
const asyncEnd = require('@achil/async-run-ended');
```

and check at the end of your file or at a specific point of you code by using the module function check and a time interval as argument of it, for example at the following example, it checks every 50ms :

```js
asyncEnd.check(50).then(function() {
  // Run your code at the end of the async code
});
```
