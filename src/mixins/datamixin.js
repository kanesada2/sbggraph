export default {
  data () {
    return {
      apiUrlBase: 'https://nllixik83jef2fa-spigot.adb.ap-tokyo-1.oraclecloudapps.com/ords/spigot/sbg/',
      resourcePath: '',
      records: null,
      query: {},
      beforeQuery: {},
      beforeUrl: "",
      players: [],
      loading: true
    }
  },
  mounted(){
    this.preparePlayerData()
    this.prepareFilter()
    this.setupData()
  },
  beforeRouteUpdate(to, from, next){
    next()
    this.preparePlayerData()
    this.prepareFilter()
    this.setupData()
  },
  methods: {
    async setupData(){
      this.loading = true
      const url = this.apiUrlBase + this.resourcePath
      if(!this.records || this.query != this.beforeQuery || url != this.beforeUrl){
        await this.fetchRecords()
      }
      this.recordsToData()
      this.beforeQuery = JSON.parse(JSON.stringify(this.query))
      this.beforeUrl = this.apiUrlBase + this.resourcePath
      this.query = {}
      this.loading = false
    },
    async fetchRecords(){
      const url = this.apiUrlBase + this.resourcePath
      const instance = this
      await this.$axios.get(url, {'params': this.query})
          .then((response) => {
            instance.records = response.data;
          })
          .catch((e) => {
            console.log(e)
          })
    },
    recordsToData(){
    },
    prepareFilter(){

    },
    preparePlayerData(){
      if(this.players.length > 0) return;
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