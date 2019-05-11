<template>
<div class="UserInfo">
    <div class="loading" v-if="loading">Loading...</div>
    <div v-else>
        <div class="author">
        <img :src="userinfo.avatar_url" />     
        <span>{{userinfo.loginname}}</span>
        <div>{{userinfo.score}} 积分</div>
        <div>注册时间：{{userinfo.create_at|formatDate}}</div>
        </div>
        <div class="replies">
            <span>回复的主题</span>
            <ol v-for="topic in userinfo.recent_replies" v-bind:key="topic.toString()">
                <li>
                    <router-link :to="{name:'post_content',params:{id:topic.id,name:topic.author.loginname}}">
                        {{topic.title}}
                    </router-link>
                </li>
            </ol>
        </div>
        <div class="topics"> 
            <span>创建的主题</span>
            <ol v-for="topic in userinfo.recent_topics" v-bind:key="topic.toString()">
                <li>
                    <router-link :to="{name:'post_content',params:{id:topic.id,name:topic.author.loginname}}">
                        {{topic.title}}
                    </router-link>
                </li>
            </ol>
        </div>  
    </div>
</div>
</template>

<script>
export default{
    name:'UserInfo',
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

.UserInfo .author{  
    display:block;
    width:80%;
    height:150px;
    text-align:left;
    background:white;
    display:relative;
    margin:0 auto;
    margin-top:10px;
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
.UserInfo .replies ol,.UserInfo .topics ol{
    margin-left:-40px;
    list-style:none;
}
.UserInfo .replies ol li,.UserInfo .topics ol li{
    margin-top:-8px;
    margin-top:-5px;
    display:inline-block;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    vertical-align: middle;	
    margin-bottom:10px;
}
.UserInfo .replies ol li a,.UserInfo .topics ol li a{
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