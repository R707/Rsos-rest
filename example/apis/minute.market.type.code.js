/**
 * Created by cavasblack on 16/9/2.
 */
module.exports = function (api, types) {
    api.method("GET")
        .detail("这是关于股票获取的接口")
        .path("/minute/:market/:type/:code")
        .param("market", {
            type: types.String(function (value) {
                return value.toUpperCase()
            }),
            detail: "市场"
        })
        .param("type", {
            type: types.String(function (value) {
                return value.toUpperCase()
            }),
            detail: "类型"
        })
        .param("code", {
            type: types.String(function (value) {
                return value.toUpperCase()
            }),
            detail: "代码"
        })
        .param("date", {
            type: types.String(),
            detail: "日期"
        })
        .required("market", "type", "code")
        .exec(function (params, callback) {
            callback(null, params);
        });
    return api;
}