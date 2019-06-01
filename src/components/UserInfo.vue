<template>
<div class="UserInfo">
    <div class="loading" v-if="loading"><img src="../assets/timg.gif" style="width:600px;height:600px;"/></div>
    <div v-else>
        <div class="author">
        <div class="thumbnail" style="padding-top:23px;">
        <div class="media">
        <div class="media-left media-middle">
        <img :src="userinfo.avatar_url" class="thumbnail"/>  
        </div>
        <div class="media-body">  
        <span class="media-heading">{{userinfo.loginname}}</span>
        <div>{{userinfo.score}} 积分</div>
        <div>注册时间：{{userinfo.create_at|formatDate}}</div>
        </div> 
        </div>
        </div>
        </div>
        <div class="replies">
            <ul class="list-group" >
                <li class="list-group-item active">回复的主题</li>
                <li class="list-group-item" v-for="topic in userinfo.recent_replies" v-bind:key="topic.toString()">
                    <router-link :to="{name:'post_content',params:{id:topic.id,name:topic.author.loginname}}">
                        {{topic.title}}
                    </router-link>
                </li>
            </ul>
        </div>
        <div class="topics"> 
            <ul class="list-group">
                <li class="list-group-item active">创建的主题</li>
                <li class="list-group-item" v-for="topic in userinfo.recent_topics" v-bind:key="topic.toString()">
                    <router-link :to="{name:'post_content',params:{id:topic.id,name:topic.author.loginname}}">
                        {{topic.title}}
                    </router-link>
                </li>
            </ul>
        </div>  
        <About style="width:81.5%;margin:0 auto"></About>
    </div>
</div>
</template>

<script>
import  About from './About'
export default{
    name:'UserInfo',
    components:{
        About,
    },
    data(){
        return{
            loading:true,
            userinfo:{},
        };
    },
    methods:{
        getData(){
            this.$http({
                url:`https://cnodejs.org/api/v1/user/${this.$route.params.name}`,
                method:'get',
            })
            .then((response)=>{
                if(response.data.success===true){
                    this.userinfo=response.data.data;
                    this.loading=false;
                }
            })
            .catch(function(error){
                console.log(errpr);
            })
        }
    },
    beforeMount(){
        this.getData();
    }
}
</script>

<style scoped>
.loading{
    font:60px/1.3 "Open Sans",sans serif;
    color:green;
    text-align:center;
}
.UserInfo{
    background-color:white;
    padding-top:20px;
    background-size:cover;
}
 .author{  
    display:block;
    width:80%;
    height:130px;
    text-align:left;
    background:white;
    display:relative;
    margin:0 auto;
    
}
img{
    width:80px;
    height:80px;
    margin-top:5px;
    margin-left:5px;
}
.UserInfo .author span,.UserInfo .author div{
    font:20px/1.9 "Open Sans",sans serif;
    color:black;
}
.UserInfo .author div{
    margin-top:-10px;
    margin-left:5px;
}
.UserInfo .replies,.UserInfo .topics{
    background:white;
    font:12px/1.2 "Open Sans",sans serif;
    width:80%;
    position:relative;
    margin:0 auto;
    margin-top:10px;
}
.UserInfo .replies span,.UserInfo .topics span{
    background:rgba(212, 205, 205, 0.17);
    display:block;
    padding:5px;
    margin-top:5px;
}
.UserInfo .replies ul,.UserInfo .topics ul{
}
.UserInfo .replies ul li,.UserInfo .topics ul li{
}
.UserInfo .replies ul li a,.UserInfo .topics ul li a{
    display:block;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    max-width:70%;
    text-decoration:none;
    color:#094E99;
}
.UserInfo .replies ol li a:hover,.UserInfo .topics ol li a:hover{
    color:#5c9bb7;
}
.UserInfo .replies ol li a:visited,.UserInfo .topics ol li a:visited{
    color:green;
}
</style>