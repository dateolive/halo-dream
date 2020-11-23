// pages/otherpages/diary/diary.js
import { 
  diaries
 } from '../../../service/diary.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading: true,
    diaryContent:'',
    loadModal:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._diaries()
  },
  _diaries(){
    diaries().then(res=>{
      for (let i = 0; i < res.data.data.length; i++) {
        let color = this.getRandomColor();
        res.data.data[i].textColor = "text-" + color;
        res.data.data[i].bgColor = "bg-" + color;
      }
      this.setData({
        diaryContent: res.data.data,
        loadModal:false
      })
    }).catch(err=>{
      console.log(err)
    })
  },
  getRandomColor: function () {
    var colors = ["pink", "orange", "green", "red", "blue", "mauve", "purple", "olive"];
    return colors[Math.floor(Math.random() * colors.length)];
  }
})