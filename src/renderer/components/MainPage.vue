<template>
    <div>
        <el-button @click.native.prevent="handleLogout">logout</el-button>
    </div>
</template>

<script>
import { ipcRenderer,screen} from 'electron';
import { mapActions,mapMutations,mapGetters } from 'vuex';
import { constants } from 'fs';
  export default {
    name:"main-page",
    data () {
        return {
            pass:"",
            user:""
        } 
    },
    mounted(){
        setTimeout(() => {
                this.connectDb()
        }, 5000);
        
    },
    computed: {
    ...mapGetters([
      'db'
    ])},
    methods:{
        ...mapActions([
            'connectDb'
        ]),
        handleLogout(){ 
            ipcRenderer.send("logout") 
            // this.connectDb()
            // console.log(this.connectDb)
             this.$router.push({ path: '/login' })
        }
    }
  }
</script>

<style scoped>
  
</style>
