<template>
  <div>
      <div class="description">
          <p>色が白っぽいものほど優秀（打球が弱い）ベース色は↓</p>
          <span class="sample" 
           v-for="(color, ballType) in ballTypes" :key=ballType 
           :style="'background:' + color + ' 1.0);'">
          {{ballType}}
          </span>
      </div>
      <Plotly :data="data" :layout="layout" @click="showDialog" v-loading="loading" />
      <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span>フィルター</span>
        </div>
        <el-form ref="form" :model="filter" label-width="20%">
        <el-form-item label="投手">
            <el-select v-model="filter.pitcherId" placeholder="プレイヤーID">
                <el-option label="指定なし" :value="null"/>
                <el-option
                v-for="player in players"
                :key="player.id"
                :label="player.id"
                :value="player.id" />
            </el-select>
        </el-form-item>
        <el-form-item label="球種">
            <el-select v-model="filter.ballType">
                <el-option label="指定なし" :value="null"/>
                <el-option v-for="ballType in Object.keys(ballTypes)" :key=ballType :label=ballType :value=ballType />
            </el-select>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="extract">抽出</el-button>
        </el-form-item>
      </el-form>
      </el-card>
      <el-dialog
        title="投球情報"
        :visible.sync="pointSelected"
        width="30%"
      >
        <span>打球の情報表示</span>
        <ul>
            <li>投手ID: {{selectedBall.pitcherId}}</li>
            <li>球種: {{selectedBall.name}}</li>
            <li>X: {{selectedBall.x}}</li>
            <li>Y: {{selectedBall.y}}</li>
            <li>Z: {{selectedBall.z}}</li>
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
                        eye:{x: 0, y: 0, z: 1},
                    },
                    xaxis: {range: [-5, 5]},
                    yaxis: {range: [0, 5]},
                    zaxis: {range: [10, 20]}
                },
            },
            options: {},
            hitIds: [],
            targetUrl: "",
            pointSelected: false,
            selectedBall: {
                pitcherId: null,
                name: "",
                x: null,
                y: null,
                z: null
            },
            ballTypes:{
                "Fast": "rgba(231, 76, 60,", 
                "Slider": "rgba(241, 196, 15,", 
                "Curve": "rgba(230, 126, 34,", 
                "Fork": "rgba(52, 152, 219,", 
                "Shuuto": "rgba(39, 174, 96,", 
                "Sinker": "rgba(22, 160, 133,", 
                "Knuckle": "rgba(142, 68, 173,"
            },
            filter:{
                pitcherId: null,
                ballType: null,
            },
            resourcePath: 'pitches/'
        }
    },
    methods: {
        extract(){
            this.$router.push({query:this.filter}).catch(e => {e})
        },
        showDialog(e){
            this.selectedBall.pitcherId = e.points[0].data.playerId
            this.selectedBall.name = e.points[0].data.name
            this.selectedBall.x = e.points[0].data.x[0]
            this.selectedBall.y = e.points[0].data.y[0]
            this.selectedBall.z = e.points[0].data.z[0]

            this.targetUrl = "/hit/" + e.points[0].data.hitId
            this.pointSelected = true;
        },
        prepareFilter()
        {
            if(Object.keys(this.$route.query).length <= 0) return;
            const filter = JSON.parse(JSON.stringify(this.$route.query))
            this.filter = filter
            let q = {};
            if(this.filter.ballType){
                q.name = filter.ballType
            }
            if(this.filter.pitcherId){
                q.player_id = filter.pitcherId
            }
            if(Object.keys(q).length > 0){
                this.query.q = JSON.stringify(q);
            }
        },
        recordsToData(){
            this.data = []
            this.hitIds = []
            this.records.items.forEach(record => {
                 let datum =  {
                    x:[], y: [], z: [],
                    playerId: null,
                    hitId: null,
                    mode: 'lines',
                    name: "",
                    marker: {
                        size: 1,
                        color: 'rgba(0, 0, 0, 1.0)',
                        opacity: 1
                    },
                    type: 'scatter3d'

                }
                datum.x[0] = record.fromx
                datum.x[1] = record.tox
                datum.y[0] = record.fromy
                datum.y[1] = record.toy
                datum.z[0] = record.fromz
                datum.z[1] = record.toz
                datum.name = record.name
                datum.playerId = record.player_id 
                datum.hitId = record.hitid;
                if(record.name in this.ballTypes){
                    datum.marker.color = this.ballTypes[record.name]
                }else{
                    datum.marker.color = 'rgba(0, 0, 0,'
                }
                let opacity = 0.01
                if(record.hitvelocity > 0){
                    opacity = record.hitvelocity / 5
                }
                datum.marker.color += opacity + ')'
                this.data.push(datum)
            })
        }
    }
}
</script>

<style scoped>
 .sample{
     margin-right: 1em;
     color: #eee;
     border-radius: 1em;
     padding: 0 .5em;
     font-size: 70%;
 }
 .description {
     margin: .5em 0;
 }
</style>