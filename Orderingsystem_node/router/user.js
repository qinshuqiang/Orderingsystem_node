let express = require('express')
let router = express.Router();
let { checkPassWorldFn, addUser, checkUser, login } = require('../util/user/checkUserInfo')
router.get("/orderList", (req, res) => {
    res.send("111")
});

router.post("/checkUser", (req, res) => {
    let username = req.body.username
    console.log(username);
    if (checkUser(username) == -1) return res.json({ status: -1, errMsg: "用户信息出错，请从新登陆" })
    else return res.json({ status: 0, errMsg: "" })
});
router.post("/registered", (req, res) => {
    //检查用户名
    if (!req.body.userName) return res.json({ status: -1, errMsg: "用户名错误" })
        //检查密码
    if (checkPassWorldFn(req.body.passWorld + '') != 0) return res.json({ status: -1, errMsg: "密码长度应为6-18位" })
    let data = addUser(req.body.userName, req.body.passWorld)
    if (!data) {
        return res.json({ status: 0, errMsg: "" })
    } else if (data == -1) {
        return res.json({ status: -1, errMsg: "用户已存在" })
    } else {
        return res.json({ status: -99, errMsg: data })
    }
});
router.post("/login", (req, res) => {
    //检查用户名
    if (!req.body.userName) return res.json({ status: -1, errMsg: "用户名错误" })
        //检查密码
    if (checkPassWorldFn(req.body.passWorld + '') != 0) return res.json({ status: -1, errMsg: "密码长度应为6-18位" })
    let data = login(req.body.userName, req.body.passWorld)
    if (data) return res.json({ status: -1, errMsg: "用户名或密码错误" })
    else res.json({ status: 0, errMsg: "" })
})

module.exports = router;