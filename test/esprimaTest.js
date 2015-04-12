/**
 * Created by 杨念兵 on 2015/4/12.
 */
var esprima = require("esprima");

console.log(JSON.stringify(esprima.tokenize('var a = 42 + 38'), null, 4));