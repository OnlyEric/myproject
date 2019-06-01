import request from 'superagent'
import jsonp from 'superagent-jsonp'

const state={
    data:[],
}
const getters={
    postlist:state=>{
        return{
            data:state.data,
        }
    }
}
const mutations={
    getInfo(state,payload){
        state.data=payload.data
    }
}

const actions={
    getInfo({commit},payload){
        return new Promise((resolve,reject)=>{
            request
            .get('https://cnodejs.org/api/v1/topics?page='
            +payload.page+'&limit='+payload.limit)
           // .use(jsonp)
           /*.end((err,res)=>{
                if(!err){
                    commit({
                        type:'getInfo',
                        data:res.body.data,
                    })
                    resolve(res)
                }else{
                    reject(err)
                }
            })*/
            /*.send({
                page:payload.page,
                limit:payload.limit,
            })*/
            .then(res=>{
                commit({
                    type:'getInfo',
                    data:res.body.data,
                })
                resolve(res)
            },err=>{
                reject(err)
            })
         })
    }
}

export default({
    state,
    getters,
    mutations,
    actions,
})