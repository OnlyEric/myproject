<template>
<div class="PostList">
    <div v-if="loading" class="loading"><img src="../assets/timg.gif" /></div>
    <div v-else>
        <ul class="artical">
            <li v-for="(post,index) in data1" v-bind:key="index">
                <div class="well">
                    <div class="col-sm-1 text-nowrap" style="margin-top:-5px;">
                    <router-link :to="{name:'user_info',params:{name:post.author.loginname}}">
                        <img :src="post.author.avatar_url" style="margin-top:-10px;border-radius:4px;" />
                        <span style="margin-top:10px;margin-left:12px;">{{post.author.loginname}}</span>
                    </router-link>
                    </div>
                    <div class="col-sm-1" style="margin-top:-2px;margin-left:40px;">
                    <div v-if="post.tab=='share'">
                        分享
                    </div>
                    <div v-else-if="post.tab=='ask'">
                        问答
                    </div>
                    <div v-else-if="post.tab=='job'">
                        招聘
                    </div>
                    <div v-else-if="post.tab=='good'">
                        精华
                    </div>
                    <span class="sp" style="margin-left:5px;">{{post.reply_count}}/{{post.visit_count}}</span>
                    </div>
                    
                    <router-link :to="{name:'post_content',params:{id:post.id,name:post.author.loginname}}" class="text1">{{post.title}}</router-link>
                    <span class="sp1">{{post.last_reply_at|formatDate}}</span>
                </div>
            </li>
        </ul>
        <ul  class="pagination">
            <li v-on:click="setData(n-10-n%10+1)"><a href="#">&laquo;</a></li>
            <li v-on:click="setData(n-1)"><a href="#">&lt;</a></li>
            <li v-for="n in pagenum" v-if="pagenum-9<=n&&n<=pagenum" v-bind:key="n" v-on:click="setData(n)"
            :class="{active:n==nn}">
                <a href="#">{{n}}</a>
            </li>
            <li v-on:click="setData(n+1)"><a href="#">&gt;</a></li>
            <li v-on:click="setData(n+10-n%10+1)"><a href="#">&raquo;</a></li>
            
        </ul>
    </div>
</div>
</template>

<script>
import {mapState,mapActions} from 'vuex'
export default{
    name:"Postlist",
    data(){
        return{
            posts:[],
            loading:true,
            page:1,
            n:1,
            pagenum:10,
            nn:1,
        };
    },
    computed:{
        ...mapState({
            data1:state=>state.postlist.data,
        })
    },
    methods:{
        getData(){
            this.$store.dispatch({
                type:'getInfo',
                page:this.page,
                limit:10,
            }).then(res=>{
                this.loading=false;
            })
            /*this.$http({
                url:'https://cnodejs.org/api/v1/topics',
                method:'get',
                params:{
                    page:this.page,
                    limit:10,
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
            });*/

        },
        setData(n){
            if(n>this.pagenum){
                this.pagenum+=10;
            }
            else if(n<this.pagenum-9&&n>0){
                this.pagenum-=10;
            }
            if(n>0){
                this.page=n;
                this.getData();
                this.n=n;
                this.nn=n;
            }
            this.getData();
        }
    },
    created(){
        if(sessionStorage.getItem("page")!=null&&sessionStorage.getItem("pagenum")!=null){
            var storage=parseInt(sessionStorage.getItem("page"));
            this.page=storage;
            this.n=storage;
            this.nn=storage;
            this.pagenum=parseInt(sessionStorage.getItem("pagenum"));
            this.getData();
        }else{
            this.getData();
        }
    },
    /*beforeRouteEnter(to,from,next){
        next(vm=>{
            sessionStorage.removeItem("page");
            sessionStorage.removeItem("pagenum");
        });
    },*/
    beforeRouteLeave(to,from,next){
        sessionStorage.setItem("page",this.page);
        sessionStorage.setItem("pagenum",this.pagenum);
        next();
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
ul.artical{
    list-style:none;
}
ul.artical li{
    background:white;
    border-bottom:2px Solid #E7E7E7;
}
ul.artical li a.text1{
    text-decoration:none;
    overflow: hidden;
    display:inline-block;
    text-overflow:ellipsis;
    color:black;
    white-space: nowrap;
    max-width: 70%;
    margin-bottom:-4px;
    font-size:20px;
    margin-left:20px;
}
ul.artical li a:visited{
    color:#858585;
}
ul.artical li a:hover{
    color:#5c9bb7;
}
ul.artical li a{
    text-decoration:none;
}
ul.artical li a span{
    display:inline-block;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
    max-width:80%;
    margin-top:9px;
}
ul.artical li img{
    
    width:50px;
    height:50px;
    
}
.sp{
    display: block;
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
.pagination{
    display:flex;
    justify-content:center;
}
.pagination li{
    margin-left:5px;
    font-size:20px;
    margin-bottom:10px;
}
.pagination li a{
    text-decoration:none;
}
</style>