//  引入axios文件包
import axios from 'axios'
axios.defaults.baseURL = "http://192.168.1.3:8000/"
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded';
export const post = (url, params) => {
    return axios({
        method: 'post',
        url: url,
        data: params,
    });
}

//  GET 方法封装
export const get = (url, params) => {
    return axios({
        method: 'get',
        data: params,
        url: url
    });
}