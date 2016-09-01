/**
 * Created by cavasblack on 16/9/1.
 */
"use strict"
class Api {
    constructor(method, path) {
        this.method = method;
        this.path = path;
        this.params = {};
        this.requireds = {};
        this._example = null;
        this.execfn = null;
        this.groupid = null;
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
            if (this.requireds[key] && (params[key] != null || params[key] != undefined)) {
                return callback(`${key} is required`);
            } else {
                if (this.params[key].type) {
                    var f = this.params[key].type.check(params[key]);
                    if (!f)return callback(new Error(`${key} is illegal`));
                    result[key] = this.params[key].type.toValue(params[key]);
                } else {
                    result[key] = params[key];
                }
            }
        }
        callback(null, result);
    }

    doExec(params, callback) {
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

    toMD() {
        var self = this;
        var strs = [
            `#### ${this.groupid}`,
            `##### *${this.method}* ${this.path}`,
            "|参数|类型|必须|默认|说明",
            "|---|---|---|---|---"
        ]
        Object.keys(this.params).forEach(function (item, index) {
            strs.push([item, self.params[item].type, self.requireds[item] ? "Yes" : "NO", self.params[item].default || "", self.params[item].detail || ""].join("|"));
        });
        strs.push("##### example");
        strs.push(`\t ${this._example}`)
        return strs.join("\r\n");
    }

}

module.exports = Api;