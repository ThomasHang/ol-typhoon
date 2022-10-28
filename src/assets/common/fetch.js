/*
 * @Author: ThomasHang 11939838031@qq.com
 * @Date: 2022-10-28 07:44:02
 * @LastEditors: ThomasHang 11939838031@qq.com
 * @LastEditTime: 2022-10-28 08:33:19
 * @FilePath: /ol-typhoon/src/assets/common/fetch.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import axios from 'axios';

const service = axios.create({
  timeout: 30000,
  withCredentials: true,
});
axios.defaults.transformRequest = [
  function (data) {
    let newData = '';
    for (let k in data) {
      newData += `${encodeURIComponent(k)}=${encodeURIComponent(data[k])}&`;
    }
    return newData;
  },
];
axios.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default service;
