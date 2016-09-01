/**
 * Created by cavasblack on 16/9/1.
 */
var Api = require("../lib/api");
var MyString = require("../lib/types/String");
var api = new Api("GET", "/user")
var fs = require('fs');
api
    .group("groupaaa")
    .param("uid", {
        type: new MyString(),
        default: "10000",
        detail: "用户ID"
    })
    .required("uid")
    .example(JSON.stringify({uname: "cavacn"}))
    .exec(function (params, callback) {
        callback(null, params);
    })

fs.writeFile("./my.md",api.toMD(),console.log);