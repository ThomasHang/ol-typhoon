<!--
 * @Author: ThomasHang 11939838031@qq.com
 * @Date: 2022-10-28 07:39:23
 * @LastEditors: 储天航 1193983801@qq.com
 * @LastEditTime: 2022-10-28 19:21:19
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
import { Point, LineString } from 'ol/geom';
import { fromLonLat } from 'ol/proj';
import { Fill, Stroke, Circle, Style } from "ol/style"
export default ({
  name: "helloworld",
  data() {
    return {
      map: null
    }
  },
  methods: {
    drawTyphoonPath: async function () {
      const { data } = await getTyphoonData()
      let points = data.points
      console.log(data)
      let features = []
      for (let item of points) {
        let position = [item.lng, item.lat]
        console.log(position, "position")
        let featurePoint = new Feature({ geometry: new Point(fromLonLat(position)) })
        featurePoint.setStyle(new Style({
          image: new Ci
        }))
        features.push(featurePoint)
      }
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
        // center: fromLonLat([131.050000, 20.600000]),
        center: fromLonLat([
          118.758695,
          31.939462]),

        zoom: 8,
        maxZoom: 19,
        minZoom: 2,
      }),
    });
    this.drawTyphoonPath()
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
