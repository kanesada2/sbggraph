import authConfig from '@/authconfig'
export default {
  data () {
    return {
      apiUrlBase: 'https://nllixik83jef2fa-spigot.adb.ap-tokyo-1.oraclecloudapps.com/ords/spigot/sbg/',
      resourcePath: '',
      records: null,
      query: {},
      beforeQuery: {},
      players: [],
      header: authConfig.token,
      loading: true
    }
  },
  mounted(){
    this.preparePlayerData()
    this.setupData();
  },
  methods: {
    setupData(){
      this.loading = true
      console.log(this.query)
      console.log(this.beforeQuery)
      if(!this.records || this.query != this.beforeQuery){
        this.fetchRecords()
      }
      this.recordsToData()
      this.beforeQuery = JSON.parse(JSON.stringify(this.query))
      this.loading = false
    },
    fetchRecords(){
      let url = this.apiUrlBase + this.resourcePath
      const instance = this
      console.log(url)
      this.$axios.get(url, {'params': this.query})
          .then((response) => {
            instance.records = response.data;
            console.log(instance.records)
          })
          .catch((e) => {
            console.log(e);
          })
    },
    recordsToData(){
    },
    preparePlayerData(){
      const url = this.apiUrlBase + "players/"
      const instance = this
      this.$axios.get(url)
          .then((response) => {
            instance.players = response.data.items
          })
          .catch((e) => {
            console.log(e);
          })
    }
   }
  }