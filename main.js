require('es5-shim-sham');

//test es6 syntax (babel-loader + es5-shim-sham + es3ify-loader)
let input = [1, 2, 3, 4];
let square = input.map(item => item * item);
console.log("=> ", square); //[1, 4, 9, 16]

//test es6 interface (polyfill)
let arrayLike = {
	"1": "a",
	"2": "b",
	"3": "c",
	length: 2
}
let testArray = Array.from(arrayLike);
console.log("Array.from: ", testArray); //[undefined, "a"]

//test css-loader and style-loader
require("./static/reset.css");
require("./static/style.css"); //background image

//test json-loader
let account = require("./static/account.json");
console.log("json-loader: ", account.name); //linxingjian

//test webpack.DefinePlugin
__DEV__ ? console.log("DEBUG MODE"): console.log("RELEASE MODE");

//test externals
window._$ = "this is not jQuery";
var data = require("_jQuery");
console.log("externals: ", data);