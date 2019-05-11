<template>
<div class="Article">
    <div class="loading" v-if="loading">Loading...</div>
    <div v-else>
        <div class="content">
        <h2>{{article.title}}</h2>
        <span class="first">分类:{{articleTap}}</span>
        <span>{{article.visit_count}}次访问</span>
        <span>发布于:{{article.create_at|formatDate}}</span>
        <p v-html="article.content" class="vhtml1"></p>
        </div>
        <div class="reply"> 
            <ul v-for="reply in article.replies" v-bind:key="reply.toString()">
                <li class="line">                    
                    <router-link :to="{name:'user_info',params:{name:reply.author.loginname}}">
                        <img :src="reply.author.avatar_url" />
                        <span>{{reply.author.loginname}}</span>   
                    </router-link>
                    <span>{{index+1}}楼</span>
                    <span class="float1" >❤{{reply.ups.length}}</span>
                    <div class="comment">
                    <span class="vhtml" v-html="reply.content"></span>
                    <span class="float2">{{reply.create_at|formatDate}}</span>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</div>
</template>

<script>
export default({
    name:'Article',
    data(){
        return{
            loading:true,
            article:{
                author:{
                    loginname:'temp',
                }
            },
            index:0,
        };
    },
    methods:{
        getData(){
            this.$http({
                url:`https://cnodejs.org/api/v1/topic/${this.$route.params.id}`,
                method:'get',
                params:{
                    mdrender:true,
                }
            })
            .then((response)=>{
                if(response.data.success===true){
                    this.article=response.data.data;
                    this.loading=false;
                }
            })
            .catch(function(error){
                console.log(error);
            });
        },
    },
    computed:{
        articleTap(){
            var type=this.article.tab;
            if(type = 'ask'){
		  		return '问答';
		  	};
		  	if(type = 'share'){
		  		return '分享';
		  	};
		  	if(type = 'job'){
		  		return '招聘';
		  	};
		  	if(type = 'good'){
		  		return '精华';
            };
        }
    },
    beforeMount(){
        this.getData();
    },
    watch:{
        $route(){
            this.getData();
        }
    }
})
</script>

<style>
.Article{
		display: inline-block;
		width: 75%;
}
.Article .content{
    background:white;
    width:90%;
    font:20px/1.3 "Open Sans",sans serif;
    /*padding-left:20px;
    padding-right:20px;*/
    margin-left:20px;
    display:inline-block;
}
.Article .content h2{
    margin-bottom:0px;
    margin-left:20px;
}
.Article .content .vhtml1{
    margin-top:30px;
    margin-left:20px;
    margin-right:20px;
}
.Article .content .vhtml1 img{
    width:20%;
    height:20%;
    vertical-align:text-top;
}
.Article .content .vhtml1 ul{
    list-style:none;
}
.loading{
    font:60px/1.3 "Open Sans",sans serif;
    color:green;
    text-align:center;
}
.Article .content span{
    margin-left:10px;
    font-size:16px;
}
.Article .content .first{
    margin-left:20px;
}
.Article .content a{
    text-decoration:none;
}
.Article .content a:visited{
    color:green;
}
.Article .content a:hover{
    color:#5c9bb7;
}
.Article .reply{
    background:white;
    width:90%;
    margin-left:20px;
    font:19px/1.3 "Open Sans",sans serif;
    margin-top:10px;
}
.Article .reply ul{
    list-style:none;
    /*margin-right:20px;*/
}
.Article .reply ul li.line{
    text-decoration:none;
    margin-top:10px;
    border-bottom:1px Solid #5c9bb7;
    padding-bottom:10px;
    padding-left:20px;
    padding-top:10px;

}
.Article .reply ul li a img{
    width:40px;
    height:40px;
    display:inline-block;
    vertical-align:text-top;
}
.Article .reply ul li a{
    text-decoration:none;
}
.Article .reply ul li a span{
    color:black;
}
.Article .reply ul li a span:visited{
    color:green;
}
.Article .reply ul li a span:hover{
    color:#5c9bb7;
}
.Article .reply .float1{
    float:right;
    margin-right:10px;
    color:red;
}
.Article .reply .float2{
    float:right;
    margin-right:10px;
}
.Article .reply .comment .vhtml{
    display:inline-block;
    max-width:80%;
}
.Article .reply .comment .vhtml img{
    width:100%;
    height:100%;
}
.Article .reply .comment .vhtml ul li{
    border:none;
}
</style>