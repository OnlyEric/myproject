<template>
<div class="Header">
    <router-link :to="{name:'root'}">
        <img src="../assets/logo.png">
    </router-link>
    <span><a href="https://www.baidu.com" target="_blank">about</a></span>
</div>
</template>

<script>
export default{
    name:"Header",
    data(){
        return{}
    }
}
</script>

<style scoped>
.Header{
    height:50px;
    background:#5a5555;
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
</style>