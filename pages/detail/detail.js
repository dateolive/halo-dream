// pages/detail/detail.js
import {
  getpostData,
  getComments,
  sendComment,
  PostLove,
  PostMore
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
    inputcontent: '评论一下吧~',
    replyid: 0,
    SendContent: '',
    author_name: '',
    author_email: '',
    author_url: '',
    userid: '',
    formid: '',
    islogin: false,
    hiddenbutton: false,
    inputemail: '邮箱必填(留言回复后将会发邮件给你)',
    Email: '2448282543@qq.com',
    SaveEmail: '',
    isCanDraw: false,
    isChange: false
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
  onShow: function () {
    this._login()
  },
  //登录
  _login() {
    var that = this
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (res) {
              that.setData({
                author_name: res.userInfo.nickName,
                author_url: res.userInfo.avatarUrl,
                islogin: true,
                hiddenbutton: true
              })
            }

          })
        }
      }
    })
  },
  //文章详情
  _getpostData(id) {
    getpostData(id).then(res => {
      // console.log(res)
      const postContent = res.data.content.rendered
      const title = res.data.title.rendered
      const headimg = res.data.post_full_image || res.data.post_medium_image || res.data.post_large_image || res.data.post_thumbnail_image 
      const lovecnt = res.data.like_count
      const readcnt = res.data.pageviews
      const posttime = res.data.post_date
      const comments = res.data.total_comments
      const category_name = res.data.category_name
      //  console.log(tags)
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
  //评论详情
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
    wx.setClipboardData({
      data: e.detail.src,
      success: res => {
        wx.showToast({
          title: '已复制',
          duration: 1000,
        })
      }
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
  //父级评论
  parentcomment(e) {
    const inputcontent = '@' + e.detail.replyname
    const replyid = e.detail.replyid
    const formId = e.detail.formId
    const userid = e.detail.userid
    this.setData({
      inputcontent,
      replyid,
      formid: formId,
      userid
    })
  },
  //子级评论
  childcomment(e) {
    const inputcontent = '@' + e.detail.replyname
    const replyid = e.detail.replyid
    const formId = e.detail.formId
    const userid = e.detail.userid
    this.setData({
      inputcontent,
      replyid,
      formid: formId,
      userid
    })
  },
  //评论输入框
  inputcontent(e) {
    var content = e.detail.value.replace(/\s+/g, '');
    //console.log(content);
    this.setData({
      SendContent: content,
    });
  },
  //提交评论
  submitcontent(e) {
    const content = this.data.SendContent
    const replyid = this.data.replyid
    const name = this.data.author_name
    const url = this.data.author_url
    const userid = this.data.userid
    var email = ''
    try {
      email = wx.getStorageSync('email')
      if (email) {
        console.log('获取email数据成功')
      } else {
        email = ''
      }
    } catch (e) {
      console.log('缓存失败')
    }
    const datas = {
      post: this.data.postid, //
      author_name: name, //
      author_email: email,
      content: content, //
      author_url: url,
      parent: replyid, //
      openid: 'ovoZ55DCVPTPzo7P85lNX03HLLoI',
      userid: userid,
      formId: this.data.formId
    }
    if (this.data.SendContent.length > 0 && email.length>0) {
      if (this.data.islogin && this.data.SendContent.length > 0) {
        sendComment(datas).then(res => {
          wx.showToast({
            title: '留言成功待审核',
            icon: 'success',
            duration: 1500
          })
        }).catch(err => {
          console.log(err)
        })
      } else {
        wx.showToast({
          title: '请先登录',
          icon: 'none',
          duration: 1500
        })
      }
    } else {
      wx.showToast({
        title: '评论内容或邮箱不能为空',
        icon: 'none',
        duration: 1500
      })
    }

  },
  //
  bindGetUserInfo: function (e) {
    //console.log(e)
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      var that = this;
      //授权成功后,通过改变 isHide 的值，让实现页面显示出来，把授权页面隐藏起来
      that.setData({
        author_name: e.detail.userInfo.nickName,
        author_url: e.detail.userInfo.avatarUrl,
        islogin: true,
        hiddenbutton: true
      });
      wx.setStorageSync('avatarUrl', e.detail.userInfo.avatarUrl)
      wx.setStorageSync('nickName', e.detail.userInfo.nickName)
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '请重新授权后再访问',
        showCancel: false,
        confirmText: '返回授权',
        success: function (res) {
          // 用户没有授权成功，不需要改变 isHide 的值
          if (res.confirm) {
            console.log('用户点击了“返回授权”');
          }
        }
      });
    }
  },
  clickadduserinfo(e) {
    try {
      const inputemail = wx.getStorageSync('email')
      if (inputemail) {
        this.setData({
          inputemail
        })
      }
    } catch (e) {}
    this.setData({
      modalName: e.currentTarget.dataset.target,
    })
  },
  inputemail(e) {
    var content = e.detail.value.replace(/\s+/g, '');
    this.setData({
      Email: content,
      isChange: true
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  saveinfo(e) {
    var that = this
    try {
      var emaildata = wx.getStorageSync('email')
      if (emaildata && !that.data.isChange) {
        that.setData({
          modalName: null,
          SaveEmail: emaildata
        })
      } else {
        const Email = that.data.Email
        var reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
        var isOk= reg.test(Email);
        if(isOk){
          that.setData({
            modalName: null,
            SaveEmail: Email
          })
          wx.setStorageSync('email', Email)
        }else{
          wx.showToast({
            title: '邮箱格式不正确',
            icon: 'none',
            duration: 1500
          })
        }
        
      }
    } catch (e) {
      console.log(e)
    }
  },
  createShareImage() {
    this.setData({
      isCanDraw: !this.data.isCanDraw
    })
  },
  LovethisPost(e) {
    if (this.data.islogin) {
      const data = {
        postid: this.data.postid,
        openid: 'fixedafter' + this.data.author_name
      }
      PostLove(data).then(res => {
        // console.log(res)
        var isLove = res.data.message
        //console.log(isLove)
        if (isLove == '点赞成功 ') {
          wx.showToast({
            title: '点赞成功',
            icon: 'success',
            duration: 1500
          })
        } else if (isLove == '已点赞 ') {
          wx.showToast({
            title: '已点赞',
            icon: 'none',
            duration: 1500
          })
        } else {
          wx.showToast({
            title: '点赞失败',
            icon: 'none',
            duration: 1500
          })
        }

      }).catch(err => {
        console.log(err)
      })
    } else {
      wx.showToast({
        title: '请先进行登录',
        icon: 'none',
        duration: 1500
      })
    }

  },
  showQrcode() {
    wx.previewImage({
      urls: ['https://imapi.datealive.top/zanshang/img/weipayimg.jpg'],
      current: 'https://imapi.datealive.top/zanshang/img/weipayimg.jpg' // 当前显示图片的http链接      
    })
  }



})