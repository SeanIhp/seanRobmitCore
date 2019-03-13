import axios from 'axios'
import qs from 'qs'
import iView from 'iview'; //引入iView库，来调用UI显示
// import config from './config'

const fetch = (options) => {
    const { method = 'get', data, url } = options;
    switch (method.toLowerCase()) {
        case 'get':
            return axios.get(`${url}${options.data ? `?${qs.stringify(options.data)}` : ''}`)
        case 'delete':
            return axios.delete(url, { data })
        case 'head':
            return axios.head(url, data)
        case 'post':
            return axios.post(url, data)
        case 'put':
            return axios.put(url, data)
        case 'patch':
            return axios.patch(url, data)
        default:
            return axios(options)
    }
}

// 网络请求方法封装，返回promise对象
export async function request(options, succCallBack) {
    return fetch(options).then((response) => {
        // console.log('response',response.data);
        // console.log('xxxx  ',succCallBack);
        succCallBack(response.data);
        // console.log(response);
        // return false;
        // const data = response.data;
        // 根据API约定全局错误提示判断
        // 目前用==来判断状态，因为API返回数据目前数值型是string类型，用==来自动转换类型，支持string和int
        // if (data.returncode == 0) {
        //     succCallBack(data);
        // } else {
        //     // 业务处理错误提示
        //     iView.Modal.error({
        //         title: '错误提示',
        //         content: data.data
        //     });
        // }
    }).catch((error) => {
        console.log('error  ',error);
        console.log("error.response:", error.response);
        // API接口网络不通错误提示
        // iView.Modal.error({
        //     title: '错误提示',
        //     content: 'API请求:' + error.response.status + '-' + error.response.statusText + '\n' + error.response.request.responseURL
        // });
    })
}



