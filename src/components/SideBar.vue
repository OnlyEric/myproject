<template>
<div class="SideBar">
    <div v-if="loading" class="loading"></div>
    <div v-else>
    <div class="info">
    <div class="panel-group" id="accordion">
    <div class="panel panel-primary">
    <div class="panel-heading">
            <h4 class="panel-title">
                    <a data-toggle="collapse" data-parent="#accordion" 
                       href="#collapseOne">
                       作者
                    </a>
            </h4>
    </div>
    <div id="collapseOne" class="panel-collapse collapse in">
    <div class="panel-body">
    <router-link :to="{name:'user_info',params:{name:userinfo.loginname}}" class="col-sm-12">
        <div style="margin-left:10px;">
        <img :src="userinfo.avatar_url" class="thumbnail"/>
        </div>
        <div  style="margin-top:-10px;margin-left:-25px;">
        <span>{{userinfo.loginname}}</span>
        </div>
    </router-link>
    <div style="margin:10px auto 10px 0px" >积分:{{userinfo.score}}</div>
    </div>
    </div>
    </div>
    </div>
    </div>
    <div class="info">
    <div class="panel-group" id="accordion1">
    <div class="panel panel-primary">
            <div class="panel-heading">
                    <h4 class="panel-title">
                        <a data-toggle="collapse" data-parent="#accordion1" 
                           href="#collapseOne1">
                           作者最近主题
                        </a>
                    </h4>
                </div>
        <div id="collapseOne1" class="panel-collapse collapse in">
        <ul class="list-group panel-body">
            <!--<li class="list-group-item active">作者最近主题</li>-->
            <li class="list-group-item" v-for="(topic,index) in userinfo.recent_topics" v-bind:key="index">
                <router-link :to="{name:'post_content',params:{id:topic.id,name:topic.author.loginname}}">
                {{topic.title}}
                </router-link>
            </li>
        </ul>
        
        </div>
    </div>
    </div>
    </div>
    <div class="info">
    <div class="panel-group" id="accordion2">
    <div class="panel panel-primary">
            <div class="panel-heading">
                    <h4 class="panel-title">
                        <a data-toggle="collapse" data-parent="#accordion2" 
                           href="#collapseOne2">
                           作者最近回复
                        </a>
                    </h4>
                </div>
        <div id="collapseOne2" class="panel-collapse collapse in">
        <ul class="list-group">
            <!--<li class="list-group-item active">作者最近回复</li>-->
            <li  class="list-group-item" v-for="(reply,index) in userinfo.recent_replies" v-bind:key="index">
                <router-link :to="{name:'post_content',params:{id:reply.id,name:reply.author.loginname}}">
                {{reply.title}}
                </router-link>
            </li>
        </ul>
        </div>
    </div>
    </div>
    </div>
    </div>
</div>
</template>

<script>
export default({
    name:"SideBar",
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
                console.log(error);
            })
        },
    },
    beforeMount(){
        this.getData();
    },
    computed:{
        topicsLimitBy5(){
            return this.userinfo.recent_topics.slice(0,5);
        },
        repliesLimitBy5(){
            return this.userinfo.recent_replies.slice(0,5);
        }
    },
    watch:{
		$route(){
			this.getData();
		}
	}
})
</script>

<style scoped>
.SideBar{
    float:right;
    width:350px;
    font:20px/1.3 "Open Sans",sans serif;
	margin-right: -200%;
	
}
.loading{
    font-size:10px;
    color:red;
}
.SideBar .info .author{
    width:100%;
    background:rgba(212, 205, 205, 0.17);
}
.SideBar .info{
    background:white;
}
.SideBar a img{
    width:80px;
    height:80px;
    margin-top:5px;
    margin-left:-25px;
    vertical-align:middle;
}

.SideBar a{
    text-decoration:none;
}
.SideBar a:visited{
    color:green;
}
.SideBar a:hover{
    color:#bbb;
}
.SideBar a span{
    margin-left:10px;
}
.SideBar .info ul{
    list-style:none;
}
.SideBar .info ul li a{
    text-decoration:none;
    font-size:10px;
    text-overflow: ellipsis;
	overflow: hidden;
	max-width: 95%;
   	display: inline-block;
    white-space:nowrap;
}
.SideBar .info ul li a:hover{
    color:#bbb;
}
.SideBar .info ul li a:visited{
    color:green;
}
</style>