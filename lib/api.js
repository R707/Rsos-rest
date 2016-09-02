/**
 * Created by cavasblack on 16/9/1.
 */
"use strict"

const mkmiddle = require("./middlewares/markdown")

class Api {

    constructor(method, path) {
        this.method = method;
        this.path = path;
        this.params = {};
        this.requireds = {};
        this._example = null;
        this.execfn = null;
        this.groupid = null;
        mkmiddle.call(this)
    }

    group(groupid) {
        this.groupid = groupid;
        return this;
    }

    param(key, opts) {
        this.params[key] = opts;
        return this;
    }

    example(example) {
        this._example = example;
        return this;
    }

    required() {
        var self = this;
        [].slice.apply(arguments).forEach(function (item, index) {
            self.requireds[item] = true;
        });
        return this;
    }

    check(params, callback) {
        var result = {};
        for (var key in this.params) {
            if (this.requireds[key] && (params[key] == null || params[key] == undefined)) {
                return callback(`${key} is required`);
            } else {
                if (this.params[key].type && params[key]) {
                    var f = this.params[key].type.check(params[key]);
                    if (!f)return callback(new Error(`${key} is illegal`));
                    result[key] = this.params[key].type.toValue(params[key]);
                } else if (this.params[key].type) {
                    result[key] = this.params[key].default
                }
            }
        }
        callback(null, result);
    }

    doExec(params, callback) {
        var self = this;
        this.check(params, function (err, params) {
            if (err)return callback(err);
            if (self.execfn) {
                return self.execfn(params, callback);
            } else {
                return callback(new Error(`no exec fn !`));
            }
        });
    }

    exec(fn) {
        this.execfn = fn;
        return this;
    }

}

module.exports = Api;