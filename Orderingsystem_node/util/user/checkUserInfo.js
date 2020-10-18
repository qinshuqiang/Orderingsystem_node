let { readFileJson } = require("../file/readFile")
let { WriteFileJson } = require("../file/writeFile")
    //传入密码    -2 大于于18位  -1 少于6位
let checkPassWorldFn = (passWorld) => {
    if (!passWorld) {
        return 3
    }
    if (passWorld.length > 18) {
        return 2
    } else if (passWorld.length < 6) {
        return 1
    } else {
        return 0
    }
}


//添加用户 0 -无，直接创建
let addUser = (userName, passWorld) => {
    let readData = readFileJson("user")
        //没有找到这个文件
    if (!readData) {
        readData = {}
        readData[userName] = {
            userName,
            passWorld
        }
        return WriteFileJson(readData, "user")
    } else {
        //检查一下用户是否已存在
        readData = JSON.parse(readData)
        let bl = false
        for (const key in readData) {
            if (key == userName) {
                bl = true
                break;
            }
        }
        if (bl) return -1

        readData[userName] = {
            userName,
            passWorld
        }
        return WriteFileJson(readData, "user")
    }
}
let checkUser = (userName) => {
    if (!userName) return -1
    let readData = readFileJson("user")
        //没有找到这个文件
    if (!readData) {
        return -1
    } else {
        //检查一下用户是否已存在
        readData = JSON.parse(readData)
        let bl = false
        for (const key in readData) {
            if (key == userName) {
                bl = true
                break;
            }
        }
        if (bl) return 0
        return -1
    }
}
let login = (userName, passWorld) => {
    let readData = readFileJson("user")
        //没有找到这个文件
    if (!readData) return -1
    else {
        readData = JSON.parse(readData)
        let bl = false
        for (const key in readData) {
            if (key == userName && readData[key].passWorld == passWorld) {
                bl = true
                break;
            }
        }
        if (!bl) return -1
        else return 0

    }
}
module.exports = {
    addUser,
    login,
    checkUser,
    checkPassWorldFn
};