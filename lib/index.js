/**
 * Created by cavasblack on 16/9/1.
 */
"use strict"
const Api = require("./api");
const fs = require("fs");
const path = require("path");
const Types = require("./types");
const pathToRegexp = require("path-to-regexp");
class Rest {
    constructor(rootpath) {
        this.apis = {};
        this.rootpath = rootpath;
        this.init();
    }

    init() {
        var self = this;
        var dirs = fs.readdirSync(this.rootpath);
        dirs.forEach(function (item, index) {
            var api = require(path.join(self.rootpath, item))(new Api,Types);
            self.apis[[api._method, api._path].join(" ")] = api;
        });

        Object.defineProperty(this,"md",{
            get:function(){
                var mdtxts = [];
                Object.keys(self.apis).forEach(function(item,index){
                    mdtxts.push(self.apis[item].md)
                });
                return mdtxts.join("\r\n\r\n");
            }
        })
    }

    invoke(method,path,params,callback){
        var apiname = [method,path].join(" ");
        for(var item in this.apis){
            var p2r = pathToRegexp(item);
            var temp = p2r.exec(apiname);
            if(temp!=null){
                var method = temp.slice(1);
                p2r.keys.forEach(function(item,index){
                    params[item.name] = method[index];
                });
                return this.apis[item].invoke(params,callback)
            }
        }
        return callback(new Error(`404::${apiname} not found!`))
    }
}

module.exports = Rest;