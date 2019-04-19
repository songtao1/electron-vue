<template>
    <div class="container">
        <!-- <el-button @click.native.prevent="handleLogout">logout</el-button> -->
        <header-top/>
        <div class="menu-con">
            <p class="logo-con"></p>
            <el-menu
                default-active="home"
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose"
                background-color="#fff"
                text-color="#000"
                router
                active-text-color="#ffd04b">
                <el-submenu index="1">
                    <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>导航一</span>
                    </template>
                        <el-menu-item index="home">首页</el-menu-item>
                        <el-menu-item index="visitor">选项3</el-menu-item>
                </el-submenu>
                <!-- <el-menu-item index="home">
                    <i class="el-icon-menu"></i>
                    <span slot="title">导航二</span>
                </el-menu-item>
                <el-menu-item index="home">
                    <i class="el-icon-setting"></i>
                    <span slot="title">导航四</span>
                </el-menu-item> -->
            </el-menu>
        </div>
        <div class="childrenView">
            <keep-alive>
			    <router-view></router-view>
		    </keep-alive>
        </div>
        
    </div>
</template>

<script>
import { ipcRenderer,screen} from 'electron';
import { mapActions,mapMutations,mapGetters } from 'vuex';
import { constants } from 'fs';
import headerTop from '@/components/HeaderTop';
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
    components:{
        headerTop,
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
        },
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        }
    }
  }
</script>

<style lang="scss" scoped>
    .container{
        width:100%;
        height: 100%;
        .menu-con{
            .logo-con{
                width: 200px;
                height: 100px;
                background: url("http://www.dongdao.net/d/file/logo/2017-06-26/f2b35d69ef03fcddffa57ad53f473bb7.jpg") no-repeat center;
                background-size: 120px 100px;
            }
            height: 100%;
            width: 200px;
            border-right: 1px solid #eee;
            position: fixed;
            left: 0;
            top: 0;
            .el-menu{
                border-right: none;
            }
        } 
        .el-menu-vertical-demo{
            width:200px;
            font-size: 12px;
        }
        .childrenView{
            height: 100%;
            padding:61px 0 0 211px;
        }
    }
</style>
