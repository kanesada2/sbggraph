<template>
  <div>
      <Plotly :data="data" :layout="layout" @click="showDialog"/>
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
                <el-option v-for="ballType in ballTypes" :key=ballType :label=ballType :value=ballType />
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
                    x:[2,2.2], y: [1.1,1.15], z: [18,17.83],
                    mode: 'lines',
                    marker: {
                        size: 1,
                        color: 'rgba(255, 0, 0, 1.0)',
                        opacity: 0.4
                    },
                    type: 'scatter3d'

            }],
            layout:{
                paper_bgcolor : "#dcdde1",
                scene: {
                    camera: {
                        up:{x: 0, y: 1, z: 0},
                        eye:{x: 0, y: 0, z: 1},
                    },
                    aspectratio: {
                        x: 1, y: 1, z: 18,
                    },
                    zaxis: {range: [0, 18]}
                },
            },
            options: {},
            ids: [1,5],
            targetUrl: "",
            pointSelected: false,
            ballTypes:[
                "Fast", "Slider", "Curve", "Fork", "Shuuto", "Sinker", "Knuckle"
            ],
            filter:{
                pitcherId: 0,
                ballType: "",
            }
        }
    },
    mounted(){
         this.$axios.get('https://httpbin.org/get')
                .then((response) => {
                    console.log(response.data.origin);
                })
                .catch((e) => {
                    console.log(e);
                });
    },
    methods: {
        extract(){
        },
        showDialog(e){
            const index = e.points[0].pointNumber;
            this.targetUrl = "/balls/" + this.ids[index];
            this.pointSelected = true;
        }
    }
}
</script>