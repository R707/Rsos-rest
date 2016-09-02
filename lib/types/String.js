/**
 * Created by cavasblack on 16/9/1.
 */
"use strict"
class MyString {
    constructor(regExp, format) {
        if (typeof(arguments[0]) == "function") {
            format = arguments[0];
            regExp = null;
        }
        this.regExp = regExp || /.*/;
        this.format = format;
    }

    check(value) {
        var result = this.regExp.exec(value);
        return (!!value && !!result.length)
    }

    toValue(value) {
        if (typeof(this.format) == "function") {
            return this.format(value.toString())
        }
        return value.toString();
    }

    toString() {
        return "String"
    }
}

module.exports = MyString;