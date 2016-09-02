/**
 * Created by cavasblack on 16/9/2.
 */
"use strict"
class MyBoolean {
    constructor(regExp) {
        this.regExp = regExp || /.*/;
    }

    check(value) {
        return typeof(value) == "boolean"
    }

    toValue(value) {
        return value;
    }

    toString() {
        return "Boolean"
    }
}

module.exports = MyBoolean;