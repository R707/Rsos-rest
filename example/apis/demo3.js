/**
 * Created by cavasblack on 16/10/17.
 */
"use strict"

const Api = require("../../lib").Api
const Types = require("../../lib").Types
module.exports = function (app) {

    let api = new Api().method("GET")
        .path("/demo3")
        .param("name", {
            type: Types.String(function (value) {
                return value.toUpperCase()
            })
        })
        .exec(function (params, callback) {
            callback(null, params)
        })

    app.use(api)
}