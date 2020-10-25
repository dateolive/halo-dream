// components/search/search.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    SearchContent:''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    Search: function(e) {
      var content = e.detail.value.replace(/\s+/g, '');
     // console.log(content);
      this.setData({
          SearchContent: content,
      });
  },
  SearchSubmit: function (e) {
     // console.log(this.data.SearchContent)
      const keyword=this.data.SearchContent
      wx.navigateTo({
        url: '/pages/searchlist/searchlist?keyword='+keyword,
      })
  },
  }, 
  options: {
    addGlobalClass: true
  }
})
