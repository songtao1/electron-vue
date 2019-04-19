import {dbActions} from '../../utils/dbAction';
// const path = require('path');
const fs = require('fs');

const state = {
    db:null
};

const getters = {
    db:state=>state.db,
};

const mutations = {
    DB_STORE(state,db){
        state.db = db;
    },
  
};

const actions = {
    connectDb({commit,state},obj){
        const db = new dbActions({
            databaseFile: "./db/app.db",
        });
        db.connectDataBase().then(async (result)=>{
            const user = `create table if not exists user(
                username varchar(20) not null,
                password varchar(20) not null
                )`;
            await db.createTable(user);
            db.sql(`select * from user`,[],'all').then(res=>{
                if(res.length===0){
                    db.exec(`insert into user(username,password) values("admin","123")`)
                }
            })
            commit("DB_STORE",db)
        }).then(()=>{
            
        })
    },
    userLogin({commit,state},obj){
        console.log(obj.userinfo)
        let username = obj.userinfo.username;
        let password = obj.userinfo.password;
        state.db.sql(`select * from user where username=? and password = ?`,[username,password],'all').then(res=>{
            if(res.length===0){
                obj.callBack(false);
            }else{
                obj.callBack(true);
            }
        })
    }  
};

export default {
    state,
    getters,
    mutations,
    actions,
}



