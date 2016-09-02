/**
 * Created by cavasblack on 16/9/2.
 */
"use strict"
class MyNumber {
    constructor() {

    }

    check(value) {
        return typeof(value) == "number"
    }

    toValue(value) {
        return value;
    }

    toString() {
        return "Number"
    }
}

module.exports = MyNumber;