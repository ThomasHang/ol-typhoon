<!--
 * @Author: ThomasHang 11939838031@qq.com
 * @Date: 2022-10-31 00:04:13
 * @LastEditors: ThomasHang 11939838031@qq.com
 * @LastEditTime: 2022-11-01 22:48:15
 * @FilePath: /ol-typhoon/src/components/TyphoonInfo.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script>
export default {
    name: "TyphoonInfo",
    data() {
        return {}
    },
    props: {
        typhoonData: Object,
        closeInfo: Function
    },
    methods: {}

}
</script>
<template>
    <div class="typhoon-box">
        <div class="title">
            <span>实况台风信息</span>
            <i class="el-icon-close"></i>
        </div>
        <div class="second">
            <div class="left">
                <span class="leftSpan">编号：</span>
                <span class="rightSpan">{{ typhoonData.tcId }}</span>
            </div>
            <div class="right">
                <span class="leftSpan">强度：</span>
                <span class="rightSpan">{{ typhoonData.strong }}</span>
            </div>
        </div>
        <div class="third odd">
            <div class="left">
                <span class="leftSpan">名称：</span>
                <span class="rightSpan">{{ typhoonData.tscName }}</span>
            </div>
            <div class="right">
                <span class="leftSpan">时间：</span>
                <span class="rightSpan">{{ typhoonData.time }}</span>
            </div>
        </div>
        <div class="third odd">
            <div class="left">
                <span class="leftSpan">位置：</span>
                <span class="rightSpan">东经：{{ typhoonData.lng }},北纬：{{ typhoonData.lat }}</span>
            </div>

        </div>
        <div class="second">
            <div class="left">
                <span class="leftSpan">气压：</span>
                <span class="rightSpan">{{ typhoonData.time }}百帕</span>
            </div>
            <div class="right">
                <span class="leftSpan">风力：</span>
                <span class="rightSpan">{{ typhoonData.speed }}米/秒</span>
            </div>
        </div>
        <div class="second odd">
            <div class="left">
                <span class="leftSpan">6级风圈：</span>
                <span class="rightSpan">{{ typhoonData.rr06 }}公里</span>
            </div>
            <div class="right">
                <span class="leftSpan">7级风圈：</span>
                <span class="rightSpan">{{ typhoonData.rr07 }}公里</span>
            </div>
        </div>


    </div>
</template>
<style >
/* @border-color: rgba(255, 255, 255, 0.4)  */
.typhoon-box {
    width: 420px;
    height: 280px;
}
</style>