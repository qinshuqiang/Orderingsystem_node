let writeFile = require('../file/writeFile');
let addUserFn = (obj, userName, passWorld) => {
    return new Promise(resolve => {
        let jsonObj = {}
        if (obj) jsonObj = obj
        jsonObj[userName] = { userName, passWorld }
        writeFile(jsonObj, "user")
    })
}
module.exports = {
    addUserFn
};