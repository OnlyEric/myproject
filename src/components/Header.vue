<template>
<div class="Header">
    <!--<router-link :to="{name:'root'}">
        <img src="../assets/logo.png">
    </router-link>
    <span><a href="https://www.baidu.com" target="_blank">about</a></span>
    -->
    <nav class="navbar navbar-default" role="navigation">
            <div class="container-fluid">
                    <div class="col-sm-1">
                            <button class='btn btn-default col-sm-2' style="width:40px;height:40px;margin-top:10px;position:relative;">
                                    <a href="javascript:history.go(-1);" style="position: absolute;margin-left:-40%;margin-top:-42%">
                                        &lt;
                                    </a>
                            </button>
                            </div>
            <div class="navbar-header col-sm-2" style="margin-top:3px;">
               <!-- <a class="navbar-brand" href="#">CNode论坛</a>-->
               <router-link :to="{name:'root'}" style="display:inline-block;margin-left:-40%;">
                <span class="text-nowrap gradient-text gradient-text-one">CNode论坛</span>
                </router-link>
            </div>
            
            <div class="col-sm-9">
                <ul class="nav navbar-nav col-sm-12" style="margin-top:5px;">
                    <li style="margin-top:8px;margin-left:-50px;" class="col-sm-10">
                    <form class="form-horizontal" @submit.prevent="searchfor()">
                    <div class="form-group" style="margin-left:-20%;">
                        <label class="control-label col-sm-2 glyphicon glyphicon-search"></label>
                        <div class="col-sm-9">
                        <input type="search" v-model="search" placeholder="search" class="form-control"/>
                        </div>
                        <button type="sumbit" class="btn btn-default col-sm-1">搜索</button>
                    </div>
                    </form>
                    </li>
                    <li class="dropdown  col-sm-2" style="margin-left:50px;">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                            about
                            <b class="caret"></b>
                        </a>
                        <ul class="dropdown-menu">
                            <li class="dropdown-header">搜索引擎</li>
                            <li><a href="https://www.baidu.com/" target='_blank'>Baidu</a></li>
                            <li><a href="https://www.google.com.hk/" target='_blank'>Google</a></li>
                            <li><a href="https://www.sogou.com/" target='_blank'>Sogou</a></li>
                            <li><a href="https://www.yahoo.com/" target='_blank'>Yahoo</a></li>
                            <li class="divider"></li>
                            <li class="dropdown-header">新闻网站</li>
                            <li><a href="https://news.qq.com/" target='_blank'>Tencent</a></li>
                            <li><a href="https://landing.toutiao.com/" target='_blank'>Toutiao</a></li>
                            <li><a href="https://news.163.com/" target='_blank'>NTES</a></li>
                            <li><a href="http://www.sohu.com/" target='_blank'>Sohu</a></li>
                        </ul>
                    </li> 
                </ul>
            </div>
            </div>
        </nav>
</div>
</template>

<script>
export default{
    name:"Header",
    data(){
        return{
            search:'',
            page:1,
            posts:[],
            posts1:[],
        }
    },
    methods:{
        searchfor(){
            /*this.getData();
            this.getInfo();*/
            if(this.search.trim()!=""){
                this.$router.push({name: 'search',params:{search:this.search}});
            }
            else{
                this.$router.push({name: 'root'});
            }
            //this.search='';
        },
        getData(){
            this.$http({
                url:'https://cnodejs.org/api/v1/topics',
                method:'get',
                params:{
                    page:this.page,
                    limit:1000,
                },
            })
            .then((response)=>{
                if(response.data.success===true){
                    this.posts=response.data.data;
                }
            })
            .catch(function(error){
                console.log(error);
            });
        },
        getInfo(){
            var search1=this.search.toLowerCase().trim();
            this.posts1=this.posts.filter(function(item){
                if(item.toLowerCase().trim().indexOf(search1)){
                    return item;
                }
            })
        }
    }
}
</script>

<style scoped>
.Header{
   /* height:50px;
    background:#5a5555;*/
}
img{
    width:50px;
    height:50px;
    float:left;
    margin-left:120px;
    margin-top:-1px;
}
a{
    font-Size:26px;
    text-decoration:none;
    color: #cbc9c9;
}
span{
    float:right;
    margin-right:120px;
    margin-top:9px;
}
.gradient-text{
    text-align: left;
    text-indent:30px;
    line-height: 40px;
    font-size:30px;
    font-weight:bolder; 
    position: relative; 
}
.gradient-text-one{  
    background-image:-webkit-linear-gradient(bottom,#1d953f,#45b97c,#84bf96); 
    -webkit-background-clip:text; 
    -webkit-text-fill-color:transparent; 
}
</style>