let fs = require('fs'); //文件模块
let path = require('path'); //系统路径模块
let WriteFileJson = (obj, fileName) => {
    let file = path.join(__dirname, `../../data/${fileName}.json`);
    let content = JSON.stringify(obj)
    fs.writeFileSync(file, content, function(err) {
        if (err) {
            return err
        } else {
            return 0
        }
    });
}
module.exports = {
    WriteFileJson
};