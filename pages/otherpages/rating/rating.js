// pages/otherpages/rating/rating.js
import { 
  ratingarticles
 } from '../../../service/index.js'
Page({

  data: {
    articles:[],
    loadModal:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._ratingarticles()
  },
  _ratingarticles(){
    ratingarticles().then(res=>{
      const articles=res.data
      this.setData({
        articles,
        loadModal:false
      })
    // console.log(articles)
    }).catch(err=>{
      console.log(err)
    })
  }
})