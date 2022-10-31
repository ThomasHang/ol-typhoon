/*
 * @Author: ThomasHang 11939838031@qq.com
 * @Date: 2022-10-30 22:11:26
 * @LastEditors: ThomasHang 11939838031@qq.com
 * @LastEditTime: 2022-10-31 08:36:14
 * @FilePath: /ol-typhoon/src/assets/common/feature.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
let featureObj = {
  //feature 类型判定
  typeJudge: function (feature) {
    if (feature.get('typhoonPoint')) {
      return 'typhoonPoint';
    } else if (feature.get('typhoonSolar')) {
      return 'typhoonSolar';
    } else {
      return 'isFeatureButDontNeedTodo';
    }
  },
  /**
   *
   * @param {*} feature
   */
  typhoonPointClick: function (feature) {
    console.log('click TyphoonPoint');
    console.log(feature);
  },
  typhoonPointHover: function (feature) {
    console.log('typhoonPoint');
    console.log(feature, 'hover');
    let points = feature.get('points');
    this.setInfoPosition(points);

    // let position = [points.lng, points.lat];
    this.map.getTargetElement().style.cursor = 'pointer';
    this.clearPointZoomStyle();
    feature.getStyle().getImage().setRadius(8);
    feature.changed();
    this.lastZoomPoint = feature;
  },

  /**
   *
   * 风圈相关
   */
  typhoonSolorClick: function (feature) {
    console.log('typhoonSolorClick', feature);
  },
  typhoonSolorHover: function (feature) {
    console.log('typhoonSolorHover', feature);
  },

  /**
   *
   * @returns 啥也不做
   */
  isFeatureButDontNeedTodoClick: function () {
    return;
  },
  isFeatureButDontNeedTodoHover: function () {
    console.log('no feature');
    return;
  },
};

export default featureObj;
