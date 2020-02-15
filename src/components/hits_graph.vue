<template>
  <div>
      <el-tabs v-model="activeName" @tab-click="selectType" tabPosition="bottom" stretch>
        <el-tab-pane label="COURSE" name="absoluteHits">打ったボールの絶対座標</el-tab-pane>
        <el-tab-pane label="SWING" name="absoluteBats">ミートポイント(そこを狙って振った場所)の絶対座標</el-tab-pane>
        <el-tab-pane label="IMPACT" name="relativeHits">ミートポイントから見た打ったボールの相対的な座標</el-tab-pane>
    </el-tabs>
      <Plotly :data="data" :layout="layout" @click="showDialog"/>
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
      <el-dialog
        title="打球情報"
        :visible.sync="pointSelected"
        width="30%"
      >
        <span>打球の情報表示</span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="pointSelected = false">閉じる</el-button>
            <el-button type="primary" @click="$router.push(targetUrl)">詳細</el-button>
        </span>
      </el-dialog>
  </div>
</template>

<script>
import { Plotly } from 'vue-plotly'

export default {
    components: {
        Plotly
    },
    data: function () {
        return {
            data: [{ 
                    x: [1, 3], 
                    y: [2, 4], 
                    z: [0, 5],
                    mode: 'markers',
                    marker: {
                        size: 5,
                        color: 'rgba(255, 0, 0, 1.0)',
                        opacity: 0.8
                    },
                    type: 'scatter3d'

            }],
            layout:{},
            options: {},
            ids: [1,5],
            activeName: "absoluteHits",
            targetUrl: "",
            pointSelected: false,
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
        },
        showDialog(e){
            const index = e.points[0].pointNumber;
            this.targetUrl = "/hits/" + this.ids[index];
            this.pointSelected = true;
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