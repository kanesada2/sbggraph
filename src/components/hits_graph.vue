<template>
  <div>
      <el-tabs v-model="activeName" @tab-click="selectType" tabPosition="bottom" stretch>
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
            data: [{ 
                    x:1,y:1,z:1,
                    mode: 'markers',
                    distance: 120,
                    marker: {
                        size: 2,
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
                        eye:{x: 0, y: 0, z: 1}
                    },
                }
            },
            options: {},
            activeName: "absoluteHits",
            targetUrl: "",
            pointSelected: false,
            ballTypes:[
                "Fast", "Slider", "Curve", "Fork", "Shuuto", "Sinker", "Knuckle"
            ],
            filter:{
                batterId: null,
                pitcherId: null,
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
        selectType(tab, e) {
            console.log(tab,e)
            this.setupData()
        },
        extract(){
            if(this.filter.ballType){
                this.resourcePath = 'typedhits/' + this.filter.ballType;
            }
            let filterClause = {};
            if(this.filter.batterId){
                filterClause.player_id = this.filter.batterId;
            }
            if(this.filter.pitcherId){
                //filterClause.pitcher_id = this.filter.pitcherId
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
            this.targetUrl = "/hits/" + this.ids[index];
            this.pointSelected = true;
        },
        processData(){
            
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