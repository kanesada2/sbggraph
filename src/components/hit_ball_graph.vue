<template>
  <div>
      <Plotly :data="data" :layout="layout" @click="showDialog"/>
      <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>ボール情報</span>
            投球の情報と打球の情報を一括表示
        </div>
      </el-card>
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
            data: [
                {x:[2,2.2], y: [1.1,1.15], z: [18,17.83],
                    mode: 'lines',
                    marker: {
                        size: 1,
                        color: 'rgba(0, 255, 0, 1.0)',
                        opacity: 0.4
                    },
                    type: 'scatter3d'

                },
                {x:[1], y: [0.8], z: [1.1],
                    mode: 'lines',
                    marker: {
                        size: 2,
                        color: 'rgba(255, 0, 0, 1.0)',
                        opacity: 0.4
                    },
                    type: 'scatter3d'
                }
            ],
            layout:{
                paper_bgcolor : "#dcdde1",
                scene: {
                    camera: {
                        up:{x: 0, y: 1, z: 0},
                        eye:{x: 0, y: 0, z: -1}
                    },
                    zaxis: {range: [0, 18]}
                },
            },
            options: {},
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
        extract(e){
             console.log(e);
        },
        showDialog(e){
            const index = e.points[0].pointNumber;
            this.targetUrl = "/balls/" + this.ids[index];
            this.pointSelected = true;
        }
    }
}
</script>