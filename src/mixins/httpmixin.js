import authConfig from '@/authconfig'
export default {
    data () {
      return {
        apiUrlBase: 'https://nllixik83jef2fa-spigot.adb.ap-tokyo-1.oraclecloudapps.com/ords/spigot/sbg/',
        resourcePath: '',
        query: {},
        header: authConfig.token
      }
    },
    mounted(){
        this.fetchData();
   },
   methods: {
        fetchData(){
            const url = this.apiUrlBase + this.resourcePath
            this.$axios.get(url)
               .then((response) => {
                   console.log(response.data);
               })
               .catch((e) => {
                   console.log(e);
               });
        }
   }
  }