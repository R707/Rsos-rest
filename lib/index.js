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
    constructor(rootPath) {
        this.apis = {};
        this.rootPath = rootPath;
        this.splitStr = "::"
        this.init();
    }

    init() {
        var self = this;

        var files = self.walkfile(this.rootPath);

        files.forEach(function (item, index) {
            var api = require(item)(new Api, Types);
            self.apis[[api._method, api._path].join(self.splitStr)] = api;
        });

        Object.defineProperty(this, "md", {
            get: function () {
                var mdTexts = [];
                Object.keys(self.apis).forEach(function (item, index) {
                    mdTexts.push(self.apis[item].md)
                });
                return mdTexts.join("\r\n\r\n------\r\n\r\n");
            }
        })
    }

    invoke(method, path, params, callback) {
        var apiName = [method, path].join(this.splitStr);
        for (var item in this.apis) {
            var p2r = pathToRegexp(item);
            var temp = p2r.exec(apiName);
            if (temp != null) {
                var method = temp.slice(1);
                p2r.keys.forEach(function (item, index) {
                    params[item.name] = method[index];
                });
                return this.apis[item].invoke(params, callback)
            }
        }
        return callback(new Error(`404 ${apiName} not found!`))
    }

    walkfile(root) {
        let files = fs.readdirSync(root);
        let result = [];
        let self = this;
        files.forEach(function (item, index) {
            let _tmppath = path.join(root, item)
            let stat = fs.statSync(_tmppath)
            if (stat.isDirectory()) {
                result = result.concat(self.walkfile(_tmppath))
            } else {
                result.push(_tmppath);
            }
        });
        return result;
    }
}

module.exports = Rest;