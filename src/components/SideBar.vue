<template>
<div class="SideBar">
    <div v-if="loading" class="loading">Loading...</div>
    <div v-else>
    <div class="info">
    <div class="author">作者</div>
    <router-link :to="{name:'user_info',params:{name:userinfo.loginname}}">
        <img :src="userinfo.avatar_url" />
        <span>{{userinfo.loginname}}</span>
    </router-link>
    <div style="margin:10px auto 10px 5px">积分:{{userinfo.score}}</div>
    </div>
    <div class="info">
        <div class="author" style="margin-top:10px">作者最近主题</div>
        <ul v-for="topic in topicsLimitBy5" v-bind:key="topic.toString()">
            <li>
                <router-link :to="{name:'post_content',params:{id:topic.id,name:topic.author.loginname}}">
                {{topic.title}}
                </router-link>
            </li>
        </ul>
    </div>
    <div class="info">
        <div class="author" style="margin-top:10px">作者最近回复</div>
        <ul v-for="reply in repliesLimitBy5" v-bind:key="reply.toString()">
            <li>
                <router-link :to="{name:'post_content',params:{id:reply.id,name:reply.author.loginname}}">
                {{reply.title}}
                </router-link>
            </li>
        </ul>
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
    width:22%;
    font:20px/1.3 "Open Sans",sans serif;
    box-sizing: border-box;
	margin-right: 3%;
	padding: 0.8rem 0.4rem;	
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
    margin-left:5px;
    vertical-align:middle;
}
.SideBar a{
    text-decoration:none;
}
.SideBar a:visited{
    color:green;
}
.SideBar a:hover{
    color:#5c9bb7;
}
.SideBar a span{
    margin-left:10px;
}
.SideBar .info ul{
    list-style:none;
}
.SideBar .info ul li a{
    display:inline-block;
    text-decoration:none;
    font-size:10px;
    margin-top:6px;
    margin-bottom:6px;
    text-overflow: ellipsis;
	overflow: hidden;
	max-width: 95%;
   	display: inline-block;
    white-space:nowrap;
}
.SideBar .info ul li a:hover{
    color:#5c9bb7;
}
.SideBar .info ul li a:visited{
    color:green;
}
</style>