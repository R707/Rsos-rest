/**
 * Created by cavasblack on 16/9/2.
 */
"use strict"

class Email {
    constructor(regExp) {
        this.regExp = regExp || /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/;
    }

    check(value) {
        var result = this.regExp.exec(value);
        return (!!value && !!result.length)
    }

    toValue(value) {
        return value.toString();
    }

    toString() {
        return "Email"
    }
}

module.exports = Email;