<template>
  <div>
      <el-tabs v-model="activeName" @tab-click="selectType" tabPosition="bottom" stretch>
        <el-tab-pane label="COURSE" name="absoluteHits">打ったボールの絶対座標</el-tab-pane>
        <el-tab-pane label="SWING" name="absoluteBats">ミートポイント(そこを狙って振った場所)の絶対座標</el-tab-pane>
        <el-tab-pane label="IMPACT" name="relativeHits">ミートポイントから見た打ったボールの相対的な座標</el-tab-pane>
    </el-tabs>
      <vue-plotly :data="data" :layout="layout" :options="options"/>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span>フィルター</span>
        </div>
        <el-form ref="form" :model="filter" label-width="20%">
        <el-form-item label="打者">
            <el-select v-model="filter.batterId" placeholder="プレイヤーID">
            </el-select>
        </el-form-item>
        <el-form-item label="投手">
            <el-select v-model="filter.pitcherId" placeholder="プレイヤーID">
            </el-select>
        </el-form-item>
        <el-form-item label="飛距離">
            <el-input-number v-model="filter.distance.threshold" class="filterInput"/>
            <el-select v-model="filter.distance.condtion">
                <el-option label="以上" value=">" default/>
                <el-option label="以下" value="<"/>
            </el-select>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="extract">抽出</el-button>
        </el-form-item>
      </el-form>
      </el-card>
  </div>
</template>

<script>
import VuePlotly from '@statnett/vue-plotly'

export default {
    components: {
        VuePlotly
    },
    data: function () {
        return {
            data: [{ x: [1, 3], y: [2, 4] }],
            layout: {},
            options: {},
            activeName: 'absoluteHits',
            filter:{
                batterId: 0,
                pitcherId: 0,
                distance:{
                    threshold: 0,
                    condition: ">"
                }
            }
        }
    },
    methods: {
        selectType(tab, e) {
            console.log(tab, e);
            // 開くタブごとにデータを差し替える処理
        },
        extract(e){
             console.log(e);
        }
    }
}
</script>
<style>
.el-tabs__item{
    font-family: 'Odibee Sans', cursive;
}
.el-card{
    margin-top: 1em;
}
</style>