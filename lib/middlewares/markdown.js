/**
 * Created by cavasblack on 16/9/2.
 */
module.exports = function () {
    Object.defineProperty(this, "md", {
        get: function () {
            var self = this;
            var strs = [
                `### ${this._detail || "暂无描述"}`,
                `#### *${this._method}* ${this._path}`,
                "|参数|类型|必须|默认|说明|",
                "|---|---|---|---|---|"
            ]
            Object.keys(this.params).forEach(function (item, index) {
                strs.push([item, self.params[item].type, self.requireds[item] ? "Yes" : "No", self.params[item].default || " ", self.params[item].detail || "暂无", ""].join("|"));
            });
            strs.push("#### example");
            strs.push(`\t ${this._example || "暂无数据"}`)
            return strs.join("\r\n");
        }
    })
}