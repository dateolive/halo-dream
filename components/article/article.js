// components/article/article.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    item:{
      type:Object,
      value:{}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    imgurl:'https://www.datealive.top/wp-content/uploads/2020/05/26.jpg'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    itemClick(e){
      const id=(this.data.item.id || this.data.item.post_id)
      const comments=(this.data.item.total_comments || this.data.item.comment_total)
      wx.navigateTo({
        url: '/pages/detail/detail?id='+id+'&comments='+comments,
      })
    }
  },
  options: {
    addGlobalClass: true
  }
})
