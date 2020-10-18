let fs = require('fs');
let path = require('path');
/**
 * 
 * @param {string} fileName  查询的文件名称
 *  0  没查到  否则  返回文件内容
 */
let readFileJson = (fileName) => {
    let file = path.join(__dirname, `../../data/${fileName}.json`);
    return fs.readFileSync(file).toString()
}
module.exports = {
    readFileJson
};