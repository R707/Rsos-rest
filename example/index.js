/**
 * Created by cavasblack on 16/9/1.
 */
// var set = new Set();
//
// set.add("params1")
// set.add("params1")
// set.add("params1")
// set.add("params1")
// set.add("params1")
//
// console.log(set)
var path = require("path");

var Rest = require("../");

var fs = require("fs");

var rest = new Rest(path.join(__dirname, "apis"));

// console.log(rest.walkfile("./"))

rest.invoke("GET", "/demo3", {name: "aaaa",age : "123" }, function (err, result) {
    if(err){
        console.log(err.message);
        console.log(err.stack);
    }
    console.log("===>",result)
})

// fs.writeFile("index.md",rest.md,console.log);


