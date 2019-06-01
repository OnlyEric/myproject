import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import PostList from '@/components/PostList'
import Article from '@/components/Article'
import SideBar from '@/components/SideBar'
import UserInfo from '@/components/UserInfo'
import Search from '@/components/Search'
Vue.use(Router)

export default new Router({
  mode:'history',//默认是hash模式
  linkActiveClass:'menvscode-active',
  scrollBehavior(to,from,savePosition){ // 在点击浏览器的“前进/后退”，或者切换导航的时候触发。
    console.log(to) // to：要进入的目标路由对象，到哪里去
    console.log(from) // from：离开的路由对象，哪里来
    console.log(savePosition) // savePosition：会记录滚动条的坐标，点击前进/后退的时候记录值{x:?,y:?}
    if(savePosition) {
      return savePosition;
    }else{
      return {x:0,y:0}
    }
  },
  routes: [
    {
      path: '/',
      name: 'root',
      components: {
        main:PostList,
      }
    },
    {
      path:'/topic/:id&auther=:name',
      name:'post_content',
      components:{
        main:Article,
        sidebar:SideBar
      }
    },
    {
      path:'/user/:name',
      name:'user_info',
      components:{
        main:UserInfo,
      }
    },
    {
      path:'/search=:search',
      name:'search',
      components:{
        main:Search,
      }
    },
  ]
})
