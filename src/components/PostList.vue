<template>
<div class="PostList">
    <div v-if="loading" class="loading">Loading...</div>
    <div v-else>
        <ul>
            <li v-for="post in posts" v-bind:key="post.toString()">
                <router-link :to="{name:'user_info',params:{name:post.author.loginname}}">
                    <img :src="post.author.avatar_url"/>
                </router-link>
                <span class="sp">{{post.reply_count}}/{{post.visit_count}}</span>
                <router-link :to="{name:'post_content',params:{id:post.id,name:post.author.loginname}}" class="text1">{{post.title}}</router-link>
                <span class="sp1">{{post.last_reply_at|formatDate}}</span>
            </li>
        </ul>
        <div class="allpage">
        <ul v-for="n in 10" v-bind:key="n.toString()" class="page">
            <li v-on:click="setData(n)">
                <button type="button">{{n}}</button>
            </li>
        </ul>
        </div>
    </div>
</div>
</template>

<script>
export default{
    name:"Postlist",
    data(){
        return{
            posts:[],
            loading:true,
            page:1,
        };
    },
    methods:{
        getData(){
            this.$http({
                url:'https://cnodejs.org/api/v1/topics',
                method:'get',
                params:{
                    page:this.page,
                    limit:20,
                },
            })
            .then((response)=>{
                if(response.data.success===true){
                    this.posts=response.data.data;
                    this.loading=false;
                }
            })
            .catch(function(error){
                console.log(error);
            });
        },
        setData(n){
            this.page=n;
            this.getData();
        }
    },
    beforeMount(){
        this.getData();
    }
}
</script>

<style scoped>
.PostList{
    margin-left:20px;
    margin-right:20px;
    margin-top:10px;
}
.loading{
    font:60px/1.3 "Open Sans",sans serif;
    color:green;
    text-align:center;
}
ul{
    list-style:none;
}
ul li{
    background:white;
    border-bottom:2px Solid #E7E7E7;
}
ul li a.text1{
    text-decoration:none;
    overflow: hidden;
    display:inline-block;
    text-overflow:ellipsis;
    color:black;
    white-space: nowrap;
    max-width: 80%;
    margin-bottom:-5px;
    font-size:20px;
    margin-left:20px;
}
ul li a:visited{
    color:#858585;
}
ul li a:hover{
    color:#5c9bb7;
}
ul li img{
    vertical-align:middle;
    width:40px;
    height:40px;
}
.sp{
    display: inline-block;
	text-align: center;
	width:80px;
}
.sp1{
    float:right;
    margin-right:6px;
}
.PostList .allpage{
    text-align:center;
}
.PostList .allpage ul.page{
    display:inline-block;
}
.PostList .allpage ul.page li button:hover{
    background:#5c9bb7;
}
</style>