<template>
    <div class="container">
        <el-input class="input" placeholder="用户名"  v-model="user" size="medium"></el-input>
        <el-input class="input" placeholder="请输入密码" v-model="pass" show-password size="medium"></el-input>
        <el-button class="input" @click="login">登录</el-button>
    </div>
</template>

<script>
import { ipcRenderer} from 'electron';
import { mapActions,mapMutations,mapGetters } from 'vuex';
  export default {
    name:"login-page",
    data () {
        return {
            pass:"",
            user:""
        }
    },
    mounted(){
        this.connectDb();
    },  
    methods:{
        ...mapActions([
            'userLogin',
            'connectDb'
        ]),
        login(){ 
            if(!this.user||!this.pass){
                this.$message({
                    message:"信息不能为空",
                    type:"error"
                })
                return;
            }
            let userinfo = {
                username:this.user,
                password:this.pass
            }
            this.userLogin({userinfo:userinfo,callBack:(res)=>{
                console.log(res)
                if(res){
                    ipcRenderer.send("login") 
                    this.$router.push({ path: '/' });
                    fs.writeFile('./user/user.txt', '这是',function(err){})
                }else{
                    this.$message({
                        type:"warn",
                        message:"用户不存在"
                    })
                }
            }})   
             
        }
    }
  }
</script>

<style lang="scss" scoped>
    .container{
        height: 50vh;
        padding-top:50vh; 
        background: #000;
        .input{
            display: block;
            width: 200px;
            margin:0 auto 10px;
        }
    }
</style>
