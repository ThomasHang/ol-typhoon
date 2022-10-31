<!--
 * @Author: ThomasHang 11939838031@qq.com
 * @Date: 2022-10-28 07:39:23
 * @LastEditors: 储天航 1193983801@qq.com
 * @LastEditTime: 2022-10-29 17:00:19
 * @FilePath: /ol-typhoon/src/components/HelloWorld.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script >
import Map from 'ol/Map';
import OSM from 'ol/source/OSM';
import TileLayer from 'ol/layer/Tile';
import { getTyphoonData } from "../api/api.js"
import View from 'ol/View';
import 'ol/ol.css';
import Feature from 'ol/Feature';
import { Vector as VectorLayer, } from 'ol/layer';
import { Vector as VectorSource } from "ol/source"
import { Point, LineString, MultiLineString, Polygon } from 'ol/geom';
import { fromLonLat } from 'ol/proj';
import { Fill, Stroke, Circle, Style } from "ol/style"



export default ({
  name: "helloworld",
  data() {
    return {
      map: null,
      lastShowSolar: null,
      lastZoomPoint: null,
    }
  },
  methods: {
    drawTyphoonPath: async function () {
      const { data } = await getTyphoonData()
      let points = data.points
      console.log(data)
      let features = []
      let positions = []
      for (let item of points) {
        let position = [item.lng, item.lat]
        positions.push(position)
        let featurePoint = new Feature({ geometry: new Point(fromLonLat(position)) })
        featurePoint.setStyle(new Style({
          image: new Circle({
            fill: new Fill({
              color: this.judgeColorByWindLevel(item.strong)

            }),
            radius: 4
          })
        }))
        features.push(featurePoint)
      }
      console.log(positions, "positions")
      let fetureLine = new Feature({
        geometry: new MultiLineString([positions]).transform('EPSG:4326', 'EPSG:3857')

      })
      features.push(fetureLine)
      console.log(features, "features")
      let layer = new VectorLayer()
      let source = new VectorSource()
      source.addFeatures(features)
      layer.setSource(source)
      this.map.addLayer(layer)


      // const { data } = await getTyphoonData()

      // // let points = data.points
      // console.log(data)
      // let features = []
      // for (let item of data) {
      //   let position = [item.lon, item.lat]
      //   console.log(position, "position")
      //   let featurePoint = new Feature({ geometry: new Point(fromLonLat(position)) })
      //   features.push(featurePoint)
      // }
      // console.log(features, "features")
      // let layer = new VectorLayer()
      // let source = new VectorSource()
      // source.addFeatures(features)
      // layer.setSource(source)
      // this.map.addLayer(layer)


    },
    //画出台风路径 interval版
    drawTyphoonPathInterval: async function () {
      const { data } = await getTyphoonData()
      let points = data.points
      let index = 0
      let layer = new VectorLayer()
      let source = new VectorSource()
      layer.setSource(source)
      let intervalLogo = setInterval(() => {
        if (index == points.length) {
          clearInterval(intervalLogo)
          return
        }
        let position = [points[index].lng, points[index].lat]
        //点的数据源设置
        let featurePoint = new Feature({
          geometry: new Point(fromLonLat(position))
        })
        featurePoint.setStyle(new Style({
          image: new Circle({
            fill: new Fill({
              color: this.judgeColorByWindLevel(points[index].strong)
            }),
            radius: 4
          })
        }))
        featurePoint.set("typhoonPoint", true)
        //写到这里的时候，预期的结果应该是，如果有全都绘制了，没有清除上一个绘制的目标点
        if (points[index].radius7.length != 0 || points[index].radius7 != null) {
          let featureSolar = this.drawSolar(points[index])
          let lastShowSolar = this.lastShowSolar
          if (lastShowSolar != null) {
            source.removeFeature(lastShowSolar)
          }
          this.lastShowSolar = featureSolar
          source.addFeature(featureSolar)
        }
        source.addFeature(featurePoint)
        if (index > 0) {
          let lastPosition = [points[index - 1].lng, points[index - 1].lat]
          let featureLine = new Feature({
            geometry: new LineString([fromLonLat(position), fromLonLat(lastPosition)])
          })
          source.addFeature(featureLine)
        }
        index++
      }, 100)
      this.map.addLayer(layer)
    },
    //绘制风暴
    /**
     * 
     * @param {*} points 
     * 明确的只让他返回一个feature
     */
    drawSolar: function (points) {
      let radiusArr = points.radius7.split("|").map((item) => {
        return parseFloat(item)
      })
      var Configs = {
        CIRCLE_CENTER_X: parseFloat(points.lng),
        CIRCLE_CENTER_Y: parseFloat(points.lat),
        CIRCLE_R: {
          SE: radiusArr[0] / 100,
          NE: radiusArr[1] / 100,
          NW: radiusArr[2] / 100,
          SW: radiusArr[3] / 100,

        }
      }
      let positions = []
      var _interval = 6
      for (var i = 0; i < 360 / _interval; i++) {
        var _r = 0;
        var _ang = i * _interval;
        if (_ang > 0 && _ang <= 90) {
          _r = Configs.CIRCLE_R.NE;
        }
        else if (_ang > 90 && _ang <= 180) {
          _r = Configs.CIRCLE_R.NW;
        }
        else if (_ang > 180 && _ang <= 270) {
          _r = Configs.CIRCLE_R.SW;
        }
        else {
          _r = Configs.CIRCLE_R.SE;
        }

        var x = Configs.CIRCLE_CENTER_X + _r * Math.cos(_ang * 3.14 / 180);
        var y = Configs.CIRCLE_CENTER_Y + _r * Math.sin(_ang * 3.14 / 180);

        positions.push(fromLonLat([x, y]))
      }

      let feature = new Feature({
        geometry: new Polygon([positions])
      })
      return feature
    },

    //注册一个hover 事件
    designHoverOnMap: function () {
      let _this = this
      this.map.on('pointermove', function (ev) {
        let pixel = ev.pixel
        let feature = _this.map.forEachFeatureAtPixel(pixel, function (feature) {
          return feature
        })
        if (feature) {
          if (feature.get("typhoonPoint")) {
            _this.map.getTargetElement().style.cursor = "pointer"
            _this.clearPointZoomStyle()
            feature.getStyle().getImage().setRadius(8)
            _this.lastZoomPoint = feature
            feature.changed()
            // this.map.render()
          } else {
            _this.clearPointZoomStyle()
            _this.map.getTargetElement().style.cursor = ""

          }
        }
      })
    },

    designClickOnMap: function () {
      let _this = this
      this.map.on('click', function (ev) {
        let pixel = ev.pixel
        let feature = _this.map.forEachFeatureAtPixel(pixel, function (feature) {
          return feature
        })
        if (feature) {
          if (feature.get("typhoonPoint")) {
            console.log("click")
          } else {
            console.log("no feature")
          }
        }
      })
    },

    //clearPoint zoom Style
    clearPointZoomStyle: function () {
      let _this = this
      if (_this.lastZoomPoint != null) {
        _this.lastZoomPoint.getStyle().getImage().setRadius(4)
        _this.lastZoomPoint.changed()
      }
    },

    /**
     * 根据台风等级判断颜色
     * @param {string} windLevel  台风等级描述
     * @return {string} map[windLevel] color 台风等级描述
     */
    judgeColorByWindLevel: function (windLevel) {
      let map = {
        "热带风暴": "red",
        "热带低压": "blue",
        "强热带风暴": "green",
        "台风": "orange",
        "强台风": "yellow",
        "超强台风": "salmon",
      }
      return map[windLevel]
    }
  },
  created() {
  },
  mounted() {
    this.map = new Map({
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      target: 'map',
      view: new View({
        center: fromLonLat([131.050000, 20.600000]),
        // center: fromLonLat([
        //   118.758695,
        //   31.939462]),

        zoom: 5,
        maxZoom: 19,
        minZoom: 2,
      }),
    });
    // this.drawTyphoonPath()
    this.drawTyphoonPathInterval()
    this.designHoverOnMap()
    this.designClickOnMap()
  },
})

</script>

<template>
  <div id="map" class="map" tabindex="0"></div>
</template>

<style scoped>
.map {
  width: 100%;
  height: 100vh;
}

#map:focus {
  outline: #4A74A8 solid 0.15em;
}
</style>
