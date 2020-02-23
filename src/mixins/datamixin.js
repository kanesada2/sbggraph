export default {
  data () {
    return {
      apiUrlBase: 'https://nllixik83jef2fa-spigot.adb.ap-tokyo-1.oraclecloudapps.com/ords/spigot/sbg/',
      resourcePath: '',
      records: null,
      query: {},
      beforeQuery: {},
      players: [],
      loading: true
    }
  },
  mounted(){
    this.preparePlayerData()
    this.setupData();
  },
  methods: {
    async setupData(){
      this.loading = true
      if(!this.records || this.query != this.beforeQuery){
        await this.fetchRecords()
      }
      this.recordsToData()
      this.beforeQuery = JSON.parse(JSON.stringify(this.query))
      this.query = {}
      this.loading = false
    },
    async fetchRecords(){
      let url = this.apiUrlBase + this.resourcePath
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