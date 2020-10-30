Component({
  properties: {
    //属性值可以在组件使用时指定
    isCanDraw: {
      type: Boolean,
      value: false,
      observer(newVal, oldVal) {
        newVal && this.drawPic()
      }
    },
    headimg:{
      type:String,
      value:''
    },
    title:{
      type:String,
      value:''
    },
    readcnt: {
      type:String,
      value:''
    },
    posttime: {
      type:String,
      value:''
    },
    category_name: {
      type:String,
      value:''
    },
  },
  data: {
    isModal: false, //是否显示拒绝保存图片后的弹窗
    imgDraw: {}, //绘制图片的大对象
    sharePath: '', //生成的分享图
    visible: false
  },
  methods: {
    handlePhotoSaved() {
      this.savePhoto(this.data.sharePath)
    },
    handleClose() {
      this.setData({
        visible: false
      })
    },
    drawPic() {
      if (this.data.sharePath) { //如果已经绘制过了本地保存有图片不需要重新绘制
        this.setData({
          visible: true
        })
        this.triggerEvent('initData') 
        return
      }
      wx.showLoading({
        title: '生成中'
      })
      this.setData({
        imgDraw:  {
          background: '#f7f7f7',
          width: '750rpx',
          height: '1100rpx',
          borderRadius: '0rpx',
          views: [
            {
              type: 'rect',
              css: {
                left: '50rpx',
                width: '650rpx',
                top: '50rpx',
                color: '#ffffff',
                height: '900rpx',
                borderRadius: '20rpx',
                shadow: '10rpx 10rpx 5rpx #888888',
              }
            },
            {
              type: 'image',
              url: `${this.data.headimg}`,
              css: {
                left: '50rpx',
                width: '650rpx',
                height: '640rpx',
                top: '50rpx',
                borderRadius: '20rpx',
              }
            },
            {
              type: 'text',
              text: `${this.data.title}`,
              css: {
                top: '450rpx',
                left: '375rpx',
                align: 'center',
                fontSize: '38rpx',
                color: '#000',
                width: '550rpx',
                maxLines: '1',
              }
            },
            {
              type: 'text',
              text: `🔥 ${this.data.readcnt}  ⏱ ${this.data.posttime}  🏷${this.data.category_name}`,
              css: {
                top: '520rpx',
                left: '80rpx',
                width: '550rpx',
                maxLines: '1',
                fontSize: '28rpx',
                color: '#000'
              }
            },
            {
              type: 'text',
              text: '作者：梦独吟',
              css: {
                top: '570rpx',
                left: '80rpx',
                width: '550rpx',
                fontSize: '28rpx',
                color: '#000',
                lineHeight: '36rpx',
                maxLines: '2',
              }
            },
            {
              type: 'text',
              text: '噢~博客居然更新文章啦！！！',
              css: {
                top: '630rpx',
                left: '80rpx',
                width: '550rpx',
                fontSize: '28rpx',
                maxLines: '4',
                color: '#000',
                lineHeight: '36rpx'
              }
            },
            {
              type: 'image',
              url: 'https://imapi.datealive.top/tp/qrcode.jpg',
              css: {
                bottom: '180rpx',
                left: '120rpx',
                width: '200rpx',
                height: '200rpx',
              },
            },
            {
              type: 'text',
              text: '长按识别，阅读博文',
              css: {
                bottom: '290rpx',
                left: '350rpx',
                fontSize: '28rpx',
                color: '#666666'
              }
            },
            {
              type: 'text',
              text: '分享自「Halo Dream」',
              css: {
                bottom: '230rpx',
                left: '350rpx',
                fontSize: '28rpx',
                color: '#666666',
              }
            },
            {
              type: 'text',
              text: 'Halo Dream By 梦独吟',
              css: {
                bottom: '60rpx',
                left: '375rpx',
                align: 'center',
                fontSize: '28rpx',
                color: '#666666',
              }
            }
          ],
        }
      })
    },
    onImgErr(e) {
      wx.hideLoading()
      wx.showToast({
        title: '生成分享图失败，请刷新页面重试'
      })
    },
    onImgOK(e) {
      wx.hideLoading()
      this.setData({
        sharePath: e.detail.path,
        visible: true,
      })
      //通知外部绘制完成，重置isCanDraw为false
      this.triggerEvent('initData') 
    },
    preventDefault() { },
    // 保存图片
    savePhoto(path) {
      wx.showLoading({
        title: '正在保存...',
        mask: true
      })
      this.setData({
        isDrawImage: false
      })
      wx.saveImageToPhotosAlbum({
        filePath: path,
        success: (res) => {
          wx.showToast({
            title: '保存成功',
            icon: 'none'
          })
          setTimeout(() => {
            this.setData({
              visible: false
            })
          }, 300)
        },
        fail: (res) => {
          wx.getSetting({
            success: res => {
              let authSetting = res.authSetting
              if (!authSetting['scope.writePhotosAlbum']) {
                this.setData({
                  isModal: true
                })
              }
            }
          })
          setTimeout(() => {
            wx.hideLoading()
            this.setData({
              visible: false
            })
          }, 300)
        }
      })
    }
  }
})
