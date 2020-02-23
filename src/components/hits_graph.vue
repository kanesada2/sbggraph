<template>
  <div>
      <el-tabs v-model="activeName" @tab-click="setupData" tabPosition="bottom" stretch>
        <el-tab-pane label="COURSE" name="absoluteHits">打ったボールの絶対座標</el-tab-pane>
        <el-tab-pane label="SWING" name="absoluteBats">ミートポイント(そこを狙って振った場所)の絶対座標</el-tab-pane>
        <el-tab-pane label="IMPACT" name="relativeHits">ミートポイントから見た打ったボールの相対的な座標</el-tab-pane>
    </el-tabs>
      <Plotly :data="data" :layout="layout" @click="showDialog" v-loading="loading"/>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span>フィルター</span>
        </div>
        <el-form ref="form" :model="filter" label-width="20%">
        <el-form-item label="打者">
            <el-select v-model="filter.batterId" placeholder="プレイヤーID">
                <el-option label="指定なし" :value="null"/>
                <el-option
                v-for="player in players"
                :key="player.id"
                :label="player.id"
                :value="player.id" />
            </el-select>
        </el-form-item>
        <el-form-item label="球種">
            <el-select v-model="filter.ballType" placeholder="球種">
                <el-option label="指定なし" :value="null"/>
                <el-option v-for="ballType in ballTypes" :key=ballType :label=ballType :value=ballType />
            </el-select>
        </el-form-item>
        <el-form-item label="飛距離">
            <el-input-number v-model="filter.distance.threshold" class="filterInput"/>
            <el-select v-model="filter.distance.condition">
                <el-option label="指定なし" :value="null"/>
                <el-option label="以上" value="$gte"/>
                <el-option label="以下" value="$lte"/>
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
        <ul>
            <li>打者ID: {{selectedHit.batterId}}</li>
            <li>球種: {{selectedHit.ballType}}</li>
            <li>X: {{selectedHit.x}}</li>
            <li>Y: {{selectedHit.y}}</li>
            <li>Z: {{selectedHit.z}}</li>
        </ul>
        <span slot="footer" class="dialog-footer">
            <el-button @click="pointSelected = false">閉じる</el-button>
            <el-button type="primary" @click="$router.push(targetUrl)">詳細</el-button>
        </span>
      </el-dialog>
  </div>
</template>

<script>
import { Plotly } from 'vue-plotly'
import datamixin from '@/mixins/datamixin'

export default {
    components: {
        Plotly
    },
    mixins: [datamixin],
    data: function () {
        return {
            data: [],
            layout:{
                paper_bgcolor : "#dcdde1",
                plot_bgcolor : "#dcdde1",
                scene: {
                    camera: {
                        up:{x: 0, y: 1, z: 0},
                        eye:{x: 0, y: 0, z: 1}
                    },
                    xaxis: {range: [-5, 5]},
                    yaxis: {range: [-1, 4]},
                    zaxis: {range: [-5, 5]}
                }
            },
            options: {},
            activeName: "absoluteHits",
            targetUrl: "",
            pointSelected: false,
            selectedHit: {
                batterId: null,
                ballType: "",
                x: null,
                y: null,
                z: null
            },
            ballTypes:[
                "Fast", "Slider", "Curve", "Fork", "Shuuto", "Sinker", "Knuckle"
            ],
            filter:{
                batterId: null,
                ballType: null,
                distance:{
                    threshold: 0,
                    condition: null
                }
            },
            resourcePath : 'hits/',
        }
    },
    methods: {
        extract(){
            if(this.filter.ballType){
                this.resourcePath = 'typedhits/' + this.filter.ballType;
            }else{
                this.resourcePath = 'hits/'
            }
            let filterClause = {};
            if(this.filter.batterId){
                filterClause.player_id = this.filter.batterId;
            }
            if(this.filter.distance.condition){
                filterClause.distance = {[this.filter.distance.condition] :this.filter.distance.threshold};
            }
            if(Object.keys(filterClause).length > 0){
                this.query.q = JSON.stringify(filterClause);
            }
            this.setupData()
        },
        showDialog(e){
            const index = e.points[0].pointNumber;
            this.selectedHit.batterId = e.points[0].data.playerId[index]
            this.selectedHit.ballType = e.points[0].data.ballType[index]
            this.selectedHit.x = e.points[0].data.x[index]
            this.selectedHit.y = e.points[0].data.y[index]
            this.selectedHit.z = e.points[0].data.z[index]

            this.targetUrl = "/hit/" + this.data[0].id[index];
            this.pointSelected = true;
        },
        recordsToData(){
            let data = { 
                x:[],
                y:[],
                z:[],
                id:[],
                ballType: [],
                playerId: [],
                mode: 'markers',
                marker: {
                    size: 2,
                    color: [],
                    opacity: 1.0
                },
                type: 'scatter3d'
            }
            let processer = (record => {console.log(record)});
            switch(this.activeName){
                case "absoluteHits":
                    processer = (record => {
                        data.x.push(record.hitx)
                        data.y.push(record.hity)
                        data.z.push(record.hitz)
                        data.id.push(record.id)
                        data.ballType.push(record.ball_type)
                        data.playerId.push(record.player_id)
                        const color = 'rgba(255, 0, 0, ' + record.distance / 200 + ')'
                        data.marker.color.push(color)
                        this.layout.scene.xaxis = {range:[-5, 5]}
                        this.layout.scene.yaxis = {range:[-1, 4]}
                        this.layout.scene.zaxis = {range:[-5, 5]}
                    })
                    break
                case "absoluteBats":
                    processer = (record => {
                        data.x.push(record.batx)
                        data.y.push(record.baty)
                        data.z.push(record.batz)
                        data.id.push(record.id)
                        data.ballType.push(record.ball_type)
                        data.playerId.push(record.player_id)
                        const color = 'rgba(255, 0, 0, ' + record.distance / 200 + ')'
                        data.marker.color.push(color)
                        this.layout.scene.xaxis = {range:[-5, 5]}
                        this.layout.scene.yaxis = {range:[-1, 4]}
                        this.layout.scene.zaxis = {range:[-5, 5]}
                    })
                    break
                case "relativeHits":
                    processer = (record => {
                        data.x.push(record.hitx - record.batx)
                        data.y.push(record.hity - record.baty)
                        data.z.push(record.hitz - record.batz)
                        data.id.push(record.id)
                        data.ballType.push(record.ball_type)
                        data.playerId.push(record.player_id)
                        const color = 'rgba(255, 0, 0, ' + record.distance / 200 + ')'
                        data.marker.color.push(color)
                    })
                    this.layout.scene.xaxis = {range:[-3, 3]}
                    this.layout.scene.yaxis = {range:[-3, 3]}
                    this.layout.scene.zaxis = {range:[-3, 3]}
                    break
            }
            this.records.items.forEach(processer)
            this.data = [data]
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