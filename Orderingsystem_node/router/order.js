let express = require('express')
let router = express.Router();
let { checkUser } = require('../util/user/checkUserInfo')
let { getOrderInfo, postOrderInfo } = require('../util/order/getOrder')
router.get("/getOrder", (req, res) => {
    let username = req.query.username
    if (checkUser(username) == -1) return res.json({ status: -1, errMsg: "用户信息出错，请从新登陆" })
    let resData = getOrderInfo(username)
    if (resData == -2) return res.json({ status: 0, errMsg: "", data: [] })
    else return res.json({ status: 0, errMsg: "", data: resData })
});
router.post('/postOrder', (req, res) => {
    let username = req.body.username
    let orderInfo = req.body.orderInfo
    if (checkUser(username) == -1) return res.json({ status: -1, errMsg: "用户信息出错，请从新登陆" })
    let resData = postOrderInfo(username, orderInfo)
    if (!resData) return res.json({ status: 0, errMsg: "" })
    else return res.json({ status: -1, errMsg: "添加订单出错" })

})
module.exports = router;