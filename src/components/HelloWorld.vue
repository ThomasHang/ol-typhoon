<!--
 * @Author: ThomasHang 11939838031@qq.com
 * @Date: 2022-10-28 07:39:23
 * @LastEditors: ThomasHang 11939838031@qq.com
 * @LastEditTime: 2022-10-28 08:36:04
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
        features.push(featurePoint)
      }
      console.log(features, "features")
      let layer = new VectorLayer()
      let source = new VectorSource()
      source.addFeatures(features)
      layer.setSource(source)
      this.map.addLayer(layer)

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
        zoom: 5,
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
  height: 100%;
}

#map:focus {
  outline: #4A74A8 solid 0.15em;
}
</style>
