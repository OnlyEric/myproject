<template>
<div class="About">
    <div class="container" style="width:100%;">
        <div class="jumbotron col-sm-12" >
            <div class="col-sm-offset-3 col-sm-3">
                <div>
                <span class="gradient-text gradient-text-one text-nowrap">数据来源</span>
                </div>
                <div>
                <span class="gradient-text-two text-nowrap">Github源码：<a href="https://github.com/OnlyEric/myproject" target="_blank">myGithub</a></span>
                </div>
            </div>
            <div class="col-sm-offset-1 col-sm-3">
                <a href="https://cnodejs.org/" target="_blank"><img src="../assets/cnodejs_light.svg" style="width:300px;margin-top:-15px;margin-left:10px;"></a>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default({
    name:'About',
    data(){
        return {

        }
    },
})
</script>

<style>
.gradient-text{
    text-align: left;
    text-indent:30px;
    line-height: 50px;
    font-size:40px;
    font-weight:bolder; 
    position: relative; 
}
.gradient-text-one{  
    background-image:-webkit-linear-gradient(bottom,rgb(1, 152, 216),#5c99b7,rgb(4, 94, 170)); 
    -webkit-background-clip:text; 
    -webkit-text-fill-color:transparent; 
}
.gradient-text-two{  
    background-image:-webkit-linear-gradient(left,#b76f40,#ad8b3d,#dea32c); 
    -webkit-background-clip:text; 
    -webkit-text-fill-color:transparent; 
}
</style>