/**
 * Created by cavasblack on 16/9/2.
 */
const pathToRegexp = require("path-to-regexp");

var item = pathToRegexp("/:name").exec("/aaaa");

console.log(pathToRegexp("/:name"),item)