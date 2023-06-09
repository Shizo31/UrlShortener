// Function 2 module
var fs = require('fs');
var vm = require('vm');
var run = vm.runInThisContext;
module.exports = function(file, modname) {
    run(fs.readFileSync(file)+'');
    return this[modname];
}
