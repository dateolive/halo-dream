// pages/otherpages/message/message.js
import { 
  showmessage,
  sendmessage
 } from '../../../service/message.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    message:[],
    InputBottom: 0,
    index:1,
    isend:true,
    isSaveInfo:false,
    userInfo:{},
    sendWord:'',
    loading:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._showmessage()
    
  },
  _showmessage(){
    var _this=this
    var index=_this.data.index
    showmessage(index).then(res=>{
      //console.log(res.data.status)
      if(res.data.status==200){
        for (let i = 0; i < res.data.data.length; i++) {
          let color = this.getRandomColor();
          res.data.data[i].word = this.matchReg(res.data.data[i].word);
        }
        var newdata=(res.data.data).reverse()
        var olddata=_this.data.message
        olddata.unshift(...newdata)
   
       // console.log(olddata)
        _this.setData({
          message:olddata
        })
      }else{
        wx.showToast({
          title: '没有数据了',
          icon:'none'
        })
        wx.stopPullDownRefresh()
      }
      if(_this.data.isend){
        wx.pageScrollTo({
          selector:'#end',
          duration: 100
        })
        _this.setData({
          isend:!_this.data.isend
        })
      }
 
    }).catch(err=>{
  
    })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    　wx.showNavigationBarLoading() //在标题栏中显示加载
      var _this=this
      var index=_this.data.index+1
      _this.setData({
        index
      })
      this._showmessage();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },
  inputcontent(e){
    var content = e.detail.value.replace(/\s+/g, '');
    this.setData({
      sendWord:content
    })
  },
  showModal(e) {
    var userinfo = wx.getStorageSync('userInfo')
    if(this.data.isSaveInfo || userinfo){
      var word=this.data.sendWord
      if(word.length>0){
        userinfo.word=this.data.sendWord
        this._sendmessage(userinfo)
        this.setData({
          message:[],
          index:1,
          isend:false
        })
        this._showmessage()
      }else{
        wx.showToast({
          title: '不能为空',
          icon:'none'
        })
      }
    }else{
      this.setData({
        modalName: e.currentTarget.dataset.target
      })
    }

  },
  _sendmessage(userinfo){
    sendmessage(userinfo).then(res=>{
    //  console.log(res)
      wx.showToast({
        title: '留言成功',
        icon:'none'
      })
    }).catch(err=>{
      
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  getRandomColor: function () {
    var colors = ["pink", "orange", "green", "red", "blue", "mauve", "purple", "olive"];
    return colors[Math.floor(Math.random() * colors.length)];
  },
  matchReg: function (str) {
    let reg=/<\/?.+?\/?>/g
    return str.replace(reg,'')
  },
  InputFocus(e) {
    this.setData({
      InputBottom: e.detail.height
    })
  },
  InputBlur(e) {
    this.setData({
      InputBottom: 0
    })
  },
  formSubmit: function(e) {
  //  console.log(e.detail.value)
    var userinfo = wx.getStorageSync('userInfo')
    if(userinfo){
      this.setData({
        isSaveInfo:true
      })
    }else if((e.detail.value.name).length>0&&(e.detail.value.qq).length>0){ 
      this.setData({
        userInfo:{
          'name':e.detail.value.name,
          'qq':e.detail.value.qq,
          'email':e.detail.value.email || '123456@qq.com',
          'site':e.detail.value.site || 'www.baidu.com',
        },
        isSaveInfo:true,
        modalName: null
      })
      wx.setStorageSync('userInfo', this.data.userInfo)
    }else{
      wx.showToast({
        title: '昵称和QQ号码不能为空',
        icon:'none'
      })
    }


  },



})