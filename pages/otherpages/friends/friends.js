import { 
  friendlinks
 } from '../../../service/friends.js'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        loading: true,
        animationTime: 1,
        LinksList: [],
        colourList: [{
            colour: 'bg-red'
        }, {
            colour: 'bg-orange'
        }, {
            colour: 'bg-yellow'
        }, {
            colour: 'bg-olive'
        }, {
            colour: 'bg-green'
        }, {
            colour: 'bg-cyan'
        }, {
            colour: 'bg-blue'
        }, {
            colour: 'bg-purple'
        }, {
            colour: 'bg-mauve'
        }, {
            colour: 'bg-pink'
        }, {
            colour: 'bg-lightBlue'
        }],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.randomNum();
        this._friendlinks()
        
    },
    _friendlinks(){
      friendlinks().then(res=>{

        const LinksList=res.data.data
        this.setData({
          LinksList
        })
      }).catch(err=>{
        console.log(err)
      })
    },
    //获取随机数
    randomNum: function () {
        var num = Math.floor(Math.random() * 10);
        this.setData({
            randomNum: num
        });
    },

    prevent(event) {
        // console.log(event.currentTarget.dataset.url);
        var self = this;
        wx.setClipboardData({
            data: event.currentTarget.dataset.url,
        });

    }
})
