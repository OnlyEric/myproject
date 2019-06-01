<template>
        <div class="Search">
            <div v-if="loading" class="loading"><img src="../assets/timg.gif" /></div>
            <div v-else>
                <ul class="artical">
                    <li v-for="(post,index) in posts1" v-if="(page-1)*10<=index&&index<page*10&&index<posts1.length" v-bind:key="index">
                        <div class="well">
                            <div class="col-sm-1 text-nowrap" style="margin-top:-5px;">
                            <router-link :to="{name:'user_info',params:{name:post.author.loginname}}">
                                <img :src="post.author.avatar_url" style="margin-top:-10px;border-radius:4px;"/>
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
                                    <span class="sp" style="margin-left:0px;">{{post.reply_count}}/{{post.visit_count}}</span>
                                </div>
                            <router-link :to="{name:'post_content',params:{id:post.id,name:post.author.loginname}}" class="text1">{{post.title}}</router-link>
                            <span class="sp1">{{post.last_reply_at|formatDate}}</span>
                        </div>
                    </li>
                </ul>
                <div class="col-sm-2 text-nowrap " style="margin-top:28px;font-size:20px;">
                <span>共搜索到{{posts1.length}}条相关信息</span>
                </div>
                <ul  class="pagination col-sm-8">
                    <li v-on:click="prev10(n)"><a href="#">&laquo;</a></li>
                    <li v-on:click="prev1(n)"><a href="#">&lt;</a></li>
                    <li v-for="t in pagenum" v-if="pagenum-9<=t&&t<=pagenum&&pagenum%10==0" v-bind:key="t" v-on:click="setData(t)"
                    :class="{active:t==nn}">
                        <a href="#">{{t}}</a>
                    </li>
                    <li v-for="t in pagenum" v-if="pagenum-pagenum%10+1<=t&&t<=pagenum&&pagenum%10!=0" v-bind:key="t" v-on:click="setData(t)"
                    :class="{active:t==nn}">
                        <a href="#">{{t}}</a>
                    </li>
                    <li v-on:click="next1(n)"><a href="#">&gt;</a></li>
                    <li v-on:click="next10(n)"><a href="#">&raquo;</a></li>
                </ul>
            </div>
        </div>
        </template>
        
        <script>
        export default{
            name:"Search",
            data(){
                return{
                    posts1:[],
                    loading:true,
                    page:1,
                    n:1,
                    pagenum:10,
                    nn:1,
                    num:0,
                };
            },
            methods:{
                getData(){
                    this.$http({
                        url:'https://cnodejs.org/api/v1/topics',
                        method:'get',
                        params:{
                            //page:this.page,
                            limit:1000,
                        },
                    })
                    .then((response)=>{
                        if(response.data.success===true){
                            this.posts1=response.data.data;
                            //this.getInfo();
                            if(sessionStorage.getItem("page1")===null||sessionStorage.getItem("pagenum1")===null){
                                this.getInfo();
                            }  
                            else{
                                this.getInfo1();
                            }
                        }
                    })
                    .catch(function(error){
                        console.log(error);
                    });
                },
                setData(n){
                    var sum=this.posts1.length/10;
                    var ss;
                    if(sum%1==0){
                        ss=parseInt(sum);
                    }
                    else{
                        ss=parseInt(sum)+1;
                    }
                    if(n>0){
                        this.page=n;
                        //this.getData();
                        this.n=n;
                        this.nn=this.n;
                    }
                },
                prev1(n){
                    if(n-1>0){
                        this.n=n-1;
                        this.page=this.n;
                        this.nn=this.n;
                        
                        if((n-1)%10==0){
                            if(this.pagenum%10!=0){
                                this.pagenum=this.pagenum-this.pagenum%10;
                            }
                            else{
                                this.pagenum-=10;
                            }
                        }
                    }
                },
                next1(n){
                    var sum=this.posts1.length/10;
                    var ss;
                    if(sum%1==0){
                        ss=parseInt(sum);
                    }
                    else{
                        ss=parseInt(sum)+1;
                    }
                    if(n+1<=ss){
                        this.n=n+1;
                        this.page=this.n;
                        this.nn=this.n;
                        if((n+1)%10==1){
                            if(ss-this.n<=9){
                                this.pagenum+=ss-this.n+1;
                            }
                            else{
                                this.pagenum+=10;
                            }
                        }
                    }
                },
                prev10(n){
                    var sum=this.posts1.length/10;
                    var ss;
                    if(sum%1==0){
                        ss=parseInt(sum);
                    }
                    else{
                        ss=parseInt(sum)+1;
                    }
                    if(n%10!=0){
                        if(n-10-n%10+1>0){
                            if(this.pagenum%10!=0){
                                this.n=n-10-n%10+1;
                                this.page=this.n;
                                this.nn=this.n; 
                                this.pagenum=this.pagenum-this.pagenum%10;
                            }
                            else{
                                this.n=n-10-n%10+1;
                                this.page=this.n;
                                this.nn=this.n; 
                                this.pagenum=this.pagenum-this.pagenum%10-10;
                            }
                        }
                    }
                    else{
                        if(n-19>0){
                            this.n=n-19;
                            this.page=this.n;
                            this.nn=this.n;
                            this.pagenum=this.pagenum-10;
                        }
                    }
                    /*if(n>0){
                        this.page=n;
                        this.pagenum=10;
                    }*/
                },
                next10(n){
                    var sum=this.posts1.length/10;
                    var ss;
                    if(sum%1==0){
                        ss=parseInt(sum);
                    }
                    else{
                        ss=parseInt(sum)+1;
                    }
                    if(n%10!=0){
                        if(n+10-n%10+1<=ss){
                            this.n=n+10-n%10+1;
                            this.page=this.n;
                            this.nn=this.n;
                            if(ss-this.n<=9){
                                this.pagenum+=ss-this.n+1;
                            }
                            else{
                                this.pagenum+=10;
                            }
                        }
                    }
                    else{
                         if(n+1<=ss){
                             this.n=n+1;
                             this.page=this.n;
                             this.nn=this.n;
                             if(ss-this.n<=9){
                                this.pagenum+=ss-this.n+1;
                            }
                            else{
                                this.pagenum+=10;
                            }
                         }   
                    }
                },
                getInfo(){
                    var search1=this.$route.params.search.trim().toLowerCase();
                    this.posts1=this.posts1.filter(function(item){
                    if(item.title.toLowerCase().indexOf(search1)!=-1){
                        return item;
                    }
                    })
                    var sum=this.posts1.length/10;
                    if(sum>10){this.pagenum=10;}
                    else{
                        if(sum%1==0){
                            this.pagenum=parseInt(sum);
                        }
                        else{
                            this.pagenum=parseInt(sum)+1;
                        }
                    }
                    this.loading=false;
                },
                getInfo1(){
                    var search1=this.$route.params.search.trim().toLowerCase();
                    this.posts1=this.posts1.filter(function(item){
                    if(item.title.toLowerCase().indexOf(search1)!=-1){
                        return item;
                    }
                    })
                    this.loading=false;
                }
            },
            watch:{
                '$route.params.search':function(value){
                    this.page=1;
                    this.n=1;
                    this.nn=1;
                    this.loading=true;
                    this.getData();
                    if(sessionStorage.getItem("page1")!==null&&sessionStorage.getItem("pagenum1")!==null){
                        sessionStorage.removeItem("page1");
                        sessionStorage.removeItem("pagenum1")
                    }
                }               
            },
            beforeMount(){
                /*sessionStorage.removeItem("page1");
                sessionStorage.removeItem("pagenum1");*/
                if(sessionStorage.getItem("page1")!==null&&sessionStorage.getItem("pagenum1")!==null){
                    var storage=parseInt(sessionStorage.getItem("page1"));
                    this.page=storage;
                    this.n=storage;
                    this.nn=storage;
                    this.pagenum=parseInt(sessionStorage.getItem("pagenum1"));
                    //document.write(this.pagenum);
                    this.getData();
                }else{
                    this.getData();
                }
            },
            beforeRouteLeave(to,from,next){
                sessionStorage.setItem("page1",this.page);
                sessionStorage.setItem("pagenum1",this.pagenum);
                next();
            }
            /*beforeMount(){
                this.getData();
            }*/
        }
        </script>
        
        <style scoped>
        .Search{
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