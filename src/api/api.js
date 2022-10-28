/*
 * @Author: ThomasHang 11939838031@qq.com
 * @Date: 2022-10-28 07:44:22
 * @LastEditors: ThomasHang 11939838031@qq.com
 * @LastEditTime: 2022-10-28 08:38:30
 * @FilePath: /ol-typhoon/src/api/api.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import fetch from '../assets/common/fetch';

export function getTyphoonData() {
  let url = '/data1.json';
  return fetch({
    method: 'Get',
    url,
  }).then((res) => {
    return res;
  });
}
