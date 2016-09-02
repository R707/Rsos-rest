/**
 * Created by cavasblack on 16/9/2.
 */
"use strict"
const MyString = require("./string");
const MyBoolean = require("./boolean");
const MyNumber = require("./number");
const MyEmail = require("./email")
module.exports.String = function (regExp) {
    return new MyString(regExp);
}

module.exports.Boolean = function () {
    return new MyBoolean();
}

module.exports.Number = function () {
    return new MyNumber();
}

module.exports.Email = function (regExp) {
    return new MyEmail(regExp)
}