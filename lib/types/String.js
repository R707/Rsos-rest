/**
 * Created by cavasblack on 16/9/1.
 */
"use strict"
class MyString {
    constructor(regExp) {
        this.regExp = regExp || /.*/;
    }

    check(value) {
        var result = this.regExp.exec(value);
        return (!!value && !!result.length)
    }

    toValue(value) {
        return value.toString();
    }

    toString() {
        return "String"
    }
}

module.exports = MyString;