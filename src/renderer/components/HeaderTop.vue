<template>
    <div>
        <div class="wrapper">
            <el-dropdown trigger="click" class="userAction" @command="handleCommand">
                <span class="el-dropdown-link">admin</span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="logout">退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
import { ipcRenderer,screen} from 'electron'; 
export default {
    name: 'header-top',
    methods: {
        handleCommand(command){
            console.log(command)
            if(command=="logout"){
                console.log(11) 
                ipcRenderer.send("logout") 
                // this.connectDb()
                // console.log(this.connectDb)
                this.$router.push({ path: '/login' })
            }
        }
    }
  }
</script>

<style lang="scss" scoped>
    .wrapper{
        background: #fff;
        position: fixed;
        left: 201px;
        top:0;
        width:100%;
        height: 50px;
        border-bottom: 1px solid #eee;
        .userAction{
            cursor: pointer;
            float: right;
            line-height: 50px;
            margin-right: 230px;
        } 
    }
</style>
