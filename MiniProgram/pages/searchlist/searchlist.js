// pages/searchlist/searchlist.js
import {
  searchDatas
} from '../../service/search.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    keyword: '',
    articles: {},
    loadModal:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const keyword = options.keyword
    this.setData({
      keyword
    })
    this._searchdatas(keyword)
  },
  _searchdatas(keyword) {
    var that = this
    searchDatas(keyword).then(res => {
      const articles = res.data
      that.setData({
        articles,
        loadModal:false
      })
    }).catch(err => {
      console.log(err)
    })
  }



})