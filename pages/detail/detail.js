// pages/detail/detail.js
import {
  getpostData,
  getComments,
  sendComment,
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
    postid: 0,
    inputcontent:'评论一下吧~',
    replyid:0,
    SendContent:'',
    author_name:'',
    author_email:'',
    author_url:'',
    userid:'',
    formid:'',
    islogin:false,
    hiddenbutton:false,
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
  onShow:function(){
    this._login()
  },
  _login(){
    var that=this
    wx.getSetting({
      success (res){
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function(res) {
              that.setData({
                author_name:res.userInfo.nickName,
                author_url:res.userInfo.avatarUrl,
                islogin:true,
                hiddenbutton:true
              })
            }
         
          })
        }
      }
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
      //console.log(res)
      this.setData({
        allcomments
      })
     // console.log(res)
    }).catch(err => {
      console.log(err)
    })
  },
  wxmlTagATap(e) {
    console.log(e);
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
  parentcomment(e){
    const inputcontent='@'+e.detail.replyname
    const replyid=e.detail.replyid
    const formId=e.detail.formId
    const userid=e.detail.userid
    this.setData({
      inputcontent,
      replyid,
      formid:formId,
      userid
    })
  },
  childcomment(e){
    const inputcontent='@'+ e.detail.replyname
    const replyid=e.detail.replyid
    const formId=e.detail.formId
    const userid=e.detail.userid
    this.setData({
      inputcontent,
      replyid,
      formid:formId,
      userid
    })
  },
  inputcontent(e){
    var content = e.detail.value.replace(/\s+/g, '');
    //console.log(content);
     this.setData({
      SendContent: content,
     });
  },
  submitcontent(e){
    const content=this.data.SendContent
    const replyid=this.data.replyid
    const name=this.data.author_name
    const url=this.data.author_url
    const email='2448282543@qq.com'
    const userid=this.data.userid
    const datas={
      post:this.data.postid,//
      author_name:name,//
      author_email:email,
      content:content,//
      author_url:url,
      parent:replyid,//
      openid:'ovoZ55DCVPTPzo7P85lNX03HLLoI',
      userid:userid,
      formId:this.data.formId
    }
    if(this.data.SendContent.length>0){
    if(this.data.islogin&&this.data.SendContent.length>0){
      sendComment(datas).then(res=>{
        wx.showToast({
          title: '留言成功待审核',
          icon: 'success',
          duration: 1500
        })
        }).catch(err=>{
          console.log(err)
        })
    }else {
      wx.showToast({
        title: '请先登录',
        icon: 'fail',
        duration: 1500
      })
    }
  }else{
    wx.showToast({
      title: '不能为空',
      icon: 'fail',
      duration: 1500
    })
  }
 
  },
  bindGetUserInfo: function(e) {
    if (e.detail.userInfo) {
        //用户按了允许授权按钮
        var that = this;
        //授权成功后,通过改变 isHide 的值，让实现页面显示出来，把授权页面隐藏起来
        that.setData({
          author_name:e.detail.userInfo.nickName,
          author_url:e.detail.userInfo.avatarUrl,
          islogin:true,
          hiddenbutton:true
        });
    } else {
        //用户按了拒绝按钮
        wx.showModal({
            title: '警告',
            content: '请重新授权后再访问',
            showCancel: false,
            confirmText: '返回授权',
            success: function(res) {
                // 用户没有授权成功，不需要改变 isHide 的值
                if (res.confirm) {
                    console.log('用户点击了“返回授权”');
                }
            }
        });
    }
}

  
})