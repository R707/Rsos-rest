/**
 * Created by cavasblack on 16/9/1.
 */
var Api = require("../lib/api");
var String = require("../lib/types").String;
var Email = require("../lib/types").Email;
var api = new Api("GET", "/user")
var fs = require('fs');
api
    .group("groupaaa")
    .param("uid", {
        type: String(),
        default: "10000",
        detail: "用户ID"
    })
    .param("email",{
        type:Email()
    })
    .param("nickname", {
        type: String(),
        default: "测试昵称"
    })
    .required("uid","email")
    .example(JSON.stringify({uname: "cavacn"}))
    .exec(function (params, callback) {
        callback(null, params);
    })

fs.writeFile("./my.md",api.md,console.log);

api.doExec({uid:"www",email:"adminaa.cc@email.cc.com"}, console.log)