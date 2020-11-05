//index.js
const app = getApp()
import { 
  bannersData,
  articleDatas
 } from '../../service/index.js'
Page({
  data:{
    bannersPost:{},
    articles:[],
    isload:true,
    page:0
  },
  onLoad:function (options){
    this._BannersData()
    this._articleDatas()
    
  },
  _BannersData(){
    bannersData().then(res=>{
      this.setData({
        bannersPost:res.data
      })
    }).catch(err=>{
      console.log(err)
    })
  },
  _articleDatas(){
    const page=this.data.page+1
    articleDatas(page).then(res=>{
      if(res.statusCode === 200){
     //console.log(res.data.length)
      const newarticles=res.data
      const oldarticles=this.data.articles
      oldarticles.push(...newarticles)
      this.setData({
        articles:oldarticles,
        page:page
      })
      wx.showToast({
        icon:'loading',
        title: '数据加载中',
        duration: 1000,
        mask:true
    })
    }else{
      wx.showToast({
        icon:'none',
        title: '已经到底部了',
        duration: 1500
    })
    }
    }).catch(err=>{
    
    })
  },
  onReachBottom(){
      this._articleDatas()
    //  console.log(this.data.isload)
  },
  onShareAppMessage:function(res){
    return {
      title: '梦独吟博客小程序',
      path: '/pages/index/index',
      imageUrl: 'https://www.datealive.top/wp-content/uploads/2020/10/16036409421.png',
  }
  }
})
