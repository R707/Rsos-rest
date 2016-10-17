/**
 * Created by cavasblack on 16/9/2.
 */
"use strict"
class MyNumber {
    constructor() {

    }

    check(value) {
        value = this.toValue(value)
        // return typeof(value) == "number"
        return !isNaN(value)
    }

    toValue(value) {
        return Number(value);
    }

    toString() {
        return "Number"
    }
}

module.exports = MyNumber;