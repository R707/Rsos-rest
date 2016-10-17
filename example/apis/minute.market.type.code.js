/**
 * Created by cavasblack on 16/9/2.
 */
"use strict"
const Api = require("../../lib").Api
const Types = require("../../lib").Types
module.exports = function (app) {

    let api1 = new Api().method("GET")
        .detail("内容")
        .path("/demo/:name")
        .param("name", {
            type: Types.String(function (value) {
                return value.toUpperCase()
            })
        })
        .param("age", {
            type: Types.Number()
        })
        .required("name", "age")
        .exec(function (params, callback) {
            callback(null, params)
        })

    let api2 = new Api().method("GET")
        .detail("内容2")
        .path("/demo2/:name")
        .param("name", {
            type: Types.String(function (value) {
                return value.toUpperCase()
            })
        })
        .param("age", {
            type: Types.Number()
        })
        .required("name")
        .exec(function (params, callback) {
            callback(null, params)
        })

    app.use(api1)

    app.use(api2)
}