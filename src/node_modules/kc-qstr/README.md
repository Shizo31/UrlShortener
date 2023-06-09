# Qstr
[js] Read a querystring and parse params.

### Install
```
npm install kc-qstr
```

### Use
```js
var qstr = require('kc-qstr');
var prms = qstr('a=b&c=d');
console.log(prms); // { a: 'b', c: 'd' }
```
