// pages/detail/detail.js
import {
  getpostData,
  getComments
} from '../../service/detail.js'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    postContent: '',
    headimg: '',
    title: '',
    lovecnt: 0,
    readcnt: 0,
    comments: 0,
    posttime: 0,
    category_name: '',
    allcomments: [],
    isShow: false,
    isLoad: true,
    menuBackgroup: false,
    postid: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const id = options.id
    const limit = options.comments
    this._getpostData(id)
    if (limit > 0) {
      this._getComments(id, limit)
    }
    this.setData({
      postid: id
    })

  },
  _getpostData(id) {
    getpostData(id).then(res => {
      //console.log(res)
      const postContent = res.data.content.rendered
      const title = res.data.title.rendered
      const headimg = res.data.post_full_image
      const lovecnt = res.data.like_count
      const readcnt = res.data.pageviews
      const posttime = res.data.post_date
      const comments = res.data.total_comments
      const category_name = res.data.category_name
      this.setData({
        postContent,
        title,
        headimg,
        lovecnt,
        readcnt,
        posttime,
        comments,
        category_name
      })
    }).catch(err => {
      console.log(err)
    })
  },
  _getComments(id, limit) {

    getComments(id, limit, 1).then(res => {
      const allcomments = res.data.data
      this.setData({
        allcomments
      })
    }).catch(err => {
      console.log(err)
    })
  },
  wxmlTagATap(e) {
    console.log(e);
  },
  sendcontent() {
    wx.showToast({
      title: '评论功能开发中',
      duration: 1500
    })
  },
  onShareAppMessage: function (res) {
    console.log(res)
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    // console.warn(this.data.postId);
    return {
      title: this.data.title,
      path: '/pages/detail/detail?id=' + this.data.postid + '&comments=' + this.data.comments,
      imageUrl: this.data.headimg,
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareTimeline: function () {
    // console.warn(this.data.postId);
    console.log(this.data.postid)
    return {
      title: this.data.title,
      path: '/pages/detail/detail?id=' + this.data.postid + '&comments=' + this.data.comments,
      imageUrl: this.data.headimg,
    }
  },
})