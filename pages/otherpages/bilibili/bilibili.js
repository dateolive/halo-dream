// pages/otherpages/bilibili/bilibili.js
import { 
  bilibili
 } from '../../../service/bilibili.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type:1,
    animationTime: 1,
    bilibili:[],
    TabCur: 0,
    scrollLeft:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   const type=this.data.type
   this._bilibili(type)
  },
  _bilibili(type){
    bilibili(type).then(res=>{
      const bilibili=res.data.data.list
     // console.log(bilibili)
      this.setData({
        bilibili
      })
    }).catch(err=>{
      console.log(err)
    })
  },
  onShareAppMessage: function () {

  },
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id-1)*60
    })
    if(this.data.TabCur==0){
      const type=1
      this.setData({
        type
      })
      this._bilibili(type)
    }else if(this.data.TabCur==1){
      const type=2
      this.setData({
        type
      })
      this._bilibili(type)
    }
  }
})