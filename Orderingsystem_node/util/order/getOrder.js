let { readFileJson } = require("../file/readFile")
let { WriteFileJson } = require("../file/writeFile")
let getOrderInfo = (userName) => {
    let readData = readFileJson("order")
    if (!readData) {
        return -2
    } else {
        readData = JSON.parse(readData)
        let order
        readData.forEach(ele => ele.name == userName && (order = ele.list))
        if (!order) return -2
        else return order
    }

}
let postOrderInfo = (username, orderInfo) => {
    let readData = readFileJson("order")
    if (!readData) {
        readData = []
        let obj = { name: '', list: [] }
        obj.name = username
        obj.list = orderInfo
        readData.push(obj)
        WriteFileJson(readData, "order")
        return 0
    } else {
        readData = JSON.parse(readData)
        let bl = false
        readData.forEach(e => {
            if (e.name == username)(e.list = orderInfo) && (bl = true)
        })
        if (bl) {
            WriteFileJson(readData, "order")
            return 0
        } else {
            let obj = { name: '', list: [] }
            obj.name = username
            obj.list = orderInfo
            readData.push(obj)
            WriteFileJson(readData, "order")
            WriteFileJson(readData, "order")
            return 0
        }

    }
}
module.exports = {
    getOrderInfo,
    postOrderInfo
};