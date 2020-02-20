import authConfig from '@/authconfig'
export default {
  data () {
    return {
      apiUrlBase: 'https://nllixik83jef2fa-spigot.adb.ap-tokyo-1.oraclecloudapps.com/ords/spigot/sbg/',
      resourcePath: '',
      records: null,
      query: {},
      header: authConfig.token,
      loading: true
    }
  },
  mounted(){
    this.setupData();
  },
  methods: {
    setupData(){
      this.loading = true
      if(!this.records){
        this.fetchRecords()
      }
      this.recordsToData()
      this.loading = false
    },
    fetchRecords(){
      const url = this.apiUrlBase + this.resourcePath
      this.$axios.get(url)
          .then((response) => {
            this.records = response.data;
            console.log(response.data.items)
          })
          .catch((e) => {
            console.log(e);
          })
    },
    recordsToData(){
    }
   }
  }