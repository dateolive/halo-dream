// pages/list/list.js
import { 
  categoryatticles
 } from '../../service/category.js'
Page({
  data: {
    name:'',
    articles:[],
    loadModal:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const id=options.id
    const name=options.name
    const count=options.count
    this.setData({
      name
    })
    this._categoryatticles(count,id)
  },
  _categoryatticles(count,id){
    categoryatticles(count,id).then(res=>{
      if(res.statusCode === 200){
        const articles=res.data
        this.setData({
          articles,
          loadModal:false
        })
      }else{
        wx.showToast({
          title: '无数据',
          duration: 1500
      })
      }
    
    }).catch(err=>{
      console.log(err)
    })
  }
})