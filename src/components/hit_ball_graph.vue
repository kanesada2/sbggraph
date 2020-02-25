<template>
  <div>
      <Plotly :data="data" :layout="layout" v-loading="loading"/>
      <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>ボール情報</span>
          </div>
          <ul>
              <li>投手ID:{{this.ballInfo.pitcherId}}</li>
              <li>球種:{{this.ballInfo.name}}</li>
              <li>球速:{{this.ballInfo.velocity}}km/h</li>
              <li>打者ID:{{this.hitInfo.batterId}}</li>
              <li>打球速度:{{this.hitInfo.velocity}}km/h</li>
              <li>打出角度:{{this.hitInfo.pitch}}度</li>
              <li>飛距離:{{this.hitInfo.distance}}m</li>
          </ul>
      </el-card>
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
            data: [
            ],
            layout:{
                paper_bgcolor : "#dcdde1",
                plot_bgcolor: "#dcdde1",
                scene: {
                    camera: {
                        up:{x: 0, y: 1, z: 0},
                        eye:{x: 0, y: 0, z: 1}
                    },
                    xaxis: {range: [-5, 5]},
                    yaxis: {range: [-2, 5]},
                    zaxis: {range: [-5, 20]}
                },
            },
            options: {},
            ballInfo: {
                pitcherId: "取得中...",
                velocity: "取得中...",
                name: "取得中..."
            },
            hitInfo: {
                batterId: "取得中...",
                velocity: "取得中...",
                pitch: "取得中...",
                distance: "取得中...",
            }
        }
    },
    created() {
        this.resourcePath = 'hits/' + this.$route.params.id
    },
    methods: {
        getColor(name){
            const ballTypes = {
                    "Fast": "rgba(231, 76, 60, 1.0)", 
                    "Slider": "rgba(241, 196, 15, 1.0)", 
                    "Curve": "rgba(230, 126, 34, 1.0)", 
                    "Fork": "rgba(52, 152, 219, 1.0)", 
                    "Shuuto": "rgba(39, 174, 96, 1.0)", 
                    "Sinker": "rgba(22, 160, 133, 1.0)", 
                    "Knuckle": "rgba(142, 68, 173, 1.0)"
            }
            if(name in ballTypes){
                return ballTypes[name]
            }
            return "rgba(0, 0, 0, 1.0)"
        },
        recordsToData(){
            this.data = [];
            this.data.push({x:[this.records.hitx], y: [this.records.hity], z: [this.records.hitz],
                    mode: 'markers',
                    name: 'Impact-Point',
                    marker: {
                        size: 3,
                        color: '#c23616',
                    },
                    type: 'scatter3d'
            })
            this.data.push({x:[this.records.batx], y: [this.records.baty], z: [this.records.batz],
                    mode: 'markers',
                    name: 'Swing-Point',
                    marker: {
                        size: 3,
                        color: '#fbc531',
                    },
                    type: 'scatter3d'
            })
            const color = this.getColor(this.records.name)
            this.data.push({
                    x:[this.records.fromx, this.records.tox], 
                    y: [this.records.fromy, this.records.toy], 
                    z: [this.records.fromz, this.records.toz],
                    mode: 'lines',
                    name: this.records.name,
                    line: {
                        width: 5,
                        color: color,
                    },
                    type: 'scatter3d'
            })
            const ballVel = Math.sqrt(Math.pow(this.records.tox - this.records.fromx, 2) + Math.pow(this.records.toy - this.records.fromy, 2) + Math.pow(this.records.toz - this.records.fromz, 2))
            this.ballInfo.pitcherId = this.records.player_id
            this.ballInfo.velocity = Math.round(ballVel * 720) / 10
            this.ballInfo.name = this.records.name
            this.hitInfo.batterId = this.records.batter_id
            this.hitInfo.velocity = Math.round(this.records.velocity * 720) / 10
            this.hitInfo.pitch = Math.round(this.records.pitch * 10) / 10
            this.hitInfo.distance = Math.round(this.records.distance * 10) / 10
        }
    }
}
</script>